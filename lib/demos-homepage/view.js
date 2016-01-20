import View from '../view/view'
import template from './template.jade'

export default class DemosHomepage extends View {
  constructor(topics) {
   super(template, { topics })
  }
}