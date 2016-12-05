import Ember from 'ember';

export default Ember.Component.extend({
  seriesService: Ember.inject.service(),
  actions: {
    addUrl() {
      this.get('seriesService.remoteUrls').pushObject(this.get('newUrl'));
      this.set('newUrl', '');
    },
    addLocalInventory() {
      const {dialog} = require('electron').remote;
      dialog.showOpenDialog({properties: ['openFile']}, path => {
        this.get('seriesService.localFolders').pushObject(path[0]);
      });
    }
  }
});
