import * as syncHelper from "./sync-helper.js";
import * as tabHelper from "./tab-helper.js";

let saveContext = document.getElementById('save-context');
updateSavedContexts();
updateStorageArea();

saveContext.onclick = function(element) {
    let contextName = document.getElementById('context-name').value;

    tabHelper.getTabsFromCurrentWindow(function(strippedTabs){
        console.log("getTabsFromCurrentWindow callback");
        console.log(strippedTabs);
        syncHelper.updateContextToSync(contextName, strippedTabs, function(){
            updateSavedContexts();
            updateStorageArea();
        });
    })

    // chrome.tabs.query({currentWindow: true}, function (tabs){
    //     console.log(tabs);
    //     var strippedTabs = tabs.map(function(t){
    //         return {url: t.url};
    //     });

    //     chrome.storage.sync.set({[contextName]: strippedTabs}, function() {
    //         console.log('saved context  ' + [contextName]);
    //         updateSavedContexts();
    //     });
    // });
};

function updateSavedContexts()
{
    syncHelper.getSavedContextsFromSync(function(savedContexts) {
        var ul = document.getElementById("dynamic-list");
        ul.innerHTML = "";
        for(var i=0; i<savedContexts.length; i++) {
            var li = document.createElement("li");
            li.setAttribute('id',savedContexts[i]);
            li.appendChild(document.createTextNode(savedContexts[i]));
            li.addEventListener("click", syncHelper.loadContext);
            ul.appendChild(li);
        }
    });
}

function updateStorageArea()
{
    var div = document.getElementById("storage-used");
    syncHelper.getPercentageOfSyncStorageUsed(function(value){
        div.innerText = value + "% of sync storage used";
    });
}