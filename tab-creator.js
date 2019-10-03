export function createTabs(tabs)
{
    console.log("createTabs started");
    console.log(tabs);
    for(var i=0;i<tabs.length;i++) {
        console.log(tabs[i].url);
            chrome.tabs.create({url: tabs[i].url}, function(){

        });
    }
    console.log("createTabs ended");
}