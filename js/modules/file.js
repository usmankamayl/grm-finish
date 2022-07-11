const addImg = () => {
  const modalFieldset = document.querySelector('.modal__fieldset');
  const modalFile = document.querySelector('.modal__file');
  if (document.querySelector('.image-container')) {
    document.querySelector('.image-container').remove();
  }
  const imgWrapper = document.createElement('div');
  imgWrapper.classList.add('image-container');
  const img = document.createElement('img');
  imgWrapper.append(img);
  imgWrapper.style.cssText = 'width:200px;height:200px;background:background:#FFFFFF; grid-area: file-add;';
  img.style.width = '200px';
  img.style.height = '200px';
  modalFieldset.insertAdjacentElement('beforeend', imgWrapper);
  if (modalFile.files.length > 0) {
    img.src = URL.createObjectURL(modalFile.files[0]);
  }
  if (modalFile.files[0].size < 1048576) {
    imgWrapper.style.display = 'block';
  } else {
    modalFile.insertAdjacentHTML('beforebegin', '<p class="img-text" style="color: red;font-size: 18px">изображение не должно превышать размер 1 мб</p>')
  }
}



export default addImg;

