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
    this._title;
  }

  get author() {
    this._author;
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
