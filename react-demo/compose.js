function compose(...args) {
  if (Array.isArray(args)) {
    return args.reduce((left, right) => params => right(left(params)));
  }
}

function a1(params)  {
  return params;
}

function a2(params) {
  return params;
}

function a3(params) {
  console.log(params);
}

compose(a1, a2, a3)(1);