import './index.scss';
const slideshows = {};
const context = require.context('./slideshows', true, /index.js/i);
let subAppDirectory = [];
context.keys().forEach((key) => {
  const directory = key.match(/\.\/([\/\w\-]+)+\/index.js/)[1];
  subAppDirectory.push(directory);
  const subAppTitle = directory.replace('/', '-').toLowerCase();
  slideshows[subAppTitle] = {
    js: context(key).default
  };
});
const removeProceedingDirectory = (str) => str.replace(/[\w\-]+\//, '');
subAppDirectory = subAppDirectory.reduce((prev, curr, i) => {
  const previous = prev[Math.max(prev.length - 1, 0)];
  const subDir = curr.match(/([\-\w]+)\/.*/);
  if (typeof previous === 'object' && curr.startsWith(previous.directory)) {
    previous.pages.push(removeProceedingDirectory(curr));
    return prev;
  } else if (curr.includes('/')) {
    return prev.concat({
      directory: subDir[1],
      pages: [removeProceedingDirectory(curr)]
    });
  }
  return prev.concat(curr);
}, []);

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
const displayDirectory = () => {
  loadSubApp({
    pug: require('./directory.pug'),
    context: {
      directory: subAppDirectory
    },
    js: () => {}
  });
};
const toLoad = slideshows[getQueryVariable('sub-app')];
if (toLoad) {
  loadSubApp(toLoad);
} else {
  displayDirectory();
}
