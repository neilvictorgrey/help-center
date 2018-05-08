function getCategoryMap() {
  return {
    "202726378":"Shotgun User Guide",
    "202866127":"Shotgun Admin Guide",
    "115000022673":"Shotgun Developer Guide",
    "202981388":"Shotgun Troubleshooting",
    "115000024774":"Release Notes",
    "114093982514": "RV Overview",
    "202726418":"RV User Guide",
    "202726408":"Studio Tools",
    "115000020413": "Shotgun Enterprise - Docker",
    "114093970474":"Shotgun Enterprise",
    "360000337333":"Automotive"
  };
}

function getCategoryId() {
  var pageType = getPageType();
  var pageId = getPageId();

  if (pageType === "category") {
    return pageId;
  }

  var ls = window.localStorage !== undefined;

  var categoryId = 0;
  var sectionId = 0;

  if (pageType === "section") {
    sectionId = pageId;
  }

  if (pageType === "article") {

    var articleIndex = {};
    if (ls && window.localStorage.getItem("articleIndex") !== null) {
      articleIndex = JSON.parse(window.localStorage.getItem("articleIndex"));
      if (articleIndex.hasOwnProperty(pageId.toString())) {
        return articleIndex[pageId.toString()];
      }
    }

    var articleUrl = "/api/v2/help_center/articles/" + pageId;
    $.ajax({
        url: articleUrl,
        async: false,
        success: function(result) {
        sectionId = result.article.section_id;
      }
    });

  }

  if (sectionId !== 0) {

    var sectionIndex = {};
    if (ls && window.localStorage.getItem("sectionIndex") !== null) {
      sectionIndex = JSON.parse(window.localStorage.getItem("sectionIndex"));
      if (sectionIndex.hasOwnProperty(sectionId.toString())) {
        if (pageType === "article") {
          articleIndex[pageId.toString()] = sectionIndex[sectionId.toString()];
          window.localStorage.setItem("articleIndex", JSON.stringify(articleIndex));
        }
        return sectionIndex[sectionId.toString()];
      }
    }

    var sectionUrl = "/api/v2/help_center/sections/" + sectionId;
    $.ajax({
      url: sectionUrl,
      async: false,
      success: function(result) {
        categoryId = result.section.category_id;
      }
    });

    if (pageType === "article") {
      articleIndex[pageId.toString()] = categoryId;
      window.localStorage.setItem("articleIndex", JSON.stringify(articleIndex));
    }
    sectionIndex[sectionId.toString()] = categoryId;
    window.localStorage.setItem("sectionIndex", JSON.stringify(sectionIndex));
  }

  return categoryId;
}

function createCategoryIndex() {
  var categoriesUrl = "/api/v2/help_center/categories.json";
  var categoryIndex = [];
  var idxName = getCategoryIndexName();
  $.get(categoriesUrl).then(function(result) {
    result.categories.forEach(function(category) {
      categoryIndex.push(category.id);
    });
    window.sessionStorage.setItem(idxName, JSON.stringify(categoryIndex));
  });
  return categoryIndex;
}

function getCategoryIndexName() {
  var idxName = "categoryIndex-" + HelpCenter.user.role;
  return idxName;
}

function getCategoryIndex() {
  var ls = window.sessionStorage !== undefined;
  var categoryIndex = [];
  var idxName = getCategoryIndexName();
  if (ls !== false && window.sessionStorage.getItem(idxName) !== null && window.sessionStorage.getItem(idxName) !== "{}") {
    categoryIndex = JSON.parse(window.sessionStorage.getItem(idxName));
  } else {
    categoryIndex = createCategoryIndex();
  }
  return categoryIndex;
}

function validateCategoryAccess(categoryId) {
  categoryIndex = getCategoryIndex();
  if (categoryIndex.indexOf(categoryId) >= 0) {
    return true;
  }
  return false;
}

function getProductCategories(productName) {
  var categoryMap = {};
  var productMap = getProductMap();
  for (var prod in productMap) {
    if(productMap.hasOwnProperty(prod)) {
      if (categoryMap.hasOwnProperty(productMap[prod])) {
        categoryMap[productMap[prod]].push(prod);
      } else {
        categoryMap[productMap[prod]] = [prod];
      }
    }
  }

  /* Sort according to category index */
  var sortedCategoryProductMap = [];
  var categoryIndex = getCategoryIndex();
  for (i=0; i<categoryIndex.length; i++) {
    if (categoryMap[productName].indexOf(categoryIndex[i].toString()) >= 0) {
      sortedCategoryProductMap.push(categoryIndex[i].toString());
    }
  }
  
  /* Zendesk has crappy loading issues where we'll come back empty sometimes */
  if (sortedCategoryProductMap != []) {
    return sortedCategoryProductMap;
  } else {
    return categoryMap[productName];
  }
}

function toggleCategoryTree() {
    $(".category-tree").on("click", "h2 a, h3 a", function() {
        $(this).parent().nextAll().toggle();
        return false;
    })
}
