import fetchRequest from "./fetchRequest.js";
import responseText from "./responseText.js";

const addCategory = async (select) => {
  const list = await fetchRequest('category', {method: 'GET',
    callback: responseText,
  })
  const inputCategories = select.querySelector('#category');
  inputCategories.setAttribute('list', 'categories');
  const datalist = document.createElement('datalist');
  datalist.setAttribute('id', 'categories');
  inputCategories.insertAdjacentElement('afterend', datalist)
  list.forEach(item => {
    const option = document.createElement('option');
    option.value = item;
    datalist.append(option);
  })
}

export default addCategory;

