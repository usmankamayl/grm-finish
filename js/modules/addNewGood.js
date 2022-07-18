import {getTotalPrice, priceOnBlur, tableBody} from "./price.js";
import fetchRequest from "./fetchRequest.js";
import responseText from "./responseText.js";
import addImg from "./file.js";
import {addClassActive, overlay} from "./attributes.js";
import addCategory from "./addCategory.js";
import {editGood} from "./edit.js";
import {infoOfAction} from "./infoOfAction.js";
import {renderGoods} from "./renderGoods.js";


const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.addEventListener('loadend', () => {
    resolve(reader.result);
  })

  reader.addEventListener('error', err => {
    reject(err);
  })

  reader.readAsDataURL(file);
})


export const addNewGood = function () {
  if (document.querySelector('.image-container')) {
    document.querySelector('.image-container').remove();
  }
  const submitForm = overlay.querySelector('.modal__submit');
  const modalFile = document.querySelector('.modal__file');
  addClassActive(overlay);
  addCategory(overlay);
  priceOnBlur(overlay);
  const modalForm = overlay.querySelector('.modal__form');
  modalFile.addEventListener('change', addImg);
  modalForm.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(modalForm);
    const data = Object.fromEntries(formData);
    data.image = toBase64(data.image);
    console.log(1);
    await fetchRequest('goods', {
      method: 'POST',
      callback: responseText,
      body: data,
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(async () => {
        modalForm.reset();
        console.log('update');
        setTimeout(() => {
          overlay.classList.remove('active')
        }, 500);
        infoOfAction('Товар добавлен')
        await renderGoods()
          .then(() => {
            getTotalPrice();
            editGood();
          });
      });
  })

}






