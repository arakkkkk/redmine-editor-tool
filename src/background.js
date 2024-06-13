// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.status === "complete") {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       if (tabs.length > 0) {
//         chrome.tabs.sendMessage(tabs[0].id, { action: "getOutline" });
//       }
//     });
//   }
// });
//
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "sendOutline") {
//     chrome.runtime.sendMessage({
//       action: "updateOutline",
//       outline: request.outline,
//     });
//   }
// });
