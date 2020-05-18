interface VDomElement {
  flags: string;
  tag: null | string;
  attrs: Partial<Record<string, any>> | null;
  children: string | VDomElement | VDomElement[];
  key?: string;
  childrenFlags: string;
  el?: HTMLElement | Text;
}

type vChildren = string | VDomElement | VDomElement[];

const V_NODE_TYPE = {
  HTML: 'HTML',
  TEXT: 'TEXT',
  ELEMENT: 'ELEMENT'
}

const V_CHILD_TYPE = {
  EMPTY: 'EMPTY',
  SINGLE: 'SINGLE',
  MULTIPLE: 'MULTIPLE'
}

// 创建文本元素
function createTextElement(text: string)  {
  return {
    flags: V_NODE_TYPE.TEXT,
    tag: null,
    attrs: null,
    children: text,
    childrenFlags: V_CHILD_TYPE.EMPTY,
  }
}

// 创建vdom
function createElement(tagName: string | VDomElement, attrs: Record<string, any> | null, children?: vChildren) {
  let flags;

  if (typeof tagName === 'string') {
    flags = V_NODE_TYPE.HTML;
  } else if (typeof tagName === 'object') {
    flags = V_NODE_TYPE.ELEMENT;
  } else if (!tagName) {
    flags = V_NODE_TYPE.TEXT;
  }

  let childrenFlags;
  if (children) {
    if (Array.isArray(children)) {
      if (!children.length) {
        childrenFlags = V_CHILD_TYPE.EMPTY;
      } else {
        childrenFlags = V_CHILD_TYPE.MULTIPLE;
      }
    } else if (typeof children === 'object') {
      childrenFlags = V_CHILD_TYPE.SINGLE;
    } else {
      childrenFlags = V_CHILD_TYPE.SINGLE;
      children = createTextElement(children);
    }
  } else {
    childrenFlags = V_CHILD_TYPE.EMPTY;
  }
  

  return {
    flags,
    tag: tagName,
    attrs,
    key: attrs && attrs.key,
    childrenFlags,
    children
  }
}

interface Container extends HTMLElement {
  vnode: VDomElement;
}

function render(vDom: VDomElement, container: Container) {
  if (container.vnode) {
    patch(container.vnode, vDom, container);
  } else {
    mount(vDom, container)
  }
  container.vnode = vDom;
}

function patch(prevDom: VDomElement, nextDom: VDomElement, container: HTMLElement) {
  const prevFlags = prevDom.flags;
  const nextFlags = nextDom.flags;

  if (prevFlags !== nextFlags) {
    // replaceNode
    replaceNode(prevDom, nextDom, container);
  } else if (nextFlags === V_NODE_TYPE.HTML) {
    // render element
    patchElement(prevDom, nextDom, container);
  } else if (nextFlags === V_NODE_TYPE.TEXT) {
    // render text
    patchText(prevDom, nextDom);
  }
}

function replaceNode(prevDom: VDomElement, nextDom: VDomElement, container: HTMLElement) {
  document.removeChild(prevDom.el);
  mount(nextDom, container);
}

function patchElement(prevDom: VDomElement, nextDom: VDomElement, container: HTMLElement)  {
  if (prevDom.tag !== nextDom.tag) {
    replaceNode(prevDom, nextDom, container);
  } else {
    const el = (nextDom.el = prevDom.el);
    // add or update props
    for (const attr in nextDom.attrs) {
      const preAttr = nextDom.attrs[attr];
      const nextAttr = nextDom.attrs[attr];

      patchAttr(el as HTMLElement, attr, preAttr, nextAttr);
    }
    // delete props
    for (const attr in prevDom.attrs) {
      const attrVal = prevDom.attrs[attr];
      if (attrVal && !nextDom.attrs.hasOwnProperty(attr)) {
        patchAttr(el as HTMLElement, attr, attrVal, null);
      }
    }
    // compare child
    patchChild(prevDom, nextDom, <HTMLElement>el);
  }
}

function patchChild(prevDom: VDomElement, nextDom: VDomElement, container: HTMLElement) {
  const prevFlags = prevDom.childrenFlags;
  const nextFlags = nextDom.childrenFlags;
  const prevChild = prevDom.children;
  const nextChild = nextDom.children;

  /**
   * pre
   * empty ==> empty
   * empty ==> mutiple
   * empty ==> single
   * mutiple ==> mutiple
   */
  switch(prevFlags) {
    case V_CHILD_TYPE.EMPTY:
      if (nextFlags === V_CHILD_TYPE.SINGLE) {
        mount(<VDomElement>nextDom.children, container);
      } else if (nextFlags === V_CHILD_TYPE.MULTIPLE) {
        for (const child of <Array<VDomElement>>nextDom.children) {
          mount(child, container);
        }
      }
      break;
    case V_CHILD_TYPE.MULTIPLE:
      if (nextFlags === V_CHILD_TYPE.SINGLE) {
        for (const child of <VDomElement[]>prevChild) {
          container.removeChild((child).el);
        }
        mount(<VDomElement>nextChild, container);
      } else if (nextFlags === V_CHILD_TYPE.MULTIPLE) {
        let lastIndex = 0;
        for (let i = 0; i < (nextChild as VDomElement[]).length; i++) {
          let find = false;
          for (let j = 0; j < (prevChild as VDomElement[]).length; j++) {
            const prevC = prevChild[j];
            const nextC = nextChild[i];
            if (prevC.key === nextC.key) {
              find = true;
              patch(prevC, nextC, container);
              if (j < lastIndex) {
                const refNode = nextChild[i-1].el.nextSibling;
                container.insertBefore(prevC.el, refNode);
              } else {
                lastIndex = j;
              }
            }
          }
          if (!find) {
            mount(nextChild[i], container);
          }
        }
        for (let i = 0;i < (prevChild as VDomElement[]).length; i++) {
          const hasKey = (nextChild as VDomElement[]).find(child => child.key === prevChild[i].key);

          if (!hasKey) {
            container.removeChild(prevChild[i].el)
          }
        }
      } else if (nextFlags === V_CHILD_TYPE.EMPTY) {
        for (const child of <VDomElement[]>prevChild) {
          container.removeChild((child).el);
        }
      }
      break;
    case V_CHILD_TYPE.SINGLE:
      if (nextFlags === V_CHILD_TYPE.SINGLE) {
        patch(<VDomElement>prevDom.children, <VDomElement>nextDom.children, container);
      } else if (nextFlags === V_CHILD_TYPE.MULTIPLE) {
        container.removeChild((prevChild as VDomElement).el);
        for (const child of <Array<VDomElement>>nextDom.children) {
          mount(child, container);
        } 
      } else if (nextFlags === V_CHILD_TYPE.EMPTY) {
        container.removeChild((prevChild as VDomElement).el);
      }
      break;
  }
}

function patchAttr(container: HTMLElement, attr: string, preAttrVal: any, nextAttrVal: any) {
  switch(attr) {
    case 'style':
      for (const key in nextAttrVal) {
        container.style[key] = nextAttrVal[key];
      }
      for (const key in preAttrVal) {
        if (!nextAttrVal.hasOwnProperty(key)) {
          container.style[key] = '';
        }
      }
      break;
    case 'className':
      container.className = nextAttrVal;
      break;
    default:
      if (attr[0] === '@') {
        if (nextAttrVal) {
          container.addEventListener(attr.slice(1), nextAttrVal);
        }
        if (preAttrVal) {
          container.removeEventListener(attr.slice(1), preAttrVal);
        }
      } else {
        container.setAttribute(attr, nextAttrVal);
      }
      break;
  }
}

function patchText(prevDom: VDomElement, nextDom: VDomElement) {
  const el = (nextDom.el = prevDom.el);
  if (prevDom.children !== nextDom.children) {
    el.nodeValue = <string>nextDom.children;
  }
}

function mount(vDom: VDomElement, container: HTMLElement) {
  if (vDom.flags === V_NODE_TYPE.HTML) {
    mountElement(vDom, container);
  } else if (vDom.flags === V_NODE_TYPE.ELEMENT) {

  } else if (vDom.flags === V_NODE_TYPE.TEXT) {
    mountText(vDom, container);
  }
}

function mountText(vDom: VDomElement, container: HTMLElement) {
  const el = document.createTextNode(vDom.children as string);
  vDom.el = el;
  container.appendChild(el);
}

function mountElement(vDom: VDomElement, container: HTMLElement) {
  const el = document.createElement(vDom.tag);
  for (const attr in vDom.attrs) {
    patchAttr(el, attr, null, vDom.attrs[attr]);
  }
  if (vDom.childrenFlags === V_CHILD_TYPE.SINGLE) {
    mount(vDom.children as VDomElement, el);
  } else if (vDom.childrenFlags === V_CHILD_TYPE.MULTIPLE) {
    for (const child of <Array<VDomElement>>vDom.children) {
      mount(child, el);
    }
  }
  vDom.el = el;
  container.appendChild(el);
}
