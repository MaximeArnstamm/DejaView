import Ember from 'ember';
import fetch from "ember-network/fetch";

export default Ember.Service.extend({
  comic_books: null,
  getAll() { 
    if(this.get('comic_books')) {
      return new Promise((resolve) => resolve(this.get('comic_books')));
    }
    return fetch('books')
      .then((response) => response.json()) 
      .then((wrapper) => wrapper.comic_books)
      .then((comic_books) => { 
        this.set('comic_books', comic_books) ;
        return comic_books;
      });
  },
  getAllSeries() {
    return this.getAll().then((all) => { 
      let series_titles = all.mapBy('series_title').uniq();
      let result = series_titles.reduce((acc, el) => {
        acc.push(all.filterBy('series_title', el));
        return acc;
      }, []);
      return result;
    });
  },
  getSeriesByTitle(title) {
    return this.getAllSeries()
      .then(all => all.find(series => series[0].series_title === title ));
  },
  getById(id) { return this.get('series').findBy('id', id); }
});
