const size30x30 = document.getElementById("size30x30");
const size30x90 = document.getElementById("size30x90");
const size90x120 = document.getElementById("size90x120");
const size90x150 = document.getElementById("size90x150");
const someBuy = document.querySelector(".total-price");
const extraOptions = document.querySelectorAll(".extraInput");
const customSizeX = document.getElementById("width-custom-size");
const customSizeY = document.getElementById("height-custom-size");
const customSizeButton = document.getElementById("button-custom-size");
const canvasWrapper = document.querySelector(".canvas-wrapper");
const customSizeWrapper = document.querySelector(".custom-size-wrapper")
const buttonToggle = document.getElementById("toggle-custom")
const orderCallButton = document.getElementById("order-call");
const callPopup = document.querySelector(".call-popup");
const closePopupButton = document.querySelector(".close-popup");
document.getElementById("buy-button").addEventListener("click", function () {
const size = document.querySelector('input[name="size"]:checked')?.value || "Custom size";
const price = document.querySelector(".total-price").textContent;

  

const data = {
  size: size,
  price: price
};


fetch("index.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})
  .then((response) => response.text())
  .then((result) => {
    console.log("Сообщение отправлено:", result);
  })
  .catch((error) => {
    console.error("Ошибка:", error);
  });
});
let basePrice = 0; 
let extraPrice = 0; 




buttonToggle.addEventListener("change", showCustom);

function updateCanvasSize(width, height) {
  canvasWrapper.style.width = (width * 3) + "px";
  canvasWrapper.style.height = (height * 3) + "px";
}

function checkSize() {
  if (size30x30.checked) {
    basePrice = 50;
    updateCanvasSize(30, 30);
  } else if (size30x90.checked) {
    basePrice = 100;
    updateCanvasSize(30, 90);
  } else if (size90x120.checked) {
    basePrice = 200;
    updateCanvasSize(90, 120);
  } else if (size90x150.checked) {
    basePrice = 345;
    updateCanvasSize(90, 150);
  }
  updateTotalPrice(); 
}


function checkCustomSize() {
  const width = parseInt(customSizeX.value);
  const height = parseInt(customSizeY.value);
  
  if (!width || !height) {
    alert("Введите корректные размеры");
    return;
  }
  
  if (width < 30 || width > 90 || height < 30 || height > 150) {
    alert("Размер должен быть в пределах от 30 до 90 по ширине и от 30 до 150 по высоте");
    return;
  }
  
  if (width === 30 && height === 30) {
    basePrice = 50;
  } else if (width === 30 && height === 90) {
    basePrice = 100;
  } else if (width === 90 && height === 120) {
    basePrice = 200;
  } else if (width === 90 && height === 150) {
    basePrice = 345;
  } else {
    basePrice = (width * height) * 0.04;
  }
  updateCanvasSize(width, height);
  updateTotalPrice();
}
function showCustom() {
  if (buttonToggle.checked) { 
    customSizeWrapper.style.display = "block";
  } else {
    customSizeWrapper.style.display = "none";
  }
}
function toggleCustomSize() {
  customSizeWrapper.style.display = buttonToggle.checked ? "block" : "none";
}
document.querySelectorAll('input[name="size"]').forEach((radio) => {
  radio.addEventListener("change", hideCustomSizeOnStandardSelect);
});

function hideCustomSizeOnStandardSelect() {
  if (!buttonToggle.checked) {
    customSizeWrapper.style.display = "none";
  }
}

buttonToggle.addEventListener("change", toggleCustomSize);



function showPopup() {
  callPopup.style.display = "block"
}

function hidePopup() {
  callPopup.style.display = "none"
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
callPopup.addEventListener("click", (event) => {
  if (event.target === callPopup) {
    hidePopup()
  }
})


size30x30.onchange = checkSize;
size30x90.onchange = checkSize;
size90x120.onchange = checkSize;
size90x150.onchange = checkSize;

customSizeButton.onclick = checkCustomSize;
orderCallButton.addEventListener("click", showPopup) 
closePopupButton.addEventListener("click", hidePopup) 


extraOptions.forEach((option) => {
  option.onchange = updateTotalPrice;
});
