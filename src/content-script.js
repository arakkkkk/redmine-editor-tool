const EDITOR_SELECTOR = "#issue_description";
const $editor = document.querySelector(EDITOR_SELECTOR);

const expandEditor = () => {
  if ($editor === null) {
    return;
  }
  $editor.style.width = "100%";
  $editor.style.height = "90vh";

  const elementPosition =
    $editor.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - window.innerHeight * 0.05;
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};

const openEditor = () => {
  document.getElementById("update").style.display = "";
  document.getElementById("issue_description_and_toolbar").style.display = "";
};

function jumpTo(line_length, line_x_count, line_y_height) {
  $editor.setSelectionRange(line_x_count, line_x_count + line_length);
  $editor.focus();

  // 検索文字列の位置にスクロール
  const lineHeight = parseFloat(window.getComputedStyle($editor).lineHeight);
  const scrollTop = (line_y_height + 3) * lineHeight - $editor.clientHeight / 2;
  $editor.scrollTop = scrollTop;
}

chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
  switch (req.msg) {
    case "getOutline":
      let res = "This extension only works while editing the redmine wiki.";
      let is_editing =
        document.getElementById("update").style.display != "none";
      if (is_editing) {
        const parent = { id: 0, childs: [] };
        res = [parent];
        parseTextile(text2obj($editor.value), 1, 0, res);
      }
      sendResponse(res);
      break;

    case "jumpTo":
      jumpTo(req.line.text.length, req.line.line_count, req.line.id);
      break;

    case "startEdit":
      openEditor();
      window.setTimeout(function () {
        expandEditor();
      }, 300);
      break;
  }
});