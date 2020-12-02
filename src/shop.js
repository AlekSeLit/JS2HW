import takeFeedback from "./feedback.js";
import Item from "./item.js";
import "./style.css";

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
    const result = fetch(`/database/page${this._pageCounter}.json`);
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

takeFeedback();
