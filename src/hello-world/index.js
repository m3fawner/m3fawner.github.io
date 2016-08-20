import Reveal from 'reveal';
import SlidesCSS from './slides/slides.css';
import RevealCSS from 'reveal/index.css';
import RevealTheme from 'reveal/theme/blood.css';

export default () => Reveal.initialize({
  margin: 0.1,
  minScale: 0.2,
  maxScale: 1.5,
  controlls: true,
  progress: true,
  keyboard: true,
  fragments: true,
  height: '100%',
  width: '100%'
});