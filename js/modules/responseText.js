import {overlay} from "./attributes.js";
const responseText = (err, res) => {
  if (err) {
    const errorBlock = document.createElement('div');
    errorBlock.classList.add('error-block');
    errorBlock.style.cssText = `
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 350px;
    height: 350px;
    background: #F2F0F9;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    z-index: 10;
    `;
    errorBlock.innerHTML = ` <button class="modal__close">
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="m2 2 20 20M2 22 22 2" stroke="currentColor" stroke-width="3" stroke-linecap="round" /></svg>
      </button>`

    const cross = document.createElement('div');
    cross.style.cssText = `
    width: 90px;
    height: 90px;
    background: url('img/cross.svg') no-repeat;
    `;
    const errorText = document.createElement('p');
    errorText.textContent = 'Что-то пошло не так';
    errorText.style.cssText = `
      position: absolute;
      top: 70%;
      left: 15%;
      z-index: 100;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #6E6893;`

    errorBlock.append(cross, errorText);


    overlay.append(errorBlock);
    return;
  } else {
    if (res === 200) {
      console.log('Success');
      return ;
    }

    if (res === 201) {
       console.log('Товар успешно добавлен');
       return ;
    }
    if (res === 404) {
      console.log('Товар не найден');
      return ;
    }

    if (res === 422) {
      console.log('странно, но сервер сломался :(');
      return ;
    }

    if (res === 500) {
      console.log('странно, но сервер сломался :(');
      return ;
    }
  }
}

export default responseText;
