import HelloWorld from './hello-world/';
import HelloWorldHTML from './hello-world/index.pug';

import Software from './software/';
import SoftwareHTML from './software/index.pug';

import NPM from './NPM-init/';
import NPMHTML from './NPM-init/index.pug';

import Webpack from './webpack/';
import WebpackHTML from './webpack/index.pug';

import es6intro from './es6/es6-intro';
import es6introHTML from './es6/es6-intro/index.pug';

import es6VariableDeclaration from './es6/variable-declaration';
import es6VariableDeclarationHTML from './es6/variable-declaration/index.pug';

import es6NewMethods from './es6/new-methods';
import es6NewMethodsHTML from './es6/new-methods/index.pug';

import es6ArrowFunctions from './es6/arrow-functions';
import es6ArrowFunctionsHTML from './es6/arrow-functions/index.pug';

const AVAILABLE_APPS = {
  HelloWorld: {
    pug: HelloWorldHTML,
    js: HelloWorld
  },
  Software: {
    pug: SoftwareHTML,
    js: Software
  },
  'NPM-init': {
    pug: NPMHTML,
    js: NPM
  },
  webpack: {
    pug: WebpackHTML,
    js: Webpack
  },
  'es6-intro': {
    pug: es6introHTML,
    js: es6intro
  },
  'es6-variable-declaration': {
    pug: es6VariableDeclarationHTML,
    js: es6VariableDeclaration
  },
  'es6-new-methods': {
    pug: es6NewMethodsHTML,
    js: es6NewMethods
  },
  'es6-arrow-functions': {
    pug: es6ArrowFunctionsHTML,
    js: es6ArrowFunctions
  }
};
const getNode = (pug, ...locals) => {
  const div = document.createElement('div');
  div.innerHTML = pug(...locals);
  return div.firstChild;
};
const loadSubApp = (subApp, ...locals) => {
  document
        .querySelector('container')
        .appendChild(getNode(subApp.pug, ...locals));
  subApp.js();
};
const getQueryVariable = (variable) => {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  const match = vars.map((item) => {
    const parts = item.split('=');
    return {
      key: decodeURIComponent(parts[0]),
      value: decodeURIComponent(parts[1])
    };
  }).find((param) => param.key === variable);
  return match ? match.value : void 0;
};
const toLoad = AVAILABLE_APPS[getQueryVariable('sub-app')];
if (toLoad) {
  loadSubApp(toLoad);
}
