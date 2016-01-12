import Store from '../store/store';
import request from '../request/request';
import config from '../config/config';
import forumStore from '../forum-store/forum-store';
import urlBuilder from '../url-builder/url-builder';

const voteOptions = ['negative', 'positive', 'neutral'];

class TopicStore extends Store {
  constructor() {
    super()
    this._findParentsCache = {
      url: null,
      items: []
    };
  }

  name () {
    return 'topic';
  }

  parse (topic) {
    if (config.multiForum && !topic.forum) {
      return Promise.reject(new Error(`Topic ${topic.id} needs a forum.`));
    }

    let findForum = config.multiForum ? forumStore.findOne(topic.forum) : Promise.resolve();
    return findForum.then(forum => {
      topic.url = urlBuilder.topic(topic, forum);
      return topic;
    });
  }

  publish (id) {
    if (!this.item.get(id)) {
      return Promise.reject(new Error('Cannot publish not fetched item.'));
    }

    let promise = new Promise((resolve, reject) => {
      request
        .post(`${this.url(id)}/publish`)
        .end((err, res) => {
          if (err || !res.ok) return reject(err);

          this.parse(res.body).then(item => {
            this.set(id, item);
            resolve(item);
          });
        });
    });

    return promise;
  }

  unpublish (id) {
    if (!this.item.get(id)) {
      return Promise.reject(new Error('Cannot unpublish not fetched item.'));
    }

    let promise = new Promise((resolve, reject) => {
      request
        .post(`${this.url(id)}/unpublish`)
        .end((err, res) => {
          if (err || !res.ok) return reject(err);

          this.parse(res.body).then(item => {
            this.set(id, item);
            resolve(item);
          });
        });
    });

    return promise;
  }

  vote (id, value) {
    if (!this.item.get(id)) {
      return Promise.reject(new Error('Cannot vote not fetched item.'));
    }

    if (!~voteOptions.indexOf(value)) {
      return Promise.reject(new Error('Invalid vote value.'));
    }

    let promise = new Promise((resolve, reject) => {
      request
        .post(`${this.url(id)}/vote`)
        .send({ value: value })
        .end((err, res) => {
          if (err || !res.ok) return reject(err);

          this.parse(res.body).then(item => {
            this.set(id, item);
            resolve(item);
          });
        });
    });

    return promise;
  }

  /**
   * Method to find a list of parents Topics from the Database and cache them.
   *
   * @param {String} id
   * @return {Promise} fetch
   * @api public
   */
  findParents (...args) {
    let url = this.url('parents', ...args);

    if (this._findParentsCache.url === url) {
      return Promise.resolve(this._findParentsCache.items);
    }

    if (this._fetches.get(url)) return this._fetches.get(url);

    let fetch = this._fetch(url);

    fetch.then(items => {
      this._findParentsCache = {
        url: url,
        items: items
      };
      this.busEmit('update:parents', items);
    }).catch(err => {
      this.log('Found error', err);
    });

    return fetch;
  }
}

export default new TopicStore;
