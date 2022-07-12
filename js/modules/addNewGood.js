import {modalForm} from "./price.js";
import fetchRequest from "./fetchRequest.js";
import responseText from "./responseText.js";
import addImg from "./file.js";
import {init} from "../main.js";

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
  const modalFile = document.querySelector('.modal__file');
  modalFile.addEventListener('change', addImg);
  modalForm.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(modalForm);
    const data = Object.fromEntries(formData);
    data.image = await toBase64(data.image);
    await fetchRequest('goods', {
      method: 'POST',
      callback: responseText,
      body: data,
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
       init();
      })
      .catch(error => {
        console.log(error.message);
      })
  })

}



