/*global chrome*/
chrome.tabs.create({ url: chrome.runtime.getURL('page.html'), active: true });
