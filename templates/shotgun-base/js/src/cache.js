function invalidateIndexes() {
  window.localStorage.setItem("articleIndex", JSON.stringify({}));
  window.localStorage.setItem("sectionIndex", JSON.stringify({}));

  var idxName = getCategoryIndexName();
  window.sessionStorage.setItem(idxName, JSON.stringify({}));
}
