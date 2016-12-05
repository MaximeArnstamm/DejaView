import Book from "./book";

let JSZip = require('jszip');
let fs = require('fs');

export default Book.extend({
  pageSrc(index) {
    return new JSZip.external.Promise((resolve, reject) => {
      fs.readFile(this.get('path'), function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    })
      .then(data => JSZip.loadAsync(data))
      .then(wrapper => Object.keys(wrapper.files).filter(k => k.endsWith('jpg')).map(k => wrapper.files[k]))
      .then(files => files[index].async('base64'))
      .then(b64encoded => "data:image/jpg;base64," + b64encoded);
  },
  thumbnail() { return this.pageSrc(0); }
});
