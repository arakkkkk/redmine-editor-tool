chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateOutline") {
    document.getElementById("outline").textContent = request.outline;
  }
});

function updateOutline() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { msg: "getOutline" },
        function (outline) {
          console.log("ok");
        },
      );
    }
  });
}

// 初期化時にタイトルを更新
updateOutline();
