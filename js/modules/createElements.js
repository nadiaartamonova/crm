import { getStorage } from './storageControl.js';

export const createTable = (tbody) => {
    const arr = getStorage('basketList');
    let html = '';
    arr.forEach((elem, index) => {
        html += createRow(elem, index + 1);
    });

    tbody.innerHTML = html;
}

export const createBasketHeader = () => {
    const header = document.querySelector('.goods__panel');
    
    const buttonFilter = document.createElement('button');
    buttonFilter.classList.add('panel__filter');
    buttonFilter.innerText = 'Фильтр';
    header.append(buttonFilter);

    const searchForm = document.createElement('form');
    searchForm.classList.add('panel__search');

    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'search');
    searchInput.classList.add('panel__input');
    searchInput.placeholder = 'Поиск по наименованию и категории';

    searchForm.append(searchInput);
    header.append(searchForm);

    const buttonAddProduct = document.createElement('button');
    buttonAddProduct.classList.add('panel__add-goods');
    buttonAddProduct.innerText = 'Добавить товар';
    header.append(buttonAddProduct);

    return header;
}

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