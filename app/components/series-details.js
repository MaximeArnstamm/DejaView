import Ember from 'ember';

export default Ember.Component.extend({
  init(){
    this._super(...arguments);
    let firstEpisode = this.get('series')[0];
    firstEpisode.thumbnail()
      .then(src => this.set('thumbnailSrc', src));
    this.set('firstEpisode', firstEpisode);
  }
});
