import HelloWorld from  './hello-world/';
import HelloWorldHTML from './hello-world/index.pug';

import Software from './software/';
import SoftwareHTML from './software/index.pug';

const AVAILABLE_APPS = {
    'HelloWorld' : {
        pug: HelloWorldHTML,
        js: HelloWorld
    },
    'Software' : {
        pug: SoftwareHTML,
        js: Software
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
        }
    }).find((param) => param.key === variable);
    return match ? match.value : void 0;
};
const toLoad = AVAILABLE_APPS[getQueryVariable('sub-app')];
if(toLoad) {
    loadSubApp(toLoad);
}