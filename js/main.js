import {removeClassActive, overlay, checkedInput, addClassActive, addAttribute} from "./modules/attributes.js";
import {addNewGood} from "./modules/addNewGood.js";
import {priceOnBlur} from "./modules/price.js";
import {removeRow} from "./modules/renderGoods.js";
import {getTotalPrice} from "./modules/price.js";
import {editGood} from "./modules/edit.js";
import filterGoods from "./modules/search.js";
import {renderGoods} from "./modules/renderGoods.js";



export const init =  async () => {
  const goods = await renderGoods();
  addClassActive();
  addAttribute();
  removeClassActive(overlay);
  checkedInput();
  addNewGood();
  priceOnBlur();
  removeRow();
  getTotalPrice();
  editGood();
  filterGoods(init);
  const btnPic = document.querySelectorAll('.table__btn_pic');

  btnPic.forEach(el => {
    el.addEventListener('click', () => {
      open(`${el.dataset.pic}`, '', 'width=800, height=600, top=132, left=368');
    })
  })

}

init();







