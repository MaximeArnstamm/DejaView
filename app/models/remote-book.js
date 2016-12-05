import Book from "./book";

export default Book.extend({
  baseUrl: '',
  isRemote: true,
  pageSrc(index) {
    let src = `${this.get('baseUrl')}/books/${this.get('id')}/pages/${index}`;
    return new Promise((resolve) => resolve(src));
  },
  thumbnail() { 
    let src = `${this.get('baseUrl')}/books/${this.get('id')}/thumbnail`;
    return new Promise((resolve) => resolve(src));
  }
});
