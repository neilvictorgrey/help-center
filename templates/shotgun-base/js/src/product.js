function getProductMap() {
  return {
    "202726378":"Shotgun",
    "202866127":"Shotgun",
    "115000022673":"Shotgun",
    "202981388":"Shotgun",
    "115000024774":"Shotgun",
    "202726698":"Toolkit",
    "202726398":"Toolkit",
    "202726678":"Toolkit",
    "202726668":"Toolkit",
    "114093982514":"RV",
    "202726418":"RV",
    "202726408":"Studio",
    "114093970474":"Shotgun Enterprise"
  };
}

function getSelectedProduct(categoryId) {
  var categoryProducts = getProductMap();
  if (categoryProducts.hasOwnProperty(categoryId.toString())) {
    return categoryProducts[categoryId.toString()];
  }
  return '';
}

function getProductMenu(categoryId) {
  var ls = window.sessionStorage !== undefined;
  if (ls && window.sessionStorage.getItem("productMenu") !== null) {
    $(".product-selector").append(JSON.parse(window.localStorage.getItem("productMenu")));
  }

  var productMap = getProductMap();
  var selectedProduct = getSelectedProduct(categoryId);
  if (selectedProduct === '') {
    return selectedProduct
  }

  /* Replace this with index articles instead of categories */
  var menuType = "categories";
  var menuOrder = ["202726378","202726418"];
  /* Studio */
  if (validateCategoryAccess("202726408")) {
      menuOrder.push("202726408");
  }
  /* SEC */
  if (validateCategoryAccess("114093970474")) {
      menuOrder.push("114093970474");
  }
  
  menuHtml = '<a class="dropdown-toggle product-selected-item">' + selectedProduct + '</a>';
  menuHtml += '<span class="dropdown-menu dropdown-menu-end product-items" role="menu">';
  for (var i=0; i<menuOrder.length; i++) {
    if (productMap.hasOwnProperty(menuOrder[i])) {
      productName = productMap[menuOrder[i]];
      menuHtml += '<a href="https://support.shotgunsoftware.com/hc/en-us/' + menuType + '/' + menuOrder[i] + '" rel="nofollow" role="menuitem">' + productName + '</a>';
    }
  }
  menuHtml += '</span>'

  window.sessionStorage.setItem("productMenu", JSON.stringify(menuHtml));
  return menuHtml;
}
