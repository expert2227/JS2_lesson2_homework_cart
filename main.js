class ProductList { 
  constructor(container = '.products') {
    this.container = document.querySelector(container);
    this.goods = [];
    this.productObjects = [];
    this.fetchGoods();
    this.render();
    this.sumElemProducts(this.productObjects);

  }

  fetchGoods() {
    this.goods = [
      {id: 1, title: 'Notebook', price: 20000},
      {id: 2, title: 'Mouse', price: 1500},
      {id: 3, title: 'Keyboard', price: 5000},
      {id: 4, title: 'Gamepad', price: 4500},
    ];
  }

  render() {
    for (const good of this.goods) {
      const productObject = new ProductItem(good);
      console.log(productObject);
      this.productObjects.push(productObject);

      this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
    }
  }

  sumElemProducts (productObjects) {
    let prodAllPrice = 0;
    productObjects.forEach((elem) => {
      let elemPrice = elem.price;
      prodAllPrice += elemPrice; 
    })
    console.log('сумма всех товаров составляет : ' + prodAllPrice + 'руб');
  }
};



/*
 Добавьте пустые классы для Корзины товаров и Элемента корзины товаров
 Продумайте, какие методы понадобятся для работы с этими сущностями.
    корзина 
    это блок с z-индексом 1 и position: absolute
    отрисовывается в header после кнопки, изначально имеет класс hidden (addevenlistener, click, toggle)
    

    методы
    при нажатии на корзину toggle class hidden,
    вешает addeventlistener click на каждый эл из списка товаров
    


    элемент                                                                                  класс создается в методе ProductList
    копирует себе содержимое productObjects[];
    берет id товара и передает его в корзину
    
    click берет id товара, и через цикл проходит по списку productobjects[] находит эл и добавляет его в новый массив 
    который в свою очередь мы уже будем рендерить в самой корзине
      методы
      const basket = document.querySelector('.btn-cart');
*/


/**
 * addClickEventProduct - метод который вешает клик события на все товары
 * elemInMasRenderEl вспомогательный метод для корекции данных и для запуска класса товара
 */
class MainBasket{
  constructor(basket = '.btn-cart') {
    const divProduct = document.querySelectorAll('.buy-btn');
    this.addClickEventProduct(divProduct);


  }

  addClickEventProduct (divProduct) {
    divProduct.forEach((elInCart) => {
      elInCart.addEventListener('click', this.elemInMasRenderEl)
    })
  }

  elemInMasRenderEl (event) {
        console.log(event.path[2].children[1]);
        const prod = event.path[2].children[1];
        new ElementAddInCart (prod);
  }
  
}


/**
 * класс товара который проверяет есть ли элемент по которому произошел клик в массиве
 * если есть то мы запускаем метод увеличения кол-ва данного товара в массиве, 
 * а затем снова передаем массив корзине для дальнейшей отрисовки в самой корзине
 */
class ElementAddInCart {
  constructor(prod) {
    const elementInToCart = [];
    if(!(prod in elementInToCart)) {
      elementInToCart.push(prod);
    } else {
      console.log(elementInToCart);
    }
    
  }
}


class ProductItem {
  constructor(product, img='https://via.placeholder.com/200x150') {
    this.id = product.id;
    this.title = product.title;
    this.price = product.price;
    this.img = img;
  }

  getHTMLString() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                    </div>
            </div>`;
  }
}

new ProductList();

new MainBasket();
// const products = [
  //   {id: 1, title: 'Notebook', price: 20000},
  //   {id: 2, title: 'Mouse', price: 1500},
  //   {id: 3, title: 'Keyboard', price: 5000},
  //   {id: 4, title: 'Gamepad', price: 4500},
  // ];
//
// const renderProduct = (item, img='https://via.placeholder.com/200x150') => `<div class="product-item">
//               <img src="${img}" alt="Some img">
//               <div class="desc">
//                   <h3>${item.title}</h3>
//                   <p>${item.price} \u20bd</p>
//                   <button class="buy-btn">Купить</button>
//               </div>
//           </div>`;
//
// const renderProducts = list => {
  //   document
//       .querySelector('.products')
//       .insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
// };
//
// renderProducts(products);
//

// class MainBasket {
//     constructor(basket = '.btn-cart') {
//       this.basket = document.querySelector(basket);
//       this.renderBasket(basket);
//     }

//     renderBasket(basket) {
//       const renderInPage = `<div class="allBasket">
//                               <div>
//                                 <span>наименование</span><span>стоимость</span><span>кол-во</span>
//                               </div>
//                               <div class="cellInBasketMain">
//                               </div>
//                               <div class="footerInBasket">
//                               </div>
//                             </div>`;
//       this.basket.addEventListener('click', function(renderInPage) {
//         this.basket.insertAdjacentHTML('beforeend', renderInPage);
//       })
//     } 
// }  



// new MainBasket ();