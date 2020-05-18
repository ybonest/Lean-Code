function createTemplate(colloctCodes) {
  return `
  (function(modules) { // modules 存储了所有扁平化的路径+代码数据
    var cacheLoadedAModules = {};
    function _my_webpack_require(filepath) {
      if (cacheLoadedAModules[filepath]) {
        return cacheLoadedAModules[filepath].exports;
      }

      /** 定义exports  在源文件中 export a或者export default b最终被编译为 exports.a 或者 exports.default = b*/
      var module = cacheLoadedAModules[filepath] = {
        exports: {}
      }
      // 此处去require文件
      modules[filepath].call(module.exports, module, _my_webpack_require, module.exports);
      return module.exports;
    }

    _my_webpack_require.d = function(exports, key, value) {
      exports[key] = value;
    }
  
    return _my_webpack_require('./src/a.js');
  })({${createTemplateParams(colloctCodes)}})`
}

function createTemplateParams(colloctCodes) {
  return Object.keys(colloctCodes).reduce((collect, key) => {
    collect += `\n'${key}': function(module, _my_webpack_require, _my_webpack_export) {
      eval("${colloctCodes[key]}")
    },`;
    return collect;
  }, '')
}

module.exports = createTemplate;
