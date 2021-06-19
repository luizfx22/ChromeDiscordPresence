chrome.tabs.onActivated.addListener(activeInfo => sendChangedTab(activeInfo));
chrome.tabs.onUpdated.addListener(activeInfo => sendChangedTab(activeInfo));
// chrome.tabs.onReplaced.addListener(activeInfo => sendChangedTab(activeInfo));

let ws = new WebSocket("ws://localhost:9900");

ws.onopen = (ev) => {
  console.log("Connected!", ev);
}

function request(body) {
  ws.send(JSON.stringify(body));
}

let last = "";
let has = null;

async function sendChangedTab(activeInfo) {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);

	if (last !== tab.title) {
    has = request({
      name: tab.title,
      url: tab.url
    });
    last = tab.title;
  }
}