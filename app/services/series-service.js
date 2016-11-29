import Ember from 'ember';

export default Ember.Service.extend({
  series: [
    { id: 1, thumbnailSrc: 'http://www.bdtheque.com/repupload/T/T_52401.JPG', title: 'taipi' },
    { id: 2, thumbnailSrc: 'http://www.bdtheque.com/repupload/T/T_52401.JPG', title: 'taipi' }
  ],
  getAll() { return this.get('series'); },
  getById(id) { return this.get('series').findBy('id', id); }
});
