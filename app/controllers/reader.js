import Ember from 'ember';

export default Ember.Controller.extend({
  imgUrl: Ember.computed('model.page', function() {
    return this.buildImgUrl(this.get('model.page'));
  }),
  fetchNextImage: Ember.observer('model.page', function() {
    (new Image()).src = this.buildImgUrl(this.get('model.page') + 1);
  }),
  buildImgUrl: function(page) { return `books/${this.get('model.book.id')}/pages/${page}`; },
  init() {
    this._super(...arguments);
    console.log('init !');
  },
  actions: {
    goToDetails() {
      this.transitionToRoute('details', this.get('model.book.series_title'));
    },
    next(){
      this.transitionToRoute(`/reader/books/${this.get('model.book.id')}/pages/${this.get('model.page') + 1}`);
    },
    previous(){
      this.transitionToRoute(`/reader/books/${this.get('model.book.id')}/pages/${this.get('model.page') - 1}`);
    },
  }
});
