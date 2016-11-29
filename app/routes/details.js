import Ember from 'ember';

export default Ember.Route.extend({
  seriesService: Ember.inject.service(),
  model(params) {
    return this.get('seriesService').getById(params.series_id);
  }
});
