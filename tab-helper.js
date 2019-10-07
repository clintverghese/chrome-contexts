export function createTabs(tabs)
{
    console.log("createTabs started");
    console.log(tabs.map(getUrl));
    chrome.windows.create({state: "maximized", url: tabs.map(getUrl)}, function(window){
        console.log(window.id);
    });

    console.log("createTabs ended");
}

export function getTabsFromCurrentWindow(callback)
{
    chrome.tabs.query({currentWindow: true}, function (tabs){
        console.log(tabs);
        var strippedTabs = tabs.map(getStrippedTab);
        callback(strippedTabs);
    });
}

function getUrl(tab)
{
    return tab.url;
}

// A stripped tab contains only url. All other properties of the Chrome.tabs.Tab is ignored. 
function getStrippedTab(tab)
{
    return {url: tab.url};
}