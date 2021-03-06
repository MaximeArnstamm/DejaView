import Ember from 'ember';
import fetch from "ember-network/fetch";
import LocalBook from "../models/local-book";
import RemoteBook from "../models/remote-book";
import RSVP from 'rsvp';

let Promise = RSVP.Promise;

export default Ember.Service.extend({
  comic_books: [],
  remoteUrls: [],
  localFolders: [],
  jszip: null, // injected if in electron
  fs: null, // injected if in electron
  path: null, // injected if in electron
  loadFromLocal(local_path) {
    let nodeFs = this.get('fs');
    let nodePath = this.get('path');
    let nodeJszip = this.get('jszip');

    if(nodeFs.lstatSync(local_path).isDirectory()) {

    } else {
      if(local_path.endsWith('inventory.json')) {
        let inventory = require(local_path);
        let books = inventory.comic_books.map(entry => LocalBook.create(entry));
        return new Promise((resolve) => resolve(books));
      }
      if(local_path.endsWith('.cbz')) {
        let episode_title = nodePath.basename(local_path);
        let series_title = 'unknown';
        let book = LocalBook.create({path: local_path, episode_title, series_title, nodeJszip, nodeFs});
        return new Promise((resolve) => resolve([book]));
      }
    }
  },
  loadFromRemote(url) {
    return fetch(url + 'books')
      .then((response) => response.json()) 
      .then((wrapper) => wrapper.comic_books)
      .then((comic_books) => { 
        let books = comic_books.map(entry => { 
          entry['baseUrl'] = url;
          return RemoteBook.create(entry);
        });
        return books;
      });
  },
  loadFromAll() {
    let remotePromises = this.get('remoteUrls').map(url => this.loadFromRemote(url));
    let localPromises = this.get('localFolders').map(folder => this.loadFromLocal(folder));

    return RSVP.Promise.all(remotePromises.pushObjects(localPromises)).then((bookss) => { 
      let books = bookss.reduce((acc, books) => acc.pushObjects(books), []);
      this.set('comic_books', books);
      return this.get('comic_books') ;
    });
  },
  getAll() { 
    if(this.get('comic_books.length') !== 0) {
      return new Promise((resolve) => resolve(this.get('comic_books')));
    }
    return this.loadFromAll();
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
  getBookById(id) { 
    return this.getAll()
      .then(all => all.findBy('id', id));
  }
});
