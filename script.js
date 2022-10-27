const Cart = document.getElementById("cart");

const ITEMS = [
  {
    name: "Caramel Donuts",
    price: 8,
    image: "https://foodish-api.herokuapp.com/images/dessert/dessert19.jpg",
  },
  {
    name: "Shrimps Rice",
    price: 12,
    image: "https://foodish-api.herokuapp.com/images/rice/rice33.jpg",
  },
  {
    name: "Vegetable Pizza",
    price: 17,
    image: "https://foodish-api.herokuapp.com/images/pizza/pizza8.jpg",
  },
  {
    name: "Cheese Burger",
    price: 35,
    image: "https://foodish-api.herokuapp.com/images/burger/burger3.jpg",
  },
  {
    name: "Italian Pasta",
    price: 23,
    image: "https://foodish-api.herokuapp.com/images/pasta/pasta2.jpg",
  },
  {
    name: "Beef Samosa",
    price: 14,
    image: "https://foodish-api.herokuapp.com/images/samosa/samosa20.jpg",
  },
];

let obj = [];

const RenderHeader = (TotalItems) => {
  document.getElementById("header").innerHTML += `
    <a href="${"shoppingCart.html"}"><span class='ShowCarts'> Show Carts </span> </a>
    <h2>Ecommerce</h2>
    <a href="${"shoppingCart.html"}">
       <i class="fa-solid fa-cart-shopping"><div class="notification">${TotalItems}</div></i>
    </a>
    `;
};

const RenderItems = (ITEMS, index) => {
  document.getElementById("main").innerHTML += `
    <div class="cart " id="cart" onclick="NumOfCarts(${index})">
    <img
      src="${ITEMS.image}"
      alt="${ITEMS.name}"
      width="400px"
      height="350px"
      class="cart_img"
    />
    <div class="details">
      <span>${ITEMS.name}</span>
      <span class="price">${ITEMS.price}$</span>
    </div>
  </div>
    `;
};

const DrawITems = () => {
  let index = 0;
  for (; index < ITEMS.length; index++) {
    RenderItems(ITEMS[index], index);
  }
  //window.location.reload();
};
const DrawHeader = () => {
  const storedNumbers = JSON.parse(localStorage.getItem("num of items")) || [];
  let TotalPriceForEachItem = [storedNumbers.length];
  let NumOfItems = [storedNumbers.length];
  let TotalItems = 0;
  for (let i = 0; i < storedNumbers.length; i++) {
    TotalPriceForEachItem[i] =
      storedNumbers[i].Price * storedNumbers[i].numItems;
    NumOfItems[i] = storedNumbers[i].numItems;
  }
  for (let j = 0; j < NumOfItems.length; j++) {
    TotalItems += NumOfItems[j];
  }
  RenderHeader(TotalItems);
};

const NumOfCarts = (index) => {
  const Items = window.prompt("Please Enter The Number of Items do You Want");
  const numItems = Number(Items);
  if (numItems >= 1 && numItems <= 999) {
    const Location = window.prompt("Please Enter Your Location");
    const Name = ITEMS[index].name;
    const Price = ITEMS[index].price;
    const ObjOfItem = { Name, Price, numItems, Location };
    const storedNumbers =
      JSON.parse(localStorage.getItem("num of items")) || [];
    obj = [...storedNumbers, ObjOfItem];
    const ArrayOfNumbers = JSON.stringify(obj);
    localStorage.setItem("num of items", ArrayOfNumbers);
    window.location.reload();
  } else {
    alert("Invalid Input :(");
  }
};

DrawHeader();
DrawITems();
