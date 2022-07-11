//GET /api/goods/{category}

import fetchRequest from "./fetchRequest.js";
import responseText from "./responseText.js";
import {tableBody} from "./price.js";
import {createRow} from "./create.js";


const filterGoods = (cb) => {
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
       tableBody.innerHTML = '';
         res.forEach(item => {
           tableBody.append(createRow(item));
         })
       cb();
    })
  }





























  panelInput.addEventListener('input', searchGoods);


}

export default filterGoods;

