import * as tabHelper from "./tab-helper.js";

export function getPercentageOfSyncStorageUsed(callback)
{
    chrome.storage.sync.getBytesInUse(null, function(value){
        console.log((value*100/chrome.storage.sync.QUOTA_BYTES).toFixed(2));
        callback((value*100/chrome.storage.sync.QUOTA_BYTES).toFixed(2));
    })
}

export function getSavedContextsFromSync(callback)
{
    var contexts;
    chrome.storage.sync.get(function(value) {
        contexts = Object.keys(value);
        console.log("Contexts in sync " + contexts.length);
        // console.log(contexts[1].url);
        callback(contexts);
    });
}

export function updateContextToSync(contextName, strippedTabs, callback)
{
    console.log("entered sync-helper.updateContextToSync");
    console.log(contextName);
    console.log(strippedTabs);
    chrome.storage.sync.set({[contextName]: strippedTabs}, function() {
        console.log('saved context  ' + [contextName]);
        callback();
    });
}

export function loadContext(event)
{
    console.log("entered click of button ");
    console.log(event.target);
    console.log(event.target.id);
    
    chrome.storage.sync.get(event.target.id, function(value) {
        console.log("entered loadContext callback");
        console.log(value);
        tabHelper.createTabs(value[event.target.id]);
    });
}