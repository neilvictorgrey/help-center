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
    articleTitle = articleTitle.text().trim();

    if (specialSectionTypes().indexOf(articleTitle) >= 0) {
      foundMenuItem = true;
    }
    if (foundMenuItem === false) {
      $(".nav-article").each(function() {
        if ($(this).text().trim() === articleTitle) {
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
        if ($(this).text().trim() === articleTitle) {
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
        if ($(this).text().trim() === articleTitle) {
          $(this).parent().find(".article-listing").show();
          $(this).parent().find(".user-guide-nav-expand").attr("data-toggle-icon", "-");
          foundMenuItem = true;
        }
      });
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
  return ['Tutorials','FAQ','Videos'];
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
      $(".product-selector").append(productMenu);
      renderCachedTree(target, categoryId);
    }
  }
}

function userTags() {
  user_tags = HelpCenter.user.tags;
  HelpCenter.user.organizations.forEach(function(org) {
    org.tags.forEach(function(tag) {
      user_tags.push(tag);
    });
  });
  return user_tags;
}

function userCanSeeSection(section) {
  user_tags = userTags();
  if (HelpCenter.user.role=="anonymous" && section.viewable_by!="everybody") {
    return false;
  }
  section.tags.forEach(function(tag) {
    if (!user_tags.includes(tag)) {
      return false;
    }
  });
  return true;
}

function sortedIds(objectList) {
  ordered = {};
  unordered = Object.keys(objectList);
  for (var i=0; i<unordered.length; i++) {
    ordered[objectList[unordered[i]].position] = unordered[i];
  }
  return ordered;
}

function renderCachedTree(target, categoryId) {

  var productCategories = getProductCategories(getProductMap()[categoryId]);

  url = "https://s3-us-west-2.amazonaws.com/shotgun-help-center/zd-menu-cache.json";
  $.getJSON(url, function(zdmc) {

    var promotedSections = "";
    for (var cId=0; cId<productCategories.length; cId++) {
      var tree = $('<a class="user-guide-nav-title user-guide-nav-expand">'+getCategoryMap()[productCategories[cId]]+'</a>');
      var articleListing = $('<div class="article-listing"></div>');

      //Object.keys(zdmc[productCategories[cId]]["sections"])
      sectionIds = sortedIds(zdmc[productCategories[cId]]["sections"]);
      //for (var sId=0; sId<Object.keys(sectionIds).length; sId++) {
      Object.keys(sectionIds).forEach(function(sId) {
        section = zdmc[productCategories[cId]]["sections"][sectionIds[sId]];
        if (!userCanSeeSection(section)) {
          return;
        }
        if (specialSectionTypes().indexOf(section.name) >= 0) {
          promotedSections += '<a class="user-guide-nav-title promoted-section" href="' + section.html_url + '">' + section.name + '</a>';
          return;
        }

        var title = $('<div class="nav-section-title nav-title">' + section.name + '</div>');
        var children = $('<ul class="nav-children"></ul>');

        articleIds = sortedIds(section["articles"]);
        Object.keys(articleIds).forEach(function(aId) {
          article = section["articles"][articleIds[aId]];
          article_html = $('<li><a class="nav-article" href="' + article.html_url + '">' + article.name + '</a></li>');
          children.append(article_html);
        });
        section_html = $("<div></div>").append([title, children]);
        articleListing.append(section_html);
      });
      tree = tree.add(articleListing);
      $(target).append($("<div></div>").append(tree));
    }
    $(target).append($(promotedSections));
    initializeExpandCollapse(target);
  });
}
