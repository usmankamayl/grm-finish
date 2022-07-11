import fetchRequest from "./fetchRequest.js";
import {modalForm, tableBody} from "./price.js";
import {overlay} from "./attributes.js";
import responseText from "./responseText.js";
import {renderChanges} from "./addNewGood.js";
import addImg from "./file.js";
import addCategory from "./addCategory.js";
//PATCH /api/goods/{id}

export const editGood = () => {
  const rows = tableBody.querySelectorAll('.table__body tr');
  rows.forEach((row, index) => {
    row.addEventListener('click',    async e => {
      if (e.target.closest('.table__btn_edit')) {
        if (document.querySelector('.image-container')) {
          document.querySelector('.image-container').remove();
        }
        await addCategory();
        const modalFile = document.querySelector('.modal__file');
        modalFile.addEventListener('change', addImg);
        const id = row.querySelector('.table__cell_name').dataset.id;
        await fetchRequest(`goods/${id}`, {method: 'GET'})
          .then(data => {
            overlay.classList.add('active');
            modalForm.name.value = data.title;
            modalForm.category.value = data.category;
            modalForm.description.value = data.description;
            modalForm.units.value = 'шт';
            modalForm.discount.checked = false;
            modalForm.discount_count.value = '';
            if (data.discount !== 0) {
              modalForm.discount.checked = true;
              modalForm.discount_count.value = data.discount;
            }
            modalForm.count.value = data.count;
            modalForm.price.value = data.price;
            modalForm.total.value = `$ ${data.count * data.price}`;
          })


        modalForm.addEventListener('submit', async e => {
          e.preventDefault();
          const formData = new FormData(modalForm);
          const data = Object.fromEntries(formData);
          await fetchRequest(`goods/${id}`, {
            method: 'PATCH',
            callback: responseText,
            body: data,
            headers: {
              'Content-Type': 'application/json',
            }
          })
            .then(res => {
              renderChanges(res);
            })
            .catch(errors => {
              console.log(errors.message, ' path');
            })
        })
      }
    })
  });
}


