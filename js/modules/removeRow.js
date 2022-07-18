import {getTotalPrice, tableBody} from "./price.js";
import {removeClassActive} from "./attributes.js";
import fetchRequest from "./fetchRequest.js";
import responseText from "./responseText.js";
import {infoOfAction} from "./infoOfAction.js";
import {renderGoods} from "./renderGoods.js";
import {editGood} from "./edit.js";

export const removeRow = function  () {
  const rows = tableBody.querySelectorAll('.table__body tr');
  const overlayDelete = document.querySelector('.overlay-delete');
  overlayDelete.classList.remove('active');
  rows.forEach((row, index) => {
    row.addEventListener('click', e => {
      if (e.target.closest('.table__btn_del')) {
        overlayDelete.classList.add('active');
        overlayDelete.innerHTML = `
            <div class="overlay__modal modal">
              <button class="modal__close">
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="m2 2 20 20M2 22 22 2" stroke="currentColor" stroke-width="3" stroke-linecap="round" /></svg>
              </button>
              <button class="modal__delete" type="button">Удалить товар</button>
            </div>
            `
        removeClassActive(overlayDelete);
        const id = row.querySelector('.table__cell_name').dataset.id;
        const btnDelete = overlayDelete.querySelector('.modal__delete');
        btnDelete.addEventListener('click', (e) => {
          e.stopPropagation();
          fetchRequest(`goods/${id}`, {method: 'DELETE',  callback: responseText,}).then(r => {
            overlayDelete.classList.remove('active');
            row.remove();
            infoOfAction('Товар удален');
            renderGoods()
              .then(() => {
                getTotalPrice();
                editGood();
              })
          })
        })
      }
    })
  });
}
