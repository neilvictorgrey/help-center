function search() {
  window.location.search = $.param({
    query: $("#quick-search").val(),
    status: $("#request-status-select").val(),
    organization_id: $("#request-organization-select").val()
  });
}

// Custom search placeholder text
function setSearchPlaceholder() {
  $('.st-default-search-input').attr('placeholder','Find anything (like tutorials, time logs, or task templates)');
}

function setRequestsPlaceholder() {
  if (getPageType() === "request-list") {
    $('.requests-search').attr("placeholder", "Search Requests...");
  }
}

function enableSearchBar() {
  // Submit requests filter form in the request list page
  $("#request-status-select, #request-organization-select").on("change", function() {
    search();
  });

  // Submit requests filter form in the request list page
  $("#quick-search").on("keypress", function(e) {
    if (e.which === 13) {
      search();
    }
  });

  $("#user-nav-search-icon").on("click", searchCallback);
  $(document).keyup(function(e) {
    if (e.keyCode === 27) { searchCallback(); }
  });
}

// Open search panel
function quickFocus(element) {
  element.focus();
}

function searchCallback() {
  
  var searchContainer = $("#user-nav-search-container");
  var topNavWidth = $(".header-inner").css("width");
  
  if (searchContainer.css("display") === "none") {
    $("#user-nav-search-icon i").css("color", "#323131");
    $("#user-nav-search-icon a").css("border-radius", "5px 0px 0px 5px");
    $(".docs-nav").css("display", "none");
    $(".search-table").css("width", "100%");
    searchContainer.css("display", "table-cell");
    $("#user-nav-search").animate({"width":"100%"}, 250);
    quickFocus($("#user-nav-search-input"));
  } else {
    // Contract the search panel
    $("#user-nav-search-icon i").css("color", "#ffffff");
    $("#user-nav-search-icon a").css("border-radius", "5px");
    searchContainer.css("display", "none");
    $(".docs-nav").css("display", "table-cell");
    $(".search-table").css("width", "0");
          $("#user-nav-search").css("width", "36px");
  }
  
}

// Random Background For Search Bar
function rndBackgroundImgBox() {
  var imgDir = "//p6.zdassets.com/hc/theme_assets/7538/1405/";
  var imgFiles = [
    "outside-desk-blur.jpg",
    "outside-desk-blur-2.jpg"
  ];
  var imgIdx = Math.floor(Math.random() * imgFiles.length);
  return "url('" + imgDir + imgFiles[imgIdx] + "')";
}

// Enable Background For Search Bar
function setBackgroundImgBox() {
  var topBkgd = $(".background-img-box");
  if (topBkgd != null && topBkgd.length > 0) {
    $(".article-title").css("display", "none");
    $(".breadcrumbs").css("display", "none");
    topBkgd.css("background-image", rndBackgroundImgBox());
    topBkgd.prependTo($("main"));
  }
}
