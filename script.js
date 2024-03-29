document.addEventListener("DOMContentLoaded", () => {
  var searchInput = document.querySelector("#search");
  let games; // Declare 'games' variable without assignment

  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    games.forEach((game) => {
      const isVisible =
        game.title.textContent.toLowerCase().includes(value) ||
        game.price.textContent.toLowerCase().includes(value);
      game.box.classList.toggle("hide", !isVisible);
    });
  });

  games = Array.from(document.querySelectorAll(".product-box")).map((box) => {
    const title = box.querySelector(".product-title");
    const price = box.querySelector(".price");
    return { title, price, box };
  });
});

document.addEventListener("DOMContentLoaded", () => {
  let cartIcon = document.querySelector("#cart-icon");
  let cart = document.querySelector(".cart");
  let closeCart = document.querySelector("#close-cart");
  let dark = document.querySelector("#theme");
  let gameDesc = document.querySelectorAll(".product-description");
  let gameBox = document.querySelectorAll(".product-box");

  cartIcon.onclick = () => {
    cart.classList.add("active");
  };

  closeCart.onclick = () => {
    cart.classList.remove("active");
  };

  document.body.addEventListener("click", (event) => {
    if (
      !cart.contains(event.target) &&
      !cartIcon.contains(event.target) &&
      !event.target.classList.contains("cart-remove") // Exclude the remove button from closing the cart
    ) {
      cart.classList.remove("active");
    }
  });

  let isDark = false;

  dark.onclick = () => {
    if (isDark === false) {
      document.querySelector("body").classList.add("dark");
      isDark = true;
    } else {
      document.querySelector("body").classList.remove("dark");
      isDark = false;
    }
  };

  gameBox.forEach((game, index) => {
    let addButton = game.querySelector(".add-cart");

    game.onclick = (event) => {
      // Check if the add-cart button was clicked
      if (!event.target.classList.contains("add-cart")) {
        gameDesc[index].classList.add("active");
      }
    };
    addButton.onclick = (event) => {
      // Prevent event propagation to the product box
      event.stopPropagation();
      // Add your add-cart logic here
      // ...
    };
  });

  gameDesc.forEach((desc) => {
    let closeButton = desc.querySelector(".close-desc");
    closeButton.onclick = () => {
      closeGameDesc();
    };
  });

  document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      closeGameDesc();
    }
  };

  document.body.addEventListener("click", (event) => {
    for (var i = 0; i < gameDesc.length; i++) {
      if (
        !gameDesc[i].contains(event.target) &&
        !gameBox[i].contains(event.target)
      ) {
        gameDesc[i].classList.remove("active");
      }
    }
  });

  function closeGameDesc() {
    gameDesc.forEach((desc) => {
      desc.classList.remove("active");
    });
  }
});

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

function buyButtonClicked() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var gameIds = [];

  // Extract all the game IDs from the cart
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var gameId = cartBox.querySelector(".game-id").textContent;
    gameIds.push(gameId);
  }

  // Make sure we have at least one game ID to send
  if (gameIds.length === 0) {
    alert("No games in the cart to purchase.");
    return;
  }

  // Redirect to the store_game_ids.php page with the gameIds as query parameters
  window.location.href = "store_game_ids.php?gameIds=" + gameIds.join(",");

  // Clear the cart and update total
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

//Remove Items From Cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var id = shopProducts.getElementsByClassName("game-id")[0].textContent;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;

  addProductToCart(title, id, price, productImg);
  updateTotal();

  function addProductToCart(title, id, price, productImg) {
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    var cartItemsPrice = cartItems.getElementsByClassName("cart-price");

    for (var i = 0; i < cartItemsNames.length; i++) {
      var cartProductName = cartItemsNames[i].innerText;
      if (cartProductName === title) {
        // Product already in the cart, show an alert
        alert("This product is already in your cart!");
        updateTotal();
        return;
      }
    }

    // Product not in the cart, proceed to add it
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");

    var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img" />
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="game-id">${id}</div>
      <div class="cart-price">${price}</div>
    </div>
    <!-- Remove Cart -->
    <i class="bx bxs-trash-alt cart-remove"></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    animateCartIcon(); // Trigger the animation function

    cartShopBox
      .getElementsByClassName("cart-remove")[0]
      .addEventListener("click", removeCartItem);

    updateTotal();
  }

  function animateCartIcon() {
    var cartIcon = document.querySelector("#cart-icon");
    // Add animation class to cart icon
    cartIcon.classList.add("animate");

    // Remove the animation class after a certain time (e.g., 1 second)
    setTimeout(function () {
      cartIcon.classList.remove("animate");
    }, 1000);
  }
}

//Update Total
function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    if (priceElement.innerText === "Free to Play!") {
      var price = 0.0;
    } else {
      var price = parseFloat(priceElement.innerText.replace("$", ""));
    }
    total = total + price;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}
