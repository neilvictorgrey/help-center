function getTree(categoryId) {
  var defer = $.Deferred();
  var ls = window.localStorage !== undefined;
  var navbarSections = "navbar-sections-" + categoryId;

  if (ls && window.localStorage.getItem(navbarSections) !== null) {
    defer.resolve(JSON.parse(window.localStorage.getItem(navbarSections)));
  }

  var sectionsUrl = "/api/v2/help_center/categories/" + categoryId + "/sections.json";
  $.get(sectionsUrl).then(function(result) {
    var sections = [];
    result.sections.forEach(function(section) {
      sections.push({'id':section.id, 'html_url':section.html_url, 'name':section.name});
    })
    var promises = [];

    sections.forEach(function(section) {
      var promise = $.get("/api/v2/help_center/sections/" + section.id + "/articles.json").then(function(result) {
        var articles = [];
        result.articles.forEach(function(article) {
          articles.push({'id':article.id, 'html_url':article.html_url, 'name':article.name});
        });
        section.articles = articles;
      });

      promises.push(promise);
    });

    $.when.apply($, promises).done(function() {
      if (ls && window.localStorage.getItem(navbarSections) === null) {
        defer.resolve(sections);
      }

      if (ls) {
        window.localStorage.setItem(navbarSections, JSON.stringify(sections));
      }
    });
  });

  return defer;
}

function renderTree(sections, cId) {
  var promotedSections = "";
  var tree = $('<a class="user-guide-nav-title user-guide-nav-expand">'+getCategoryMap()[cId]+'</a>');
  var articleListing = $('<div class="article-listing"></div>');
  articleListing.append(sections.map(function(section) {
    // We render promoted sections as their own major headings
    if (specialSectionTypes().indexOf(section.name) >= 0) {
      promotedSections += '<a class="user-guide-nav-title promoted-section" href="' + section.html_url + '">' + section.name + '</a>';
      return;
    }

    var title = $('<div class="nav-section-title nav-title">' + section.name + '</div>');
    var children = $('<ul class="nav-children"></ul>');
    children.append(section.articles.map(function(article) {
      return $('<li><a class="nav-article" href="' + article.html_url + '">' + article.name + '</a></li>');
    }));

    //bonus div, because...
    return $("<div></div>").append([title, children]);
  }));
  tree = tree.add(articleListing);
  tree = tree.add($(promotedSections));
  return $("<div></div>").append(tree);
}

function collapseAllCategoryMenus(clicked) {
  var categoryTitles = $(".user-guide-nav-expand");
  categoryTitles.each(function() {
    if (($(this).attr("data-toggle-icon") === "-") && ($(clicked).html().trim() !== $(this).html().trim())) {
      $(this).parent().find('.article-listing').each(function() {
        $(this).slideToggle();
      });
      $(this).attr("data-toggle-icon", "+");
    }
  });
}

function collapseAllSectionMenus(clicked) {
  var sectionTitles = $(".nav-section-title");
  sectionTitles.each(function() { 
    if (($(this).attr("data-toggle-icon") === "-") && ($(clicked).html().trim() !== $(this).html().trim())) {
      $(this).siblings().each(function() {
        $(this).slideToggle();
      });
      $(this).attr("data-toggle-icon", "+");
    }
  });
}

function initializeExpandCollapse(target) {
  var articleTitle = $(".article-title");

  target.find(".article-listing").hide();
  $(".user-guide-nav-expand").attr("data-toggle-icon", "+");

  target.find(".nav-children").hide();
  $(".nav-header").attr("data-toggle-icon", "-");
  $(".nav-section-title").attr("data-toggle-icon", "+");
  
  // Open the existing article, if there is one.
  if (articleTitle.length === 1) {
    var foundMenuItem = false;
    articleTitle = articleTitle.html().trim();

    if (specialSectionTypes().indexOf(articleTitle) >= 0) {
      foundMenuItem = true;
    }
    if (foundMenuItem === false) {
      $(".nav-article").each(function() {
        if ($(this).html().trim() === articleTitle) {
          $(this).parents(".nav-children").show();
          $(this).parents(".nav-children").siblings(".nav-section-title").attr("data-toggle-icon", "-");
          $(this).addClass("active-article");
          $(this).closest(".article-listing").show();
          $(this).closest(".article-listing").parent().find(".user-guide-nav-expand").attr("data-toggle-icon", "-");
          foundMenuItem = true;
        }
      });
    }
    if (foundMenuItem === false) {
      $(".nav-section-title").each(function() {
        if ($(this).html().trim() === articleTitle) {
          $(this).parent().find(".nav-children").show();
          $(this).attr("data-toggle-icon", "-");
          $(this).closest(".article-listing").show();
          $(this).closest(".article-listing").parent().find(".user-guide-nav-expand").attr("data-toggle-icon", "-");
          foundMenuItem = true;
        }
      });
    }
    if (foundMenuItem === false) {
      $(".user-guide-nav-title").each(function() {
        if ($(this).html().trim() === articleTitle) {
          $(this).parent().find(".article-listing").show();
          $(this).parent().find(".user-guide-nav-expand").attr("data-toggle-icon", "-");
          foundMenuItem = true;
        }
      });
    }

    // If we can't find the article under this menu
    // it means we have an invalid index.
    if (foundMenuItem === false) {
      invalidateIndexes();
    }
  }
  
  $(".user-guide-nav-expand").click(function() {
    collapseAllCategoryMenus(this);
    $(this).parent().find(".article-listing").each(function() {
      $(this).slideToggle();
    });
    if ($(this).attr("data-toggle-icon") === "-") {
      $(this).attr("data-toggle-icon", "+");
    } else {
      $(this).attr("data-toggle-icon", "-");
    }
  });

  $(".article-listing .nav-header, .nav-section-title").click(function() {
    collapseAllSectionMenus(this);
    $(this).siblings().each(function() {
      $(this).slideToggle();
    });
    if ($(this).attr("data-toggle-icon") === "-") {
      $(this).attr("data-toggle-icon", "+");
    } else {
      $(this).attr("data-toggle-icon", "-");
    }
  });
} 

function checkArticleType(parentTitle) {
  var articleElement = $("#article-type");
  var typeText = articleElement.text();
  if (typeText.trim() == "Article") {
    if (specialSectionTypes().indexOf(parentTitle.trim()) >= 0) {
      articleElement.text(parentTitle.trim());
    }
  }
}

function specialSectionTypes() {
  return ['Tutorials','FAQ','Videos','Release Notes'];
}

function disableArticleComments() {
  var noComments = $(".no-comments");
  var articleComments = $(".article-comments");
  if (noComments != null && noComments.length > 0) {
    if (articleComments != null && articleComments.length > 0) {
      articleComments.css("display", "none");
      noComments.css("display", "none");
    }
  }
}

function loadSectionMenus() {
  var target = $(".user-guide-nav-contents");
  if (target != null && target.length > 0) {
    var categoryId = getCategoryId();
    var productMenu = getProductMenu(categoryId);
    if (productMenu === '') {
      $(".article-nav").css("display", "none");
      $(".article-column").css("padding-left", "0px");
    } else {
      var ls = window.sessionStorage !== undefined;
      if (ls && window.sessionStorage.getItem("categoryIndex") === null) {
        createCategoryIndex();
      }
      var productCategories = getProductCategories(getProductMap()[categoryId]);
      $(".product-selector").append(productMenu);
      for (var i=0; i<productCategories.length; i++) {
        var catId = productCategories[i];
        getTree(catId).then(function(tree) {
          $(target).append(renderTree(tree, catId)); 
        });
      }
      $('.promoted-section').appendTo(target);
    }
  }
}

function triggerLeftNavInit() {
  var target = $(".user-guide-nav-contents");
  if (target != null && target.length > 0) {
    initializeExpandCollapse(target);
  }
}
