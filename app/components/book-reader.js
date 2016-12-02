import Ember from 'ember';
import { EKMixin } from 'ember-keyboard';
import { keyDown } from 'ember-keyboard';

export default Ember.Component.extend(EKMixin, {
  classNames: ['book-reader'],
  attributeBindings: ['style'],
  style: Ember.computed('currentImageUrl', function() {
    let back = `background-image: url('${ this.get('currentImageUrl')}'`;
    return Ember.String.htmlSafe(back);
  }),
  activateKeyboard: Ember.on('init', function() {
    this.set('keyboardActivated', true);
  }),
  bindRight: Ember.on(keyDown('ArrowRight'), function() {
      this.actions.next.call(this);
  }),
  bindLeft: Ember.on(keyDown('ArrowLeft'), function() {
      this.actions.previous.call(this);
  }),
  bindEsc: Ember.on(keyDown('Escape'), function() {
    this.get('goToDetails')();
  }),
  currentPage: 0,
  currentImageUrl: Ember.computed('currentPage', function() {
    return this.imageUrl(this.get('currentPage'));
  }),
  imageUrl: function(page) { return `books/${this.get('book.id')}/pages/${page}`; },
  fetchNextImage() {
    (new Image()).src = this.imageUrl(this.get('currentPage') + 1);
  },
  actions: {
    next(){
      this.set('currentPage', this.get('currentPage') + 1);
      this.fetchNextImage();
    },
    previous(){
      this.set('currentPage', this.get('currentPage') - 1);
    },
    top(){
      this.get('goToDetails')();
    },
  }
});
