if (IsTurboCRM()) {
    // Show page action
    chrome.extension.sendMessage({showAction:1,profilerOn:(1 == $.cookie('cookie_profiler_on') ? 1:0)}, function(response){
        console.log('TurboCRM Profiler plugin activated !');
    });
    // Add listener for page action clicks
    chrome.extension.onMessage.addListener(function(request,sender,sendResponse){
        if (1 == request.toggleProfiler) {
            // Toggle profiler
            console.log('Start to toggle profiler.');
            $.cookie('cookie_profiler_on', 1 == $.cookie('cookie_profiler_on') ? 0:1);
            // Set settings into cookies
            var profilerOn = $.cookie('cookie_profiler_on');
            var msg = '';
            if (1 == profilerOn) {
                chrome.extension.sendMessage({getSettings:1}, function(response){
                    UpdateCookies(response.settings);
                });
                msg = 'TurboCRM Profiler is on now.';
            } else {
                msg = 'TurboCRM Profiler is off now.';
            }
            console.log(msg);
            sendResponse({profilerOn:profilerOn,msg:msg});
        } else if (1 == request.updateCookies) {
            UpdateCookies(request.settings);
            sendResponse({msg:'Cookies updated !'});
        }
    });
}

/*
 * Whether to turn the profiler on
 */
function IsTurboCRM() {
    return document.title.indexOf('TurboCRM') > 0 && $.cookie('PHPSESSID').length > 0;
}

/*
 * Set cookies
 */
function UpdateCookies(settings) {
    for ( var key in settings ) {
        if (key.indexOf('cookie') === 0) {
            $.cookie(key, settings[key]);
        }
    }
}
