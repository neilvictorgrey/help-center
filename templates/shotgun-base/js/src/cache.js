function invalidateIndexes() {
  window.localStorage.setItem("articleIndex", JSON.stringify({}));
  window.localStorage.setItem("sectionIndex", JSON.stringify({}));
  window.sessionStorage.setItem("categoryIndex", JSON.stringify({}));
}
