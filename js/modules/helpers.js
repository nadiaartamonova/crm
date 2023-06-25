export const generateId = () => {
    const digits = '0123456789';
    let randomId = '';

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      randomId += digits.charAt(randomIndex);
    }

    return randomId;
}

export const calculateModalPrice = (count, price, discount = 1) => {
    return (count * price * discount);
  }

export const totalPrice = () => {
  console.log("Hi")
    const totalPriceText = document.querySelector('.cms__total-price');
  
    const prices = document.querySelectorAll('.total__price_row');
    const totalPrice = Array.from(prices).reduce((total, price) => {
      const priceValue = parseFloat(price.textContent.replace('$', ''));
      return total + priceValue;
    }, 0);
  
    totalPriceText.textContent = `$${totalPrice.toFixed(2)}`;
  };