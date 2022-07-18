import fetchRequest from "./fetchRequest.js";
import {getTotalPrice, priceOnBlur, tableBody} from "./price.js";
import responseText from "./responseText.js";
import addImg from "./file.js";
import addCategory from "./addCategory.js";
import {addAttribute, checkedInput, removeClassActive} from "./attributes.js";
import {updatePage} from "./updatePage.js";
import {infoOfAction} from "./infoOfAction.js";

const overlayUpdate = document.querySelector('.overlay-update');
//PATCH /api/goods/{id}
export const editGood = () => {
  const rows = tableBody.querySelectorAll('.table__body tr');
  rows.forEach((row, index) => {
    row.addEventListener('click',    async e => {
      if (e.target.closest('.table__btn_edit')) {
        if (document.querySelector('.image-container')) {
          document.querySelector('.image-container').remove();
        }
        const modalFile = document.querySelector('.modal__file');
        modalFile.addEventListener('change', addImg);
        const id = row.querySelector('.table__cell_name').dataset.id;
        const data = await fetchRequest(`goods/${id}`, {method: 'GET'});

        overlayUpdate.classList.add('active');
        const modalForm = overlayUpdate.querySelector('.modal__form-update');
        removeClassActive(overlayUpdate);
        await addCategory(overlayUpdate);
        priceOnBlur(overlayUpdate);
        checkedInput(overlayUpdate);
        addAttribute(overlayUpdate);
        modalForm.name.value = data.title;
        modalForm.category.value = data.category;
        modalForm.description.value = data.description;
        modalForm.units.value = 'шт';
        if (data.discount > 0) {
          modalForm.discount.checked = true;
          modalForm.discount_count.value = data.discount;
          modalForm.discount_count.disabled = false;
        }
        modalForm.count.value = data.count;
        modalForm.price.value = data.price;
        modalForm.total.value = `$ ${data.count * data.price}`;

        modalForm.addEventListener('submit', async e => {
          const formData = new FormData(modalForm);
          const body = Object.fromEntries(formData);
          e.preventDefault();
          e.stopImmediatePropagation()
          await fetchRequest(`goods/${id}`, {
            method: 'PATCH',
            callback: responseText,
            body,
            headers: {
              'Content-Type': 'application/json',
            }
          })
            .then(res => {
              console.log(res, ' the good updated');
              modalForm.reset();
              setTimeout(() => {
                overlayUpdate.classList.remove('active')
              }, 500)
              updatePage(res);
              getTotalPrice();
              infoOfAction('Товар изменен');
            })
            .catch(errors => {
              console.log(errors.message, errors, ' patch');
            })
        })
      }
    })
  });
}


