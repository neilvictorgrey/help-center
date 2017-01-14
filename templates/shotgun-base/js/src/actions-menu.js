// Customize user menu with links to settings / preferences
function enableActionsMenu() {

  if (HelpCenter.user.role=="anonymous") {
    // Display a separate menu if the user isn't logged in
    $('<div id="user" class="user-info dropdown"><div class="btn dropdown-toggle actions-menu" role="button"><span id="user-name">Actions</span></div></div>').prependTo(".user-nav-table");
    $('<div id="user-dropdown" class="dropdown-menu dropdown-menu-end dropdown-menu-caret" aria-expanded="false"><div id="user-menu"></div></div>').appendTo(".user-nav-table");
    
    var newRequestLink = $(getNewRequestLink());
    newRequestLink.appendTo('#user-menu');
    newRequestLink.attr("role","menuitem");
    
    $(".login").appendTo('#user-menu');
    $(".login").attr("role","menuitem");
    
    $("#user-name").css("padding-right", "5px");
    $(".user-info").css("height", "26px");
    $(".user-info").css("padding", "4px 4px 6px 6px");
    $(".user-info").click(function() {
        var userDropdown = $("#user-dropdown");
      if (userDropdown.attr("aria-expanded") === "true") {
        userDropdown.attr("aria-expanded","false");
      } else {
        userDropdown.attr("aria-expanded","true");
      }
    });
  } else {
    // Contributions Menu Item
    var contributionsLink = $(getContributionsLink());
    contributionsLink.prependTo("#user-menu");
    contributionsLink.attr("role","menuitem");
    contributionsLink.attr("id","my-contribution-settings");
    contributionsLink.text("My Contributions");
    
    // Follow Settings Menu Item
    var followingLink = $(getFollowingLink());
    followingLink.prependTo("#user-menu");
    followingLink.attr("role","menuitem");
    followingLink.attr("id","my-follow-settings");
    followingLink.text("My Follow Settings");
    
    var myRequestsLink = $(".my-activities");
    myRequestsLink.prependTo("#user-menu");
    
    // New Support Request Menu Item
    var newRequestLink = $(getNewRequestLink());
    newRequestLink.prependTo("#user-menu");
    newRequestLink.attr("role","menuitem");
    newRequestLink.attr("id","submit-a-request");
  }

  // Use custom user nav menu item text
  $(".submit-a-request").text("Submit A Request");
  $(".login").text("Sign In");
  $(".my-activities").text("My Requests");
  
  // Rename "Follow" to "Subscribe To Updates"
  $(".post-subscribe").text("Follow Updates");
  $(".article-subscribe").text("Follow Updates");
  
  if (["request-list","request"].indexOf(getPageType()) >= 0) {
    if ($(".activities-request-new-btn").text().trim() === "") {
      $('.activities-request-new').hide();
    } else {
      $('.activities-request-new-btn').text("Submit A New Request");
    }
    if (HelpCenter.user.organizations.length > 0) {
      $('<li><a href="/hc/en-us/requests/organization">Organization Requests</a></li>').appendTo('.activities-request-groups');
    }
  }
  
}
