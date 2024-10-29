// Paste into safari console to simulate time travel

// check itp status for domain
webkit.messageHandlers.ITPDebug.postMessage("status");

// simulate 7 days
webkit.messageHandlers.ITPDebug.postMessage("setTime:+7");

// simulate 24 hrs
webkit.messageHandlers.ITPDebug.postMessage("setTime:+1");