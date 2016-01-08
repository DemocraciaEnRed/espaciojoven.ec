import debug from 'debug';
import page from 'page';
import o from 'component-dom';
import user from '../user/user';
import visibility from '../visibility/visibility';
import config from '../config/config';
import { findTopics, clearTopicStore } from '../topic-middlewares/topic-middlewares';
import { show as showTopic } from '../topic/topic';
import DemosHomepage from './view'

const log = debug('democracyos:demos-homepage');

function demosHomepage() {
  if (!config.demosLayout) return;

  page('/',
    clearTopicStore,
    user.optional,
    visibility,
    findTopics,
    (ctx, next) => {
      // Display content section
      // o(document.body).removeClass('browser-page');

      // Empty container and render form
        var view = new DemosHomepage(ctx.topics);
        view.replace('#content');
    }
  )

}

demosHomepage()
