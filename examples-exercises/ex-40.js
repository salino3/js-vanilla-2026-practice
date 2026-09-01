export class Media {
  _title = "";
  _author = "";
  #_isCheckedOut = false;

  constructor(initTitle = "", initAuthor = "", initIsCheckedOut = false) {
    this._title = initTitle;
    this._author = initAuthor;
    this.#_isCheckedOut = initIsCheckedOut;
  }

  get title() {
    return this._title;
  }

  set setTitle(title) {
    this._title = title;
  }

  get author() {
    return this._author;
  }

  set setAuthor(author) {
    this._author = author;
  }

  get isCheckedOut() {
    return this.#_isCheckedOut;
  }

  toggleCheckOutStatus() {
    this.#_isCheckedOut = !this.#_isCheckedOut;
  }

  getDetails() {
    return `${this._title} by ${this._author}.`;
  }
}

const media1 = new Media("Test Title", "Joe");
console.log("media1", media1.author);
console.log("media2", media1.getDetails());

media1.setAuthor = "Jhonny";
console.log("media3", media1.author);
console.log("media4", media1.getDetails());
console.log("media5", media1.isCheckedOut);
media1.toggleCheckOutStatus();
console.log("media7", media1.isCheckedOut);

export class Book extends Media {
  _pages = null;

  constructor(initTitle, initAuthor, initIsCheckedOut, initPages) {
    super(initTitle, initAuthor, initIsCheckedOut);
    this._pages = initPages;
  }
}
