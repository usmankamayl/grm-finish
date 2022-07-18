export const infoOfAction  = function (text, color = 'green')  {
  const p = document.createElement('p');
  p.classList.add('info-text');
  const crmHeader = document.querySelector('.crm__header');
  crmHeader.style.display = 'relative';
  p.textContent = text;
  p.style.cssText = `text-align: center;font-size: 14px;font-style:italic;color:${color};font-weight:bold;position:absolute;left:44%;
  `;
  crmHeader.append(p);
  setTimeout(() => {
    crmHeader.querySelector('.info-text').remove();
  }, 1500);
}
