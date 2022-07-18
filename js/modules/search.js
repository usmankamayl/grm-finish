//GET /api/goods/{category}

import fetchRequest from "./fetchRequest.js";
import responseText from "./responseText.js";
import {getTotalPrice, tableBody} from "./price.js";
import {editGood} from "./edit.js";
import {showGoods} from "./showGoods.js";
import {removeRow} from "./removeRow.js";
import {infoOfAction} from "./infoOfAction.js";
//import {updatePage} from "./updatePage";

const filterGoods = () => {
  const panelInput = document.querySelector('.panel__input');
  const debounce = (fn, msec) => {
    let lastCall = 0;
    let lastCallTimer = 0;

    return (...args) => {
      const previousCall = lastCall;
      lastCall = Date.now();
      if (previousCall && (lastCall - previousCall) <= msec) {
        clearTimeout(lastCallTimer)
      }
      lastCallTimer = setTimeout(() => fn(...args), msec);
    }
  }


  const searchGoods = debounce(sendFilter, 300);

   function sendFilter() {
     function ucFirst(str) {
       if (!str) return str;

       return str[0].toUpperCase() + str.slice(1);
     }
     const search = ucFirst(panelInput.value);
     fetchRequest(`goods/category/${search}`, {
      method: 'GET',
      callback: responseText,
    }).then(res => {
       console.log(res, ' res')
       if (res.length === 0) {
         tableBody.innerHTML = '';
         infoOfAction('По вашему запросу ничего не найдено', 'red');
         //updatePage(res);
         getTotalPrice();
         showGoods([]);
         editGood();
         return;
       }
       tableBody.innerHTML = '';
       if (search === '') {
         infoOfAction( `товаров загружено - ${res.length} `, 'green');
       } else infoOfAction( `По вашему запросу товаров найдено - ${res.length} `, 'green');

       //updatePage(res);
       showGoods(res);
       getTotalPrice();
       editGood();
       removeRow();
    })

  }

























  panelInput.addEventListener('input', searchGoods);


}

export default filterGoods;

