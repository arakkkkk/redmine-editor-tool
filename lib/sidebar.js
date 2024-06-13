const createSidebar = () => {
  const $sidebar = document.querySelector(".textileSidebar");
  if ($sidebar) {
    $sidebar.remove();
  }

  $div = document.createElement("div");
  $div.classList.add("textileSidebar");
  $div.style.width = "200px";
  $div.style.height = "100%";
  $div.background = "white";
  $editor.parentElement.prepend($div);
  $editor.parentElement.style.display = "flex";
};
createSidebar();
