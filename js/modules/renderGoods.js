import {tableBody} from "./price.js";
import {overlay} from "./attributes.js";
import fetchRequest from './fetchRequest.js';
import responseText from "./responseText.js";
import {showGoods} from "./showGoods.js";



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
      const overlayUpdate = document.querySelector('.overlay-update');
      overlayUpdate.innerHTML = `
       <div class="overlay__modal modal">
      <button class="modal__close">
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="m2 2 20 20M2 22 22 2" stroke="currentColor" stroke-width="3" stroke-linecap="round" /></svg>
      </button>

      <div class="modal_top">
        <h2 class="modal__title">Изменить товар</h2>
        <div class="modal__vendor-code vendor-code">
          <p class="vendor-code__wrapper">id: <span class="vendor-code__id">216421548</span></p>
          <button class="vendor-code__btn">
            <svg width="15" height="15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#a)" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m11.672 3.646 1.557 1.556-1.557-1.556Zm1.002-1.372L8.463 6.485a1.557 1.557 0 0 0-.427.796l-.389 1.947 1.947-.39c.302-.06.578-.208.796-.425L14.6 4.2a1.36 1.36 0 0 0 0-1.927 1.362 1.362 0 0 0-1.926 0v0Z" />
                <path d="M13.53 10.699v2.206a1.47 1.47 0 0 1-1.471 1.47H3.97a1.47 1.47 0 0 1-1.471-1.47V4.816a1.47 1.47 0 0 1 1.47-1.47h2.207" />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M0 0h15v15H0z" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>

      <form  class="modal__form modal__form-update">
        <fieldset class="modal__fieldset">

          <label class="modal__label modal__label_name" for="name">
            <span class="modal__text">Наименование</span>
            <input class="modal__input" type="text" name="title" id="name">
          </label>


          <label class="modal__label modal__label_category" for="category">
            <span class="modal__text">Категория</span>
            <input class="modal__input" type="text" name="category" id="category">
          </label>

          <label class="modal__label modal__label_description" for="description">
            <span class="modal__text">Описание</span>
            <textarea class="modal__input modal__input_textarea" name="description" id="description"></textarea>
          </label>

          <label class="modal__label modal__label_units" for="units">
            <span class="modal__text">Единицы измерения</span>
            <input class="modal__input" type="text" name="units" id="units">
          </label>

          <div class="modal__label modal__label_discount">
            <label class="modal__text" for="discount">Дисконт</label>
            <div class="modal__checkbox-wrapper">
              <input class="modal__checkbox" type="checkbox" name="discount" id="discount">
              <input class="modal__input modal__input_discount" type="text" name="discount_count" disabled>
            </div>
          </div>


          <label class="modal__label modal__label_count" for="count">
            <span class="modal__text">Количество</span>
            <input class="modal__input" type="text" name="count" id="count">
          </label>

          <label class="modal__label modal__label_price" for="price">
            <span class="modal__text">Цена</span>
            <input class="modal__input" type="text" name="price" id="price">
          </label>

          <label tabindex="0" for="image" class="modal__label modal__label_file">Добавить изображение</label>
          <input class="modal__file visually-hidden" tabindex="-1" type="file" name="image" id="image">
        </fieldset>

        <div class="modal__footer">
          <label class="modal__total">Итоговая стоимость:
            <output class="modal__total-price" name="total">$ 0</output>
          </label>

          <button class="modal__submit" type="submit">Изменить товар</button>
        </div>
      </form>
    </div>
      `
      showGoods(data)

      return data;
    })
    .catch(() => preloader.remove())
}

//DELETE /api/goods/{id}





