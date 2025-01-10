const size30x30 = document.getElementById("size30x30");
const size30x90 = document.getElementById("size30x90");
const size90x120 = document.getElementById("size90x120");
const size90x150 = document.getElementById("size90x150");
const buttonSizeOption = document.getElementById("button-size");
const someBuy = document.querySelector(".total-price");
const extraOptions = document.querySelectorAll(".extraInput");
const customSizeX = document.getElementById("width-custom-size");
const customSizeY = document.getElementById("height-custom-size");
const customSizeButton = document.getElementById("button-custom-size");

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


function checkCustomSize() {
  const width = parseInt(customSizeX.value);
  const height = parseInt(customSizeY.value);

  if (!width || !height) {
    alert("Введите коррекктные размеры");
    return;
  }

  if (width < 30 || width > 90 || height < 30 || height > 150) {
    alert("Размер должен быть в пределах от 30 до 90 по ширине и от 30 до 150 по высоте");
    return;
  }

  basePrice = (width * height) * 0.04; 
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

// Обновляем итоговую стоимость
function updateTotalPrice() {
  updateExtraPrice(); 
  someBuy.innerHTML = basePrice + extraPrice + " грн"; 
}

// Обработчики событий
buttonSizeOption.onclick = checkSize;
customSizeButton.onclick = checkCustomSize;
extraOptions.forEach((option) => {
  option.onchange = updateTotalPrice;
});
