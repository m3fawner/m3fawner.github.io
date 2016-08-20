import HelloWorld from  './hello-world/';
import HelloWorldHTML from './hello-world/index.pug';

import IndexHTML from './index.pug';

const AVAILABLE_APPS = {
    'HelloWorld' : {
        pug: HelloWorldHTML,
        js: HelloWorld
    }
}
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
document.write(IndexHTML());
const toLoad = AVAILABLE_APPS[getQueryVariable('sub-app')];
if(toLoad) {
    loadSubApp(toLoad);
}