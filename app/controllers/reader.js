import Ember from 'ember';

export default Ember.Controller.extend({
  buildImgUrl: Ember.observer('model', function() {
    if(this.get('model.book')) {
      this.get('model.book').pageSrc(this.get('model.page'))
        .then(url => this.set('imgUrl', url));
    }
  }),
  fetchNextImage: Ember.observer('model.page', function() {
    if(this.get('model.book.isRemote')) {
      this.get('model.book').pageSrc(this.get('model.page') + 1)
        .then(url => (new Image()).src = url);
    }
  }),
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
