export default class Item {
    name = "";
    price = 0;
    img = "";
    count = 1;
    constructor({ name, price, img }) {
      this.name = name;
      this.price = price;
      this.img = img;
    }
    inсCount() {
      this.count++;
    }
    decCount() {
      this.count--;
    }
    addBtnInBasket() {
      const btn = document.createElement(`button`);
      btn.classList.add(`featured-products_list_button`);
      btn.innerHTML = `Buy now`;
  
      btn.addEventListener(`click`, () => {
        // Паттерн Singleton
        const BasketInstance = new Basket();
        BasketInstance.addItem(this);
        console.log(BasketInstance);
      });
      return btn;
    }
    addBtnMinusItem() {
      const btn = document.createElement(`button`);
      btn.classList.add("header__basket__items_quantity_btn-minus");
      btn.innerHTML = `-`;
  
      btn.addEventListener(`click`, () => {
        // Паттерн Singleton
        const BasketInstance = new Basket();
        BasketInstance.removeItem(this);
      });
      return btn;
    }
    addBtnPlusItem() {
      const btn = document.createElement(`button`);
      btn.classList.add("header__basket__items_quantity_btn-plus");
      btn.innerHTML = `+`;
  
      btn.addEventListener(`click`, () => {
        // Паттерн Singleton
        const BasketInstance = new Basket();
        BasketInstance.addItem(this);
      });
      return btn;
    }
    getMainTemplate() {
      const { name, price, img } = this; // Деструктурирующее присваивание
      const wrapper = document.createElement(`div`);
      wrapper.classList.add(`featured-products_list`);
      wrapper.innerHTML = `
      <img src="${img}" alt="${name}" />
      <h3 class="featured-products_list_title">${name}</h3>
        <p class="featured-products_list_price">${price}$</p>
      `;
      wrapper.appendChild(this.addBtnInBasket());
      return wrapper;
    }
  
    getBasketTemplate() {
      const { name, price, count } = this; // Деструктурирующее присваивание
      const wrapper = document.createElement(`div`);
      wrapper.classList.add(`header__basket__items_item`);
      wrapper.innerHTML = `
        <p class="header__basket__items_name">Name:<br> ${name}</p>
        <p class="header__basket__items_count">Count:<br> ${count}</p>
        <p class="header__basket__items_price">Price 1 item:<br> ${price}$</p>
        <p class="header__basket__items_total">Total:<br> ${count * price}$</p>
      `;
      wrapper.appendChild(this.addBtnMinusItem());
      wrapper.appendChild(this.addBtnPlusItem());
      return wrapper;
    }
  }
  