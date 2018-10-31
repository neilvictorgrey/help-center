function getProductMap() {
  return {
    "202726378":"Shotgun",
    "202866127":"Shotgun",
    "115000022673":"Shotgun",
    "202981388":"Shotgun",
    "115000024774":"Shotgun",
    "360001044954":"Shotgun",
    "114093982514":"RV",
    "202726418":"RV",
    "202726408":"Studio",
    "115000020413":"Shotgun Enterprise",
    "114093970474":"Shotgun Enterprise",
    "360000337333":"Automotive"
  };
}

function getSelectedProduct(categoryId) {
  var categoryProducts = getProductMap();
  if (categoryProducts.hasOwnProperty(categoryId.toString())) {
    return categoryProducts[categoryId.toString()];
  }
  return '';
}

function getProductMenuIndexName() {
  var idxName = "productMenu-" + HelpCenter.user.role;
  return idxName;
}

function getProductMenu(categoryId) {
  var ls = window.sessionStorage !== undefined;
  idxName = getProductMenuIndexName();
  if (ls && window.sessionStorage.getItem(idxName) !== null) {
    $(".product-selector").append(JSON.parse(window.localStorage.getItem(idxName)));
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
  if (validateCategoryAccess(202726408)) {
      menuOrder.push("202726408");
  }
  /* SEC */
  if (validateCategoryAccess(114093970474)) {
      menuOrder.push("115000020413");
  }
  /* Automotive */
  if (validateCategoryAccess(360000337333)) {
      menuOrder.push("360000337333");
  }
  
  menuHtml = '<a class="dropdown-toggle product-selected-item">' + selectedProduct + '</a>';
  menuHtml += '<span class="dropdown-menu dropdown-menu-end product-items" role="menu">';
  for (var i=0; i<menuOrder.length; i++) {
    if (productMap.hasOwnProperty(menuOrder[i])) {
      productName = productMap[menuOrder[i]];
      menuHtml += '<a href="' + baseURL() + menuType + '/' + menuOrder[i] + '" rel="nofollow" role="menuitem">' + productName + '</a>';
    }
  }
  menuHtml += '</span>'

  window.sessionStorage.setItem(idxName, JSON.stringify(menuHtml));
  return menuHtml;
}
