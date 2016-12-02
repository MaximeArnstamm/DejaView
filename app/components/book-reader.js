import Ember from 'ember';
import { EKMixin } from 'ember-keyboard';
import { keyDown } from 'ember-keyboard';

export default Ember.Component.extend(EKMixin, {
  classNames: ['book-reader'],
  attributeBindings: ['style'],
  style: Ember.computed('imgUrl', function() {
    let back = `background-image: url('${ this.get('imgUrl')}'`;
    return Ember.String.htmlSafe(back);
  }),
  activateKeyboard: Ember.on('init', function() {
    this.set('keyboardActivated', true);
  }),
  bindRight: Ember.on(keyDown('ArrowRight'), function() {
      this.actions.right.call(this);
  }),
  bindLeft: Ember.on(keyDown('ArrowLeft'), function() {
      this.actions.left.call(this);
  }),
  bindEsc: Ember.on(keyDown('Escape'), function() {
    this.get('esc')();
  }),
  actions: {
    right(){
      this.get('right')();
    },
    left(){
      this.get('left')();
    },
    top(){
      this.get('esc')();
    },
  }
});
