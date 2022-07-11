import {modalForm} from "./price.js";
import addCategory from "./addCategory.js";
export const overlay = document.querySelector('.overlay');
const modalInput = document.querySelector('.modal__checkbox + .modal__input');
const modalCheckbox = document.querySelector('.modal__checkbox');
const btnAddGood = document.querySelector('.panel__add-goods');

export const addClassActive = function () {
  btnAddGood.addEventListener('click', async () => {
    if (document.querySelector('.image-container')) {
      document.querySelector('.image-container').remove();
    }
    await addCategory();
    modalForm.reset();
    overlay.classList.add('active');
  });
}

export const addAttribute = function () {
  modalForm.querySelectorAll('input').forEach(input => {
    if (input.name === 'count' || input.name === 'discount_count' || input.name === 'price' || input.name === 'count') {
      input.setAttribute('type','number');
    }
    if (input.name !== 'image') {
      input.setAttribute('required', 'true');
    }

  })
}

export const removeClassActive = function (select) {
  select.addEventListener('click', e => {
    e.stopPropagation();
    const target = e.target;
    if (document.querySelector('.error-block')) {
      if (target.closest('.error-block') || target.closest('.modal__close')) {
        document.querySelector('.error-block').remove();
      }
    }
    if (target === select || target.closest('.modal__close')) {
      select.classList.remove('active');
      if (document.querySelector('.img-text')) {
        console.log('.img-text')
        document.querySelector('.img-text').remove();
      }
    }
  });
}

export const checkedInput = function () {
  modalCheckbox.addEventListener('change', () => {
    if (modalCheckbox.checked) {
      modalInput.removeAttribute('disabled');
    } else {
      modalInput.setAttribute('disabled', 'disabled');
      modalInput.value = '';
    }
  })
}
