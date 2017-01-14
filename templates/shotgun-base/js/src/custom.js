// Reformat snowflake toolkit table of contents
function formatToolkitTableOfContents() {
  $("h4:contains('Table of Contents:')").parent().children('p').css("margin","0");
}
