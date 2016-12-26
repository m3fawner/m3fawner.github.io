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

import es6Classes from './es6/classes/';
import es6ClassesHTML from './es6/classes/index.pug';

import es6Defaults from './es6/parameter-defaults';
import es6DefaultsHTML from './es6/parameter-defaults/index.pug';

import es6Promises from './es6/promises';
import es6PromisesHTML from './es6/promises/index.pug';

import es6Modules from './es6/modules';
import es6ModulesHTML from './es6/modules/index.pug';

import pug from './pug';
import pugHTML from './pug/index.pug';

import tsIntro from './typescript/intro';
import tsIntroHTML from './typescript/intro/index.pug';

import tsTypes from './typescript/type-definitions';
import tsTypesHTML from './typescript/type-definitions/index.pug';

import tsClasses from './typescript/classes';
import tsClassesHTML from './typescript/classes/index.pug';

import smartVsDumb from './web-practices/smart-vs-dumb';
import smartVsDumbHTML from './web-practices/smart-vs-dumb/index.pug';

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
  },
  'es6-classes': {
    pug: es6ClassesHTML,
    js: es6Classes
  },
  'es6-default-parameters': {
    pug: es6DefaultsHTML,
    js: es6Defaults
  },
  'es6-promises': {
    pug: es6PromisesHTML,
    js: es6Promises
  },
  'es6-modules': {
    pug: es6ModulesHTML,
    js: es6Modules
  },
  'pug': {
    pug: pugHTML,
    js: pug,
    context: {
      names: ['Daniel', 'Jacob', 'Ben']
    }
  },
  'ts-intro': {
    pug: tsIntroHTML,
    js: tsIntro
  },
  'ts-types': {
    pug: tsTypesHTML,
    js: tsTypes
  },
  'ts-classes': {
    pug: tsClassesHTML,
    js: tsClasses
  },
  'smart-vs-dumb': {
    pug: smartVsDumbHTML,
    js: smartVsDumb
  }
};
const getNode = (pug, ...locals) => {
  const div = document.createElement('div');
  div.innerHTML = pug(...locals);
  return div.firstChild;
};
const loadSubApp = (subApp) => {
  document
        .querySelector('body')
        .appendChild(getNode(subApp.pug, subApp.context));
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
