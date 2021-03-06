import Ember from 'ember';

export default Ember.Route.extend({
  seriesService: Ember.inject.service(),
  model(params) {
    return this.get('seriesService').getBookById(parseInt(params.bookId))
      .then(book => ({ book: book, page: parseInt(params.page) }));
  }
});
