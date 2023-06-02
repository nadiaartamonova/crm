import { generateId, calculateModalPrice } from "./helpers.js";
'use strict';

const modalForm = document.querySelector('.modal__form');
const modalTotalPrice = document.querySelector('.modal__total-price');
const inputs = document.querySelectorAll('.modal input'); 
modalTotalPrice.textContent = '$ 0.00';

const overlay = document.querySelector('.overlay');
const tbody = document.querySelector('.table__body');
const btnAddGoods = document.querySelector('.panel__add-goods');

inputs.forEach(input => {
  input.addEventListener('focus', handleFocus);
});

function handleFocus() {
  const count = parseInt(modalForm.count.value);
  const price = parseInt(modalForm.price.value);
  const discount = modalForm.discount.checked ? 1 - parseInt(modalForm.discount_count.value) / 100 : 1;
  const modalPrice = calculateModalPrice(count, price, discount);
  
  if(modalPrice > 0){
    modalTotalPrice.textContent = `$ ${modalPrice}`;
  } else {
    modalTotalPrice.textContent = '$ 0.00';
  }
}

const totalPrice = () => {
  const totalPriceText = document.querySelector('.cms__total-price');

  const prices = document.querySelectorAll('.total__price_row');
  const totalPrice = Array.from(prices).reduce((total, price) => {
    const priceValue = parseFloat(price.textContent.replace('$', ''));
    return total + priceValue;
  }, 0);

  totalPriceText.textContent = `$${totalPrice.toFixed(2)}`;
};

modalForm.discount.addEventListener('change', () => {
  const discountInput = document.querySelector('.modal__input_discount');
  if(modalForm.discount.checked) {
    discountInput.disabled = false;
    discountInput.required = true;
  } else{
    discountInput.value = '';
    discountInput.required = false;
    discountInput.disabled = true;
    handleFocus();
  }
});

modalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newProduct = Object.fromEntries(formData);
  const newId = generateId();
  newProduct.id = newId;
  newProduct.title = newProduct.name;

  const newRow = createRow(newProduct, rowCount() + 1);
  addRow(tbody, newRow);
  totalPrice();
  modalForm.reset();
  modalTotalPrice.textContent = '$ 0.00';
  overlay.classList.remove('active');

})

overlay.addEventListener('click', (e) => {
  const target = e.target;
  if(target === overlay || target.closest('.modal__close')){
    overlay.classList.remove('active');
  }           
});

btnAddGoods.addEventListener('click', () => {
  overlay.classList.add('active');
});

const createRow = ( elem , index = 1) => {
    const { id, title, category, units, count, price } = elem;

    return `
    <tr class="product">
        <td class="table__cell">${index}</td>
        <td class="table__cell table__cell_left table__cell_name" data-id="${id}">
            <span class="table__cell-id">id: ${id}</span>
            ${title}
        </td>
        <td class="table__cell table__cell_left">${category}</td>
        <td class="table__cell">${units}</td>
        <td class="table__cell">${count}</td>
        <td class="table__cell">$${price}</td>
        <td class="table__cell total__price_row">$${count * price}</td>
        <td class="table__cell table__cell_btn-wrapper">
        <button class="table__btn table__btn_pic"></button>
        <button class="table__btn table__btn_edit"></button>
        <button class="table__btn table__btn_del"></button>
        </td>
    </tr>`
}

const addRow = (tbody, row) => {
  tbody.insertAdjacentHTML("beforeend", row);
}

const rowCount = () => {
  return tbody.rows.length;
}

const init = (arr) => {
    let html = '';
    arr.forEach((elem, index) => {
        const newRow = createRow(elem, rowCount() + index + 1);
        html += newRow;
    })
    tbody.insertAdjacentHTML("beforeend", html);
    totalPrice();
}

tbody.addEventListener('click', (e) => {
  if(e.target.closest('.table__btn_del')){
    const trNode = e.target.parentNode.parentNode;
    
    const id = trNode.querySelector('.table__cell-id');
    const idValue = parseInt(id.textContent.trim().replace(/\D/g, '')); 
    const indexToRemove = goods.findIndex(item => item.id === idValue);

    if (indexToRemove !== -1) {
      goods.splice(indexToRemove, 1);
    }
    console.log(goods);
    trNode.remove();
    totalPrice();
  }
});


const goods = [
    {
      "id": 1,
      "title": "Смартфон Xiaomi 11T 8/128GB",
      "price": 27000,
      "description": "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
      "category": "mobile-phone",
      "discont": false,
      "count": 3,
      "units": "шт",
      "images": {
        "small": "img/smrtxiaomi11t-m.jpg",
        "big": "img/smrtxiaomi11t-b.jpg"
      }
    },
    {
      "id": 2,
      "title": "Радиоуправляемый автомобиль Cheetan",
      "price": 4000,
      "description": "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
      "category": "toys",
      "discont": 5,
      "count": 1,
      "units": "шт",
      "images": {
        "small": "img/cheetancar-m.jpg",
        "big": "img/cheetancar-b.jpg"
      }
    },
    {
      "id": 3,
      "title": "ТВ приставка MECOOL KI",
      "price": 12400,
      "description": "Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D",
      "category": "tv-box",
      "discont": 15,
      "count": 4,
      "units": "шт",
      "images": {
        "small": "img/tvboxmecool-m.jpg",
        "big": "img/tvboxmecool-b.jpg"
      }
    },
    {
      "id": 4,
      "title": "Витая пара PROConnect 01-0043-3-25",
      "price": 22,
      "description": "Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.",
      "category": "cables",
      "discont": false,
      "count": 420,
      "units": "v",
      "images": {
        "small": "img/lan_proconnect43-3-25.jpg",
        "big": "img/lan_proconnect43-3-25-b.jpg"
      }
    }
  ]

  console.log(init(goods));
