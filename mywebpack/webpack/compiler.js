#!/usr/bin/env node

const commander = require('commander');
const path = require('path');
const fs = require('fs');
const babelParser = require('@babel/parser'); 
const babelCore = require('@babel/core');
const { default: traverse } = require('@babel/traverse');
const t = require("@babel/types")
const createTemplate = require('./template');
const prettier = require('prettier');

const argv = commander
  .version(require('../package.json').version)
  .requiredOption('--config <webpack>')
  .parse(process.argv);
const cwd = process.cwd();

function loadConfigFile(config_dir) {
  if (config_dir) {
    return require(config_dir);
  }
  console.error("miss config!!!");
}

function getCode(filepath) {
  let code;
  if (typeof filepath === 'string') {
    code = fs.readFileSync(path.resolve(cwd, filepath), "utf8");
  }
  return code;
}

function checkWebpackConfig(config) {

}

// 利用babel对源文件的import 或者exports进行转换
function transform(code, collectCode, directory) {
  const parseAst = babelParser.parse(code, { sourceType: "module" });
  let importIndex = 0;
  const dirname = path.dirname(directory);
  const importIdentifier = {};

  traverse(parseAst, {
    Identifier(astNode) {
      const identifier = Reflect.get(importIdentifier, astNode.node.name);
      if (identifier) {
        astNode.replaceWith(identifier)
      }
    },
    ImportDeclaration(astNode) { // 转义import语句，这里只考虑了 import b from './b'的情景，未兼容import { c, d } from './b'等其它较复杂情景
      let { source: argsNode } = astNode.node;
     
      const originName = Object.keys(t.getBindingIdentifiers(astNode.node))[0];
      importIdentifier[originName] = t.identifier(`_my_webpack_module_${importIndex++}`);
      const filePath = './' + path.join(dirname, path.dirname(argsNode.value)) + '/' + path.basename(argsNode.value);
      argsNode.value = filePath;
      const varNode = t.variableDeclaration("var", [
        t.variableDeclarator(
          importIdentifier[originName],
          t.callExpression(t.identifier(`_my_webpack_require`), [argsNode])
        )
      ]);
      astNode.replaceWith(varNode);
      transform(getCode(filePath), collectCode, filePath);
    },
    ExportDefaultDeclaration(astNode) { // 转义export default语句
      const { declaration } = astNode.node;
      const defaultVar = t.StringLiteral('default');
      const defineExports = t.identifier('_my_webpack_export');
      const defineCallFunc = t.identifier(`_my_webpack_require.d`);
      let right = declaration;
      if (t.isAssignmentExpression(right)) {
        right = declaration.right;
      }
      if (t.isFunctionDeclaration(right)) {
        right = t.functionExpression(null, right.params, right.body, right.generator, right.async)
      }

      const constant = t.callExpression(defineCallFunc, [defineExports, defaultVar, right]);
      astNode.replaceWith(constant)
    },
    ExportNamedDeclaration(astNode) {
      const { declarations } = astNode.node.declaration;
      const { id, init } = declarations[0];
      const defineExports = t.identifier('_my_webpack_export');
      const defineCallFunc = t.identifier(`_my_webpack_require.d`);
      const defineName = t.stringLiteral(id.name);
      const constant = t.callExpression(defineCallFunc, [defineExports, defineName, init]);
      astNode.replaceWith(constant)
    }
  });
  let { code: $code } = babelCore.transformFromAstSync(parseAst, code);
  $code = $code.split('\n').reduce((c, line) => {
    line = line.trim().replace(/"/g, "'");
    if (line === '') {
      return c;
    }
    if (line.endsWith(';')) {
      return `${c}${line}`;
    }
    return `${c}${line};`;
  }, '')
  collectCode[directory] = $code;
}

function compiler(config) {
  const webpackConfig = loadConfigFile(path.resolve(cwd, config));
  checkWebpackConfig(webpackConfig);
  
  const collectCode = {}
  const entryCode = getCode(webpackConfig.entry);

  if (entryCode) {
    transform(entryCode, collectCode, webpackConfig.entry);
  }
  const template = prettier.format(createTemplate(collectCode), { semi: false, parser: "babel" })
  console.log(template)
}

compiler(argv.config);