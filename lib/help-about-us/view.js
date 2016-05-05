import marked from 'marked';
import View from '../view/view.js';
import md from './about-us.md';
import template from './template.jade';

export default class AboutView extends View {

  /**
   * Creates a TOS view
   */

  constructor () {
    super(template, { md: marked(md) });
  }
}
