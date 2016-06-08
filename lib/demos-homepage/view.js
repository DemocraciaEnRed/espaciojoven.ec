import View from '../view/view'
import template from './template.jade'
import slides from './slides'

export default class DemosHomepage extends View {
  constructor(topics) {
   super(template, { topics, slides })
  }
}