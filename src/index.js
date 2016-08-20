import HelloWorld from  './hello-world/';
import HelloWorldHTML from './hello-world/index.pug';

import IndexHTML from './index.pug';

const getNode = (pug, ...locals) => {
    const div = document.createElement('div');
    div.innerHTML = pug(...locals);
    return div.firstChild;
};
const loadSubApp = (subApp, ...locals) => {
        document
            .querySelector('container')
            .appendChild(getNode(subApp, ...locals));
        HelloWorld();
};
document.write(IndexHTML());
loadSubApp(HelloWorldHTML, HelloWorld);