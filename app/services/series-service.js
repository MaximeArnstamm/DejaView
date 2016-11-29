import Ember from 'ember';

export default Ember.Service.extend({
  series: [
    { 
      id: 1, 
      thumbnailSrc: 'http://www.bdtheque.com/repupload/T/T_52401.JPG', 
      title: 'taipi',
      episodes: [
        { number: 1, title: 'great' },
        { number: 2, title: 'crazy' },
        { number: 3, title: 'dingo' },
        { number: 4, title: 'foufou' },
        { number: 5, title: 'whaou' },
      ] 
    },
    { id: 2, thumbnailSrc: 'http://www.bdtheque.com/repupload/T/T_52401.JPG', title: 'taipi' }
  ],
  getAll() { return this.get('series'); },
  getById(id) { return this.get('series').findBy('id', id); }
});
