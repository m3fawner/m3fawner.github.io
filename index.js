import Reveal from 'reveal';
import * as slides from './slides/';
import RevealCSS from 'reveal/index.css';
document.write(slides.startingPoint());
const slidesDOM = document.querySelector('.reveal .slides');
const htmlToElement = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return Array.from(div.children);
};
const addSlide = (slideName) => {
  htmlToElement(slides[slideName]())
    .forEach((element) => slidesDOM.appendChild(element));
};
addSlide('topic');
Reveal.initialize({
  width: 960,
  height: 700,
  margin: 0.1,
  minScale: 0.2,
  maxScale: 1.5
});