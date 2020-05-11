// Encapsulate image gallery

export class ImgGallery {
  constructor (imageList) {
    this.imageList = imageList;
    this.index = 0;
  }

  get currentImage() {
    return this.imageList[this.index];
  }

  get hasImages() {
    return this.imageList.length > 0;
  }

  setIndex (idx) {
    this.index = idx;
  }

  update (list) {
    this.imageList = list;
    this.index = 0;
  }

  movePrevious () {
    const p = (this.index + this.imageList.length - 1) % this.imageList.length;
    this.index = p;
  }

  moveNext () {
    const n = (this.index + 1) % this.imageList.length;
    this.index = n;
  }

  clear () {
    this.imageList = [];
    this.index = 0;
  }

}
