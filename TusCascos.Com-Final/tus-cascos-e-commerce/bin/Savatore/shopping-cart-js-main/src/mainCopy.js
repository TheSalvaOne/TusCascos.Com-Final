let shop = document.getElementById("shop");

/**
 * ! Basket to hold all the selected items
 * ? the getItem part is retrieving data from the local storage
 * ? if local storage is blank, basket becomes an empty array
 */

let basket = JSON.parse(localStorage.getItem("data")) || [];

/**
 * ! Generates the shop with product cards composed of
 * ! images, title, price, buttons, description
 */

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, desc, img, price } = x;
      let search = basket.find((y) => y.id === id) || [];
      return `
      <article id=product-id-${id} class="producto__individual producto">
                <picture class="producto__foto">
                    <img src=${img} alt="preciosos cascos bluetooth color rojo">
                </picture>
                <span class="producto__inferior--align">
                    <div class="producto__descripcion">
                      <a href="">${name}</a>
                      <p>${desc}</p>
                    </div>
                    <div class="estrellas"></div>
                    <div class="price-quantity">
                        <a class="price-quantity__precio">€ ${price} </a>
                            <div class="buttons">
                                <p class="buttons__cantidad">Cantidad</p>
                                <i onclick="decrement(${id})" class="fa fa-minus"></i>
                                <div id=${id} class="quantity">
                                    ${search.item === undefined ? 0 : search.item}
                                </div>
                                <i onclick="increment(${id})" class="fa fa-plus"></i>
                            </div><br>
                        <button class="producto__shadow__btn">COMPRAR</button>
                    </div>
                </span>
            </article>
    `;
    })
    .join(""));
};

generateShop();

/**
 * ! used to increase the selected product item quantity by 1
 */

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  console.log(basket);
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! used to decrease the selected product item quantity by 1
 */

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! To update the digits of picked items on each item card
 */

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

/**
 * ! To calculate total amount of selected Items
 */

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();



// *****  controlar el color de la barra de menu para cambiarle el color al hacer scroll ****

// Obtener la barra de menú por su ID
const menu = document.getElementById("menu");

// Punto en la página en el que deseas cambiar el color (ajusta el valor según tu diseño)
const scrollTriggerPoint = 700; // Cambia esto al valor que desees

// Agregar un evento de desplazamiento (scroll) a la ventana
window.addEventListener("scroll", () => {
    // Obtener la posición actual del scroll
    const scrollY = window.scrollY;

    // Verificar si el scroll ha alcanzado el punto deseado
    if (scrollY >= scrollTriggerPoint) {
        // Cambiar el color de fondo de la barra de menú
        menu.style.backgroundColor ="rgb(65 57 57)"; // Reemplaza "tu_color_de_fondo" con el color deseado
    } else {
        // Restaurar el color de fondo inicial
        menu.style.backgroundColor = "#0000002b"; // O el color inicial que hayas definido
    }
});
