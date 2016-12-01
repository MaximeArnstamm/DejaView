import Ember from 'ember';

export default Ember.Route.extend({
  seriesService: Ember.inject.service(),
  model(params) {
    let result =  this.get('seriesService').getBookById(parseInt(params.id));
    return result;
  }
});
