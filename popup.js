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
            console.log("looped at +" + savedContexts[i]);
            var li = document.createElement("li");
            li.setAttribute('id', savedContexts[i]);
            li.innerHTML = savedContexts[i];
            // li.appendChild(document.createTextNode(savedContexts[i] + '<span class="delete">x</span>'));
            li.addEventListener("click", syncHelper.loadContext);
            ul.appendChild(li);

            var del = document.createElement("span");
            del.setAttribute('class', "delete");
            del.innerHTML = 'x';
            const n = i;
            del.addEventListener("click", function(e) {
                console.log("entered +" + savedContexts[n]);
                console.log("index = " + n);
                e.stopPropagation();
                syncHelper.removeContextFromSync(savedContexts[n], function(){
                    updateSavedContexts();
                    updateStorageArea();
                    });
                });
            li.appendChild(del);
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