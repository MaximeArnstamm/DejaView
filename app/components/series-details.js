import Ember from 'ember';

export default Ember.Component.extend({
  init(){
    this._super(...arguments);
    let firstEpisode = this.get('series')[0];
    this.set('thumbnailSrc', `books/${firstEpisode.id}/pages/0`);
    this.set('firstEpisode', firstEpisode);
  }
});
