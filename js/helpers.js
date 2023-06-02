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