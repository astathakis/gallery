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
};

Gallery.prototype.setMainImage = function (selectedImage) {
  this.modalImg.src = selectedImage.src;
  this.imageName.textContent = selectedImage.title;
};

const nature = new Gallery(getElement('.nature'));
const city = new Gallery(getElement('.city'));
