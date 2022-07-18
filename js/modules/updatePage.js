export const updatePage = function (res) {
 const updatedGood = Array.from(document.querySelectorAll('.table__body tr')).find(el => el.querySelector('.table__cell_name').dataset.id === res.id);
  console.log(updatedGood, ' updatedGood')
 updatedGood.querySelector('.table__cell_left').textContent = res.category;
 updatedGood.querySelector('.table__cell_name').textContent = res.title;
 updatedGood.querySelector('.table__cell-price-1').textContent = res.price;
 updatedGood.querySelector('.table__cell-price').textContent = `${res.price * res.count}`;
 updatedGood.querySelector('.table__cell-count').textContent = `${res.count}`;

}
