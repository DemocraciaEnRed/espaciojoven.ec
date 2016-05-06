import debug from 'debug';
import page from 'page';
import o from 'component-dom';
import user from '../user/user';
import visibility from '../visibility/visibility';
import config from '../config/config';
import { findParents, clearTopicStore } from '../topic-middlewares/topic-middlewares';
import { show as showTopic } from '../topic/topic';
import DemosHomepage from './view'

const log = debug('democracyos:demos-homepage');

function demosHomepage() {
  if (!config.demosLayout) return;

  page('/',
    clearTopicStore,
    user.optional,
    visibility,
    findParents,
    (ctx, next) => {
      // Display content section
      // o(document.body).removeClass('browser-page');

      // Empty container and render form
      var view = new DemosHomepage(ctx.topics);
      view.replace('#content');
      // setTimeout(function(){
      //   var currentInput = view.find('#slider-wrapper input:checked').id();
      //   var labels = view.find('#slider-wrapper label');
      //   var currentLabel = null;

      //   labels.forEach(function(e, i){
      //     if(e.getAttribute('for') == currentInput) currentLabel = i;
      //   });

      //   currentLabel = (currentLabel++ >= arr.length)?0:currentLabel;

      //   labels[currentLabel].click();

      // }, 3000);
    }
  )
}

demosHomepage()
