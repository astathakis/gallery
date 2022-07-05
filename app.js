function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
}

//element passes section city or nature
function Gallery(element) {
  this.container = element;
  //using ES6 spread operator to turn nodelist to an array
  this.list = [...element.querySelectorAll('.img')];
  // target
  this.modal = getElement('.modal');
  this.modalImg = getElement('.main-img');
  this.imageName = getElement('.image-name');
  this.modalImages = getElement('.modal-images');
  this.closeBtn = getElement('.close-btn');
  this.prevBtn = getElement('.prev-btn');
  this.nextBtn = getElement('.next-btn');

  //use self to point to gallery in cb of listener
  //this kind of setup ll come back later in ES6
  // let self = this; and self.openModal() in cb

  //bind functions
  // this.openModal = this.openModal.bind(this);

  //point to gallery binds
  this.closeModal = this.closeModal.bind(this);
  this.nextImage = this.nextImage.bind(this);
  this.prevImage = this.prevImage.bind(this);
  this.chooseImage = this.chooseImage.bind(this);
  // event container
  this.container.addEventListener(
    'click',
    function (e) {
      // self.openModal()
      if (e.target.classList.contains('img')) {
        this.openModal(e.target, this.list);
      }
    }.bind(this)

    //no need for seperate bind in this case no removing Listeners
  );
}

//add function to proto
Gallery.prototype.openModal = function (selectedImage, list) {
  console.log(selectedImage, list);
  this.setMainImage(selectedImage);
  this.modalImages.innerHTML = list
    .map(function (image) {
      return `<img src="${
        image.src
      }" title="${image.title}" data-id="${image.dataset.id}" class="${selectedImage.dataset.id === image.dataset.id ? 'modal-img selected' : 'modal-img'}"/>`;
    })
    .join('');
  this.modal.classList.add('open');
  //bind used to close those event listeners
  //'this' must point to the gallery
  this.closeBtn.addEventListener('click', this.closeModal);
  this.nextBtn.addEventListener('click', this.nextImage);
  this.prevBtn.addEventListener('click', this.prevImage);
  this.modalImages.addEventListener('click', this.chooseImage);
};

Gallery.prototype.setMainImage = function (selectedImage) {
  this.modalImg.src = selectedImage.src;
  this.imageName.textContent = selectedImage.title;
};
//important always remove event listeners when close not to pile them up
Gallery.prototype.closeModal = function () {
  this.modal.classList.remove('open');
  this.closeBtn.removeEventListener('click', this.closeModal);
  this.nextBtn.removeEventListener('click', this.nextImage);
  this.prevBtn.removeEventListener('click', this.prevImage);
  this.modalImages.removeEventListener('click', this.chooseImage);
};
Gallery.prototype.nextImage = function () {
  const selected = this.modalImages.querySelector('.selected');
  const next =
    selected.nextElementSibling || this.modalImages.firstElementChild;
  selected.classList.remove('selected');
  next.classList.add('selected');
  this.setMainImage(next);
};
Gallery.prototype.prevImage = function () {
  const selected = this.modalImages.querySelector('.selected');
  const prev =
    selected.previousElementSibling || this.modalImages.lastElementChild;
  selected.classList.remove('selected');
  prev.classList.add('selected');
  this.setMainImage(prev);
};
Gallery.prototype.chooseImage = function (e) {
  if (e.target.classList.contains('modal-img')) {
    // console.log(e.target);
    const selected = this.modalImages.querySelector('.selected');
    selected.classList.remove('selected');
    e.target.classList.add('selected');
    this.setMainImage(e.target);
  }
};

const nature = new Gallery(getElement('.nature'));
const city = new Gallery(getElement('.city'));
