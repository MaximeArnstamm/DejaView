import Book from "./book";

export default Book.extend({
  nodeJszip: null,
  nodeFs: null,
  pageSrc(index) {
    let JSZip = this.get('nodeJszip');
    let fs = this.get('nodeFs');

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
