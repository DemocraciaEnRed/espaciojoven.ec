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
      debugger
      var view = new DemosHomepage(ctx.topics);
      view.replace('#content');
      window.setInterval(function(){
        var currentInput = view.find('#slider-wrapper input:checked').id();
        var labels = view.find('#slider-wrapper label');
        var currentLabel = null;

        labels.forEach(function(e, i){
          if(e.getAttribute('for') == currentInput) currentLabel = i;
        });

        var ind = ++currentLabel;
        currentLabel = (ind > labels.length - 1)?0:ind;
        labels[currentLabel].click();

      }, 4000);
    }
  )
}

demosHomepage()
