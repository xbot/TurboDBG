chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
    // showAction
    if (1 == request.showAction) {
        chrome.pageAction.show(sender.tab.id);
        SetPageActionInfo(sender.tab.id, request.profilerOn);
        chrome.pageAction.onClicked.removeListener(OnPageActionClickedCB);
        chrome.pageAction.onClicked.addListener(OnPageActionClickedCB);
        // Initiate default settings if this is the first time the plugin is activated
        if ('undefined' == typeof(localStorage.cookie_sql_query_threshhold)) {localStorage.cookie_sql_query_threshhold = 1000;}
        if ('undefined' == typeof(localStorage.cookie_sql_exec_threshhold)) {localStorage.cookie_sql_exec_threshhold = 1000;}
        if ('undefined' == typeof(localStorage.cookie_sql_callstack_on)) {localStorage.cookie_sql_callstack_on = 1;}
        if ('undefined' == typeof(localStorage.cookie_flow_control_threshhold)) {localStorage.cookie_flow_control_threshhold = 1000;}
        if ('undefined' == typeof(localStorage.cookie_flow_node_threshhold)) {localStorage.cookie_flow_node_threshhold = 1000;}
        if ('undefined' == typeof(localStorage.cookie_flow_callstack_on)) {localStorage.cookie_flow_callstack_on = 1;}
        if ('undefined' == typeof(localStorage.cookie_php_request_on)) {localStorage.cookie_php_request_on = 0;}
        sendResponse({});
        return;
    }
    // getSettings
    if (1 == request.getSettings) {
        sendResponse({settings:localStorage});
        return;
    }
});

chrome.tabs.onActivated.addListener(function(activeInfo){
    chrome.pageAction.getTitle({tabId:activeInfo.tabId}, function(title){
        if (title.indexOf('is on.') > 0) {
            chrome.tabs.query({currentWindow:true, active:true}, function(tabs){
                if (tabs.length == 1) {
                    chrome.tabs.sendMessage(tabs[0].id,{updateCookies:1, settings:localStorage},function(response){
                        console.log(response.msg);
                    });
                } else {
                    console.error('Cannot get the current tab.');
                }
            });
        }
    });
});

function OnPageActionClickedCB(tab){
    // Toggle pageAction icon and title according to whether the profiler is on
    chrome.tabs.query({currentWindow:true, active:true}, function(tabs){
        if (tabs.length == 1) {
            chrome.tabs.sendMessage(tabs[0].id,{toggleProfiler:1},function(response){
                SetPageActionInfo(tabs[0].id, response.profilerOn);
                console.log(response.msg);
            });
        } else {
            console.error('Cannot get the current tab.');
        }
    });
};

function SetPageActionInfo(tabId, profilerOn) {
    // Toggle icons
    var icons = ["img/bug_off_24px.png", "img/bug_on_24px.png"];
    chrome.pageAction.setIcon({
        path : icons[profilerOn],
        tabId : tabId
    });
    // Toggle title
    var titles = ["TurboCRM Profiler is off.", "TurboCRM Profiler is on."];
    chrome.pageAction.setTitle({
        title : titles[profilerOn],
        tabId : tabId
    });
}
