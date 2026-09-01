export class Media {
  _title = false;
  _author = false;
  #_isCheckedOut = false;

  constructor(initTitle, initAuthor, initIsCheckedOut) {
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
    return !!this.#_isCheckedOut;
  }

  toggleCheckOutStatus() {
    this.#_isCheckedOut = this.isCheckedOut();
  }

  getDetails() {
    return `${this._title} by ${this._author}.`;
  }
}

const media1 = new Media("Hola", "Joe", true);
console.log("clog1", media1.author);
media1.setAuthor = "Jhonny";
console.log("clog2", media1.author);
