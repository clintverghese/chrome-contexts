import { createTabs } from "./tab-creator.js";

let saveContext = document.getElementById('save-context');

saveContext.onclick = function(element) {
    let contextName = document.getElementById('context-name').value;
    chrome.tabs.query({currentWindow: true}, function (tabs){
        console.log(tabs);
        var strippedTabs = tabs.map(function(t){
            return {url: t.url};
        });
        console.log(strippedTabs);
        chrome.storage.sync.set({[contextName]: strippedTabs}, function() {
            console.log('saved context  ' + [contextName]);
            updateSavedContexts();
        });
    });
};

// // function loadContext(contextName, newWindow)
// // {
// //     console.log("creating Tab");
// //     // // createTabs(strippedTabs);
// //     // // for(var i=0;i<tabs.length;i++) {
// //     // //     console.log(tabs[i].url);
// //     // // }
// // }

function loadContext(element, event)
{
    console.log("entered click of button ");
    console.log(element);
    console.log(event);
    var value = element.value;
    console.log(element.innerHTML);
}

function updateSavedContexts()
{
    getSavedContextsFromSync(function(savedContexts) {
        var ul = document.getElementById("dynamic-list");
        ul.innerHTML = "";
        for(var i=0; i<savedContexts.length; i++) {
            var li = document.createElement("li");
            li.setAttribute('id',savedContexts[i]);
            li.appendChild(document.createTextNode(savedContexts[i]));
            li.addEventListener("click", loadContext);
            ul.appendChild(li);
        }
    });
}

function getSavedContextsFromSync(callback)
{
    var contexts;
    chrome.storage.sync.get(function(value) {
        contexts = Object.keys(value);
        console.log("Contexts in sync " + contexts.length);
        callback(contexts);
    });
}