import Ember from 'ember';
import { EKMixin } from 'ember-keyboard';
import { keyDown } from 'ember-keyboard';

export default Ember.Component.extend(EKMixin, {
  classNames: ['book-reader'],
  attributeBindings: ['style'],
  style: Ember.computed('imageUrl', function() {
    let back = `background-image: url('${ this.get('imageUrl')}'`;
    return Ember.String.htmlSafe(back);
  }),
  activateKeyboard: Ember.on('init', function() {
    this.set('keyboardActivated', true);
  }),
  bindRight: Ember.on(keyDown('ArrowRight'), function() {
      this.actions.next.call(this);
  }),
  bindEsc: Ember.on(keyDown('ArrowLeft'), function() {
      this.actions.previous.call(this);
  }),
  bindLeft: Ember.on(keyDown('Escape'), function() {
    this.get('goToDetails')();
  }),
  currentPage: 0,
  imageUrl: Ember.computed('currentPage', function() {
    return `books/${this.get('book.id')}/pages/${this.get('currentPage')}`;
  }),
  actions: {
    next(){
      this.set('currentPage', this.get('currentPage') + 1);
    },
    previous(){
      this.set('currentPage', this.get('currentPage') - 1);
    },
  }
});
