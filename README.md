# chrome-contexts
A simple chrome extension that allows you save multiple tab groups, essentially allowing you to organize tab groups. 



progress:
how to get urls from a key --> 

chrome.storage.sync.get('abc', function(value) {
console.log(value);
for(var i=0;i<value['abc'].length;i++) {
        console.log(value['abc'][i].url);
    }
});
