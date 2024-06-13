const createOutlineElem = (outlines, current_node = 0) => {
  let $ul = document.createElement("ul");
  for (let i = 0; i < outlines.length; i++) {
    let o = outlines[i];
    if (o.head == current_node) {
      let $li = document.createElement("li");
      $li.innerText = o.text;
      $li.setAttribute("outlineKey", o.id);
      $ul.appendChild($li);
      $childs = createOutlineElem(outlines.slice(i + 1), o.id);
      $ul.appendChild($childs);
    }
  }
  return $ul;
};

const showOutline = () => {
  chrome.tabs.query({ currentWindow: true, active: true }).then(function ([
    tab,
  ]) {
    chrome.tabs.sendMessage(tab.id, { msg: "getOutline" }, function (outline) {
      var $elOutline = document.getElementById("outline");
      if (typeof outline == "string") {
        $elOutline.innerText = outline;
      } else {
        const $outline = createOutlineElem(outline);
        $elOutline.innerText = "";
        $elOutline.appendChild($outline);
      }
      var links = $elOutline.getElementsByTagName("li");
      for (var i = 0; i < links.length; i++) {
        let o;
        for (let oo of outline) {
          if (oo.id == links[i].getAttribute("outlineKey")) {
            o = oo;
            break;
          }
        }
        links[i].onclick = function (e) {
          chrome.tabs.sendMessage(tab.id, { msg: "jumpTo", line: o });
        };
      }
    });
  });
};
showOutline();

document.getElementById("btn_switch_editor_mode").onclick = function () {
  chrome.tabs.query({ currentWindow: true, active: true }).then(function ([
    tab,
  ]) {
    chrome.tabs.sendMessage(tab.id, { msg: "startEdit" }, function () {});
  });
  showOutline();
};
