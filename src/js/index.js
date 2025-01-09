const size30x30 = document.getElementById("size30x30");
const size30x90 = document.getElementById("size30x90");
const size90x120 = document.getElementById("size90x120");
const size90x150 = document.getElementById("size90x150");
const buttonSizeOption = document.getElementById("button-size");
const someBuy = document.querySelector(".total-price");
const extraOptions = document.querySelectorAll(".extraInput");

let basePrice = 0; 
let extraPrice = 0; 


function checkSize() {
  if (size30x30.checked) {
    basePrice = 50;
  } else if (size30x90.checked) {
    basePrice = 100;
  } else if (size90x120.checked) {
    basePrice = 200;
  } else if (size90x150.checked) {
    basePrice = 345;
  }
  updateTotalPrice(); 
}


function updateExtraPrice() {
  extraPrice = 0; 
  extraOptions.forEach((option) => {
    if (option.checked) {
      extraPrice += parseInt(option.value);
    }
  });
}


function updateTotalPrice() {
  updateExtraPrice(); 
  someBuy.innerHTML = basePrice + extraPrice + " грн"; 
}


buttonSizeOption.onclick = checkSize;


extraOptions.forEach((option) => {
  option.onchange = updateTotalPrice;
});
