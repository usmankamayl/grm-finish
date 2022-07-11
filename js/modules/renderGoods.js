import {createRow} from "./create.js";
import {getTotalPrice, tableBody} from "./price.js";
import {overlay, removeClassActive} from "./attributes.js";
import fetchRequest from './fetchRequest.js';
import responseText from "./responseText.js";
import {editGood} from "./edit.js";


export const preloader = document.createElement('div');
preloader.classList.add('crm__goods');
const preloaderText = document.createElement('p');
preloaderText.textContent = 'Загрузка товаров...';
preloader.appendChild(preloaderText);
preloader.style.cssText = `
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:24px;
  position:fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: auto;
  background: rgba(255, 255, 255, 0.8);
`;


export const renderGoods = async function () {

  tableBody.innerHTML = '';
  document.querySelector('body').appendChild(preloader);

  const data = await fetchRequest('goods', {
    method: 'GET',
    callback: responseText,
  })
    .then(data => {
      preloader.remove();
      overlay.classList.remove('active');
      let start = 0;
      let end =  data.length - start > 10 ? 10 : data.length - start;
      data.slice(start, end).forEach(item => {
        tableBody.append(createRow(item));
      })
      const subPanelRight = document.querySelector('.sub-panel__right');
      const subPanelLeft = document.querySelector('.sub-panel__left');
      let subPanelChoicePages = document.querySelector('.sub-panel__choice-pages');
      let subPanelPages = document.querySelector('.sub-panel__pages');
      subPanelChoicePages.textContent = `Показывать на странице: ${end}`;
      subPanelPages.textContent = `1-${end} из ${data.length}`;
      subPanelRight.addEventListener('click', (e) => {
        e.preventDefault();
        while (data.length - start >= 10) {
          start += 10;
          end += data.length - start > 10 ? 10 : data.length - start;
          data.slice(start, end).forEach(item => {
            tableBody.append(createRow(item));
          })
        }

        subPanelChoicePages.textContent = `Показывать на странице: ${end}`;
        subPanelPages.textContent = `1-${end} из ${data.length}`;
        editGood();
        removeRow();
        getTotalPrice();
      })
      subPanelLeft.addEventListener('click', (e) => {
        e.preventDefault();
        start = 0;
        while (end > 10) {
          tableBody.innerHTML = '';
          end -= end % 10 === 0 ? 10 : end % 10;
          data.slice(start, end).forEach(item => {
            tableBody.append(createRow(item));
          })
        }
        subPanelChoicePages.textContent = `Показывать на странице: ${end}`;
        subPanelPages.textContent = `1-${end} из ${data.length}`;
        editGood();
        removeRow();
        getTotalPrice();
      })
      return data;
    })
    .catch(() => preloader.remove())
}

//DELETE /api/goods/{id}

export const removeRow = function  () {
  const rows = tableBody.querySelectorAll('.table__body tr');
  const overlayDelete = document.querySelector('.overlay-delete');
  overlayDelete.classList.remove('active');
  rows.forEach((row, index) => {
    row.addEventListener('click', e => {
        if (e.target.closest('.table__btn_del')) {
          overlayDelete.classList.add('active');
            removeClassActive(overlayDelete);
            const id = row.querySelector('.table__cell_name').dataset.id;
            const btnDelete = document.querySelector('.modal__delete');
            btnDelete.addEventListener('click', () => {
              fetchRequest(`goods/${id}`, {method: 'DELETE',  callback: responseText,}).then(r => {
                overlayDelete.classList.remove('active');
                row.remove();
                getTotalPrice();
              })
            })
        }
    })
  });
}



