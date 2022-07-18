import {getTotalPrice, tableBody} from "./price.js";
import {createRow} from "./create.js";
import {editGood} from "./edit.js";
import {removeRow} from "./removeRow.js";

export function showGoods (data) {
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
    while (data.length - start >= 10 && tableBody.querySelectorAll('tr').length < data.length) {
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
}
