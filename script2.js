const RenderHeader2 = (TotalItems) => {
  const storedNumbers = JSON.parse(localStorage.getItem("num of items")) || [];
  document.getElementById("header2").innerHTML += `
      <a href="Ecommerce.html"><span class='ShowCarts'> Back To Home </span></a>
     <h2>Your Carts</h2>
      <a href="Ecommerce.html">
         <i class="fa-solid fa-cart-shopping"><div class="notification">${TotalItems}</div></i>
      </a>
      `;
};

const RenderContainer = (storedNumbers, index, TotalPriceForEachItem) => {
  document.getElementById("list").innerHTML += `
        <li>
          <div class="li_Text">
            <span>${storedNumbers.Name}</span>
          </div>
          <span class="checked textTdo">${storedNumbers.numItems} *  ${storedNumbers.Price}$</span>
          <span class="checked">$${TotalPriceForEachItem}</span>
          <span class="checked">To: ${storedNumbers.Location}</span>
          <div class='counters'>
          <button class="countersBTN" onclick="Increase(${index})">+</button>
          <button class="countersBTN" onclick="Decrease(${index})">-</button>
          </div>
          <button class="trashBTN" onclick="DeleteItem(${index})">🗑️</button>
        </li>
    `;
};

const TotalAndDelete = (TotalPrice, index) => {
  document.getElementById("number").innerHTML += `
     <div class="number">Total: $${TotalPrice} </div>
    `;
  document.getElementById("Delete_All").innerHTML += `
    <span onclick="DeleteAllItems(${index})">  <div class="Delete_All"> Delete All</div> </span>
   `;
};

const storedNumbers = JSON.parse(localStorage.getItem("num of items")) || [];
const DrawHeader = () => {
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
  RenderHeader2(TotalItems);

  let TotalPrice = 0;
  for (let k = 0; k < TotalPriceForEachItem.length; k++) {
    TotalPrice += TotalPriceForEachItem[k];
  }
  let index = 0;
  for (; index < storedNumbers.length; index++) {
    RenderContainer(storedNumbers[index], index, TotalPriceForEachItem[index]);
  }
  if (storedNumbers.length > 0) {
    TotalAndDelete(TotalPrice, index);
  } else {
    document.getElementById("empty").innerHTML += `
      <span> There is no items yet!! </span>
  `;
  }
};

const DeleteItem = (index) => {
  storedNumbers.splice(index, 1);
  localStorage.setItem("num of items", JSON.stringify(storedNumbers));
  window.location.reload();
};

const DeleteAllItems = (index) => {
  storedNumbers.splice(0, index);
  localStorage.setItem("num of items", JSON.stringify(storedNumbers));
  window.location.reload();
};
const Increase = (index) => {
  let NewNumOfItems = storedNumbers[index].numItems;
  NewNumOfItems += 1;
  storedNumbers[index].numItems = NewNumOfItems;
  localStorage.setItem("num of items", JSON.stringify(storedNumbers));
  window.location.reload();
};
const Decrease = (index) => {
  let NewNumOfItems = storedNumbers[index].numItems;
  NewNumOfItems -= 1;
  storedNumbers[index].numItems = NewNumOfItems;
  localStorage.setItem("num of items", JSON.stringify(storedNumbers));
  window.location.reload();
  if (NewNumOfItems === 0) {
    DeleteItem(index);
  }
};

DrawHeader();
