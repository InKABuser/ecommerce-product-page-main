const navBurger = document.querySelector("div.nav-logo > button");
const slider = document.querySelector(".slider");
const pictures = Array.from(document.getElementsByClassName("slider-item"));
const sliderImages = document.querySelectorAll(".slider-item img");
const displayed = document.querySelector(".shown-img");
const nextBTN = document.querySelector(".next");
const prevBTN = document.querySelector(".previous");
const popNext = document.querySelector(".next-pop");
const popPrev = document.querySelector(".previous-pop");
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const quant = document.querySelector(".cart-controls p");
const addToCartBtn = document.querySelector("button[title = 'add-to-cart']");
const cart = document.querySelector("#main-cart");
const popover = document.querySelector("[popover]");
const numberOfItems = document.querySelector(".number-of-items");
const removeItem = document.querySelector(".remove");
const popImages = document.querySelectorAll(".slider-item-pop img");
const emptyTitle = document.querySelector(".empty-cart");
console.log(removeItem);
let clickedImg;

if (window.matchMedia(innerWidth >= "700px")) {
  pictures.forEach((picture) => {
    picture.addEventListener("click", () => {
      clickedImg = picture.querySelector("img").getAttribute("src");
      console.log(clickedImg);
      if (clickedImg.includes("1")) {
        clickedImg = "images/image-product-1.jpg";
        displayed.setAttribute("src", clickedImg);
      } else if (clickedImg.includes("2")) {
        clickedImg = "images/image-product-2.jpg";
        displayed.setAttribute("src", clickedImg);
      } else if (clickedImg.includes("3")) {
        clickedImg = "images/image-product-3.jpg";
        displayed.setAttribute("src", clickedImg);
      } else if (clickedImg.includes("4")) {
        clickedImg = "images/image-product-4.jpg";
        displayed.setAttribute("src", clickedImg);
      }
      addActiveClass();
    });
  });
}

const nav = document.querySelector(".nav-list");
console.log(navBurger);
navBurger.addEventListener("click", () => {
  nav.classList.toggle("active");
  navBurger.style.zIndex = "400000";
  navBurger.classList.toggle("open");
});

let currentIndex = 0;
nextBTN.addEventListener("click", () => {
  // Increment the index, but ensure it loops back to 0 if it's at the end
  if (currentIndex < pictures.length - 1) {
    // Apply the translation to the slider container
    currentIndex++;
    pictures[currentIndex].style.transform = `translateX(-${
      currentIndex * 100
    }%)`;
  }
  console.log(currentIndex);
});
prevBTN.addEventListener("click", () => {
  if (currentIndex === 1) {
    pictures[currentIndex].style.transform = `translateX(${
      currentIndex * 100
    }%)`;
    currentIndex--;
  }
  if (currentIndex === 2) {
    pictures[currentIndex].style.transform = `translateX(${
      currentIndex * 100
    }%)`;
    currentIndex--;
  }
  if (currentIndex === 3) {
    pictures[currentIndex].style.transform = `translateX(${
      currentIndex * 100
    }%)`;
    currentIndex--;
  }
  console.log(currentIndex);
});

window.addEventListener("resize", () => {
  if (window.matchMedia("(min-width: 700px)").matches) {
    console.log("running");
    reset(pictures);
    currentIndex = 0;
  }
});
function reset(entries) {
  entries.forEach((entry) => {
    entry.style.transform = `translateX(0)`;
  });
}

// how many product
addToCartBtn.disabled = true;

let product = {
  img: "images/image-product-1-thumbnail.jpg",
  head: "Fall Limited Edition Sneakers",
  price: 125,
  quantity: 0,
};
plus.addEventListener("click", () => {
  product.quantity++;
  quant.textContent = product.quantity;
  addToCartBtn.disabled = false;
});
minus.addEventListener("click", () => {
  if (product.quantity > 0) {
    product.quantity--;
  }
  if (product.quantity === 0) {
    addToCartBtn.disabled = true;
  }
  quant.textContent = product.quantity;
});

addToCartBtn.addEventListener("click", () => {
  emptyTitle.style.display = "none";
  numberOfItems.style.display = "block";
  numberOfItems.textContent = product.quantity;
  if (!cart.querySelector(".cart-item")) {
    console.log("here");
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `<img src="${product.img}" alt="thumbnail" />
    <p class="item-title">${product.head}</p>
    <div class="item-info">
        <p class="item-price">${product.price.toFixed(2)}</p>
        <p class="item-quantity">x ${product.quantity}</p>
        <p class="items-total">${product.price * product.quantity}</p>
    </div>
    <img class="remove" src="images/icon-delete.svg" alt="remove-icon" />`;
    //
    const removeBTN = cartItem.querySelector(".remove");

    removeBTN.addEventListener("click", () => {
      if (product.quantity > 1) {
        product.quantity--;
        updateQuantity();
        numberOfItems.textContent = product.quantity;
        quant.textContent = product.quantity;
      } else if (product.quantity <= 1) {
        console.log(product.quantity);
        cartItem.remove();
        product.quantity = 0;
        numberOfItems.textContent = product.quantity;
        quant.textContent = product.quantity;
        emptyTitle.style.display = "block";
      }
    });
    cart.appendChild(cartItem);
  } else {
    updateQuantity();
  }
});

function updateQuantity() {
  const cartItem = cart.querySelector(".cart-item");
  if (cartItem) {
    cartItem.querySelector(".item-quantity").textContent = product.quantity;
    cartItem.querySelector(".items-total").textContent =
      product.quantity * product.price;
  }
  numberOfItems.textContent = product.quantity;
}

popover.addEventListener("click", (event) => {
  console.log("you clikced me");
  event.preventDefault();
  event.stopPropagation();
});
//
let imgArray = [
  "images/image-product-1.jpg",
  "images/image-product-2.jpg",
  "images/image-product-3.jpg",
  "images/image-product-4.jpg",
];

popNext.addEventListener("click", () => {
  let popImg = document.querySelector(".shown-img-pop");
  if (popImg.getAttribute("src").includes(imgArray[0])) {
    popImg.setAttribute("src", imgArray[1]);
  } else if (popImg.getAttribute("src").includes(imgArray[1])) {
    popImg.setAttribute("src", imgArray[2]);
  } else if (popImg.getAttribute("src").includes(imgArray[2])) {
    popImg.setAttribute("src", imgArray[3]);
  }
  addActiveClass();
});
popPrev.addEventListener("click", () => {
  let popImg = document.querySelector(".shown-img-pop");
  if (popImg.getAttribute("src").includes(imgArray[3])) {
    popNext.disabled = false;
    popImg.setAttribute("src", imgArray[2]);
  } else if (popImg.getAttribute("src").includes(imgArray[2])) {
    popImg.setAttribute("src", imgArray[1]);
  } else if (popImg.getAttribute("src").includes(imgArray[1])) {
    popImg.setAttribute("src", imgArray[0]);
  }
  addActiveClass();
});
function addActiveClass() {
  popImages.forEach((Image) => {
    let popImg = document.querySelector(".shown-img-pop");
    if (Image.getAttribute("src") === popImg.getAttribute("src")) {
      Image.classList.add("active");
    } else {
      Image.classList.remove("active");
    }
  });
  sliderImages.forEach((Image) => {
    let shownImg = document.querySelector(".shown-img");
    if (shownImg.getAttribute("src") === Image.getAttribute("src")) {
      Image.classList.add("active");
    } else {
      Image.classList.remove("active");
    }
  });
}
