var tplEngine = function(tpl, data) {
    var reg = /<%([^%>]+)?%>/g, 
        regOut = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, 
        code = 'var r=[];\n', 
        cursor = 0;

    var add = function(line, js) {
        js? (code += line.match(regOut) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    while(match = reg.exec(tpl)) {
        add(tpl.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(tpl.substr(cursor, tpl.length - cursor));
    code += 'return r.join("");';

    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
};


var barretTpl = function(str, data) {

    //获取元素
    var element = document.getElementById(str);
    if (element) {
        //textarea或input则取value，其它情况取innerHTML
        var html = /^(textarea|input)$/i.test(element.nodeName) ? element.value : element.innerHTML;
        return tplEngine(html, data);
    } else {
        //是模板字符串，则生成一个函数
        //如果直接传入字符串作为模板，则可能变化过多，因此不考虑缓存
        return tplEngine(str, data);
    }
    var tplEngine = function(tpl, data) {
        // content above
    };
};

var tpl = '<% for(var i = 0; i < this.posts.length; i++) {' +　
'var post = posts[i]; %>' +
'<% if(!post.expert){ %>' +
    '<span>post is null</span>' +
'<% } else { %>' +
    '<a href="#"><% post.expert %> at <% post.time %></a>' +
'<% } %>' +
'<% } %>';

var data = {
    "posts": [{
        "expert": "content 1",
        "time": "yesterday"
    },{
        "expert": "content 2",
        "time": "today"
    },{
        "expert": "content 3",
        "time": "tomorrow"
    },{
        "expert": "",
        "time": "eee"
    }]
};

tplEngine(tpl, data.posts)