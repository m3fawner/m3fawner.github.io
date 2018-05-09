import './index.scss';
const slideshows = {};
const context = require.context('./slideshows', true, /index.js/i);
context.keys().forEach((key) => {
  const directory = key.match(/\.\/([\/\w\-]+)+\/index.js/)[1];
  const subAppTitle = directory.replace('/', '-').toLowerCase();
  slideshows[subAppTitle] = {
    js: context(key).default
  };
});
const pugContext = require.context('./slideshows', true, /index.pug/i);
pugContext.keys().forEach((key) => {
  const directory = key.match(/\.\/([\/\w\-]+)+\/index.pug/)[1];
  const subAppTitle = directory.replace('/', '-').toLowerCase();
  slideshows[subAppTitle].pug = pugContext(key);
});

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
const toLoad = slideshows[getQueryVariable('sub-app')];
if (toLoad) {
  loadSubApp(toLoad);
}
