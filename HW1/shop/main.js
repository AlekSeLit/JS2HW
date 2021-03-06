class Item {
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

class List {
  items = [];

  constructor(items = []) {
    this.items = items;
  }

  findRepeat(Repeat) {
    return this.items.filter((item) => item.name === Repeat.name)[0];
  }
  addItem(item) {
    const repeat = this.findRepeat(item);
    if (repeat) {
      repeat.inсCount();
    } else {
      this.items.push(item);
    }
    this.render();
  }
  removeItem(item) {
    const exists = this.findRepeat(item);
    if (!exists) {
      return;
    }
    if (exists.count > 1) {
      exists.decCount();
    } else {
      this.items = this.items.filter((Repeat) => item.name !== Repeat.name);
    }
    this.render();
  }
  render() {}
}

class Basket extends List {
  constructor(items) {
    if (Basket._instance) {
      // Паттерн Singleton
      return Basket._instance;
    }
    super(items);
    this.openBasket();
    Basket._instance = this; // Паттерн Singleton
  }
  openBasket() {
    let buttonBasket = document.querySelector(".header__basket__button");
    let divBasket = document.querySelector(".header__basket__items");
    buttonBasket.addEventListener(`click`, () => {
      divBasket.classList.toggle("header__basket__close");
    });
  }
  getSumTemplate() {
    const sum = this.items.reduce((sum, item) => {
      return sum + item.price * item.count;
    }, 0);

    const sumBlock = document.createElement("p");
    sumBlock.classList.add("header__basket__price");
    sumBlock.innerHTML = `Total price: ${sum}$`;

    return sumBlock;
  }
  getEmptyTemplate() {
    const sumBlock = document.createElement("div");
    sumBlock.classList.add("header__basket__items__empty");
    sumBlock.innerHTML = `Cart is empty`;

    return sumBlock;
  }
  render() {
    const placeToRender = document.querySelector(`.header__basket__items`);
    if (!placeToRender) {
      return;
    }
    placeToRender.innerHTML = "";
    this.items.forEach((item) => {
      const template = item.getBasketTemplate();
      placeToRender.appendChild(template);
    });

    if (this.items.length) {
      placeToRender.appendChild(this.getSumTemplate());
    } else {
      placeToRender.appendChild(this.getEmptyTemplate());
    }
  }
}

class ItemList extends List {
  _pageCounter = 1;
  constructor() {
    super();
    this.initShowMoreBtn();

    let goodsPromise = this.fetchGoods();
    goodsPromise.then(() => {
      this.render();
    });
  }
  initShowMoreBtn() {
    const btn = document.querySelector(".featured-products__showmore");
    btn.addEventListener("click", () => {
      this.fetchGoods().then(() => {
        this.render();
      });
    });
  }

  hideShowMoreBtn() {
    const btn = document.querySelector(".featured-products__showmore");
    btn.remove();
  }
  fetchGoods() {
    const result = fetch(
      `https://alekselit-shop-test.herokuapp.com/database/page${this._pageCounter}.json`
      // `http://localhost:3333/database/page${this._pageCounter}.json`
    );
    return result
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this._pageCounter++;
        this.items.push(
          // трансформирование массива со свойствами в массив с объектами
          // поштучно добавляем объекты в список через оператор spread (...)
          ...data.data.map((cur) => {
            return new Item(cur);
          })
        );
      })
      .catch((e) => {
        this.hideShowMoreBtn();
        console.log(e);
      });
  }

  render() {
    const placeToRender = document.querySelector(`.featured-products_wrap`);
    if (!placeToRender) {
      return;
    }
    placeToRender.innerHTML = "";
    this.items.forEach((item) => {
      const template = item.getMainTemplate();
      placeToRender.appendChild(template);
    });
  }
}

// Добавление товаров на страницу
const ItemListInstance = new ItemList();

// Реализация корзины
const BasketInstance = new Basket();
