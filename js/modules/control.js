import { createTable } from './createElements.js';
import { removeStorage, setStorage } from './storageControl.js';
import { totalPrice, generateId, calculateModalPrice } from "./helpers.js";

export const listControl = (tbody) => {

    tbody.addEventListener('click', (e) => {
        if(e.target.closest('.table__btn_del')){
            const trNode = e.target.parentNode.parentNode;
            const id = trNode.querySelector('.table__cell-id');
            const idValue = parseInt(id.textContent.trim().replace(/\D/g, '')); 

            removeStorage(idValue);
            createTable(tbody);
            totalPrice();
        }
    });
}

export const modalControl = (btnAddGoods, tbody) => {
    const overlay = document.querySelector('.overlay');
    const modalForm = document.querySelector('.modal__form');
    const modalTotalPrice = document.querySelector('.modal__total-price');
    const inputs = document.querySelectorAll('.modal input'); 

    overlay.addEventListener('click', (e) => {
        const target = e.target;
        if(target === overlay || target.closest('.modal__close')){
            overlay.classList.remove('active');
        }           
    });
    
    btnAddGoods.addEventListener('click', () => {
        overlay.classList.add('active');
    });

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
        newProduct.id = generateId();
        newProduct.title = newProduct.name;

        setStorage("basketList", newProduct);
        totalPrice();
        modalForm.reset();
        createTable(tbody);
        overlay.classList.remove('active');
    })

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


}

export const pictureControl = (btnPic) => {
    btnPic.addEventListener('click', () => {
        const url = btnPic.getAttribute('data-pic');
        const windowWidth = 800;
        const windowHeight = 600;
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;

        const left = (screenWidth - windowWidth) / 2;
        const top = (screenHeight - windowHeight) / 2;

        window.open(url, "_blank", `width=${windowWidth},height=${windowHeight},left=${left},top=${top}`);
    })
}