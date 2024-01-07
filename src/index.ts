import { booklearn } from './utils/book';
import { DynamicTOC } from './utils/DynamicTOC';

window.Webflow ||= [];
window.Webflow.push(() => {
  DynamicTOC();
  booklearn();
});
