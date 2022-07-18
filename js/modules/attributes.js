import { modalForm} from "./price.js";
export const overlay = document.querySelector('.overlay');
const btnAddGood = document.querySelector('.panel__add-goods');

export const addClassActive = function () {
  btnAddGood.addEventListener('click', async () => {
    overlay.classList.add('active');
    modalForm.reset();
    removeClassActive(overlay);
    if (document.querySelector('.image-container')) {
      document.querySelector('.image-container').remove();
    }
    checkedInput(overlay);
    addAttribute(overlay);
  });
}

export const addAttribute = function (select) {
  const modalForm = select.querySelector('.modal__form');
  modalForm.querySelectorAll('input').forEach(input => {
    if (input.name === 'count' || input.name === 'discount_count' || input.name === 'price' || input.name === 'count') {
      input.setAttribute('type','number');
    }
    if (input.name !== 'image' &&  input.name !== 'discount' && input.name !== 'discount_count') {
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

export const checkedInput = function (select) {
  const modalInput = select.querySelector('.modal__checkbox + .modal__input');
  const modalCheckbox = select.querySelector('.modal__checkbox');
  modalCheckbox.addEventListener('change', () => {
    if (modalCheckbox.checked) {
      modalInput.removeAttribute('disabled');
    } else {
      modalInput.setAttribute('disabled', 'disabled');
      modalInput.value = '';
    }
  })
}
