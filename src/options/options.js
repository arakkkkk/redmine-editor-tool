document.getElementById("saveButton").addEventListener("click", () => {
  const url = document.getElementById("urlInput").value;
  chrome.storage.sync.set({ redmineURL: url }, () => {
    console.log("URL is set to " + url);
    alert("URL is set to " + url);
  });
});

document.getElementById("deleteButton").addEventListener("click", () => {
  chrome.storage.sync.remove("redmineURL", () => {
    console.log("URL has been removed");
    document.getElementById("urlInput").value = "";
    alert("URL has been removed");
  });
});

// ページ読み込み時に保存されたURLを入力フィールドに表示
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get("redmineURL", (data) => {
    if (data.redmineURL) {
      document.getElementById("urlInput").value = data.redmineURL;
    }
  });
});
