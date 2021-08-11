/*
 * cached-webpgr-v2.js - simple localStorage based caching of JavaScript and CSS files
 * https://github.com/WarManiac/cached-webpgr-v2/blob/main/cached-webpgr-v2.js
 * Author: WarManiac
 * License: MIT
 */

// var requireScript = new Array()
var requireScript = new Array()
    // requireScript.push({
    //     name: 'reseter',
    //     version: 'reseter',
    //     type: 'css',
    //     url: 'https://dev.rasal.de/kpulbrain/css/reseter.css'
    // })
    // requireScript.push({
    //     name: 'icono',
    //     version: 'icono',
    //     type: 'css',
    //     url: 'https://dev.rasal.de/kpulbrain/css/icono.css'
    // })
    // requireScript.push({
    //     name: 'style',
    //     version: 'style',
    //     type: 'css',
    //     url: 'https://dev.rasal.de/kpulbrain/css/style.css'
    // })
requireScript.push({
    name: 'formtoobj',
    version: 'formtoobj',
    type: 'js',
    url: 'https://dev.rasal.de/kpulbrain/js/formtoobj.js'
})
requireScript.push({
    name: 'md5',
    version: 'md5',
    type: 'js',
    url: 'https://dev.rasal.de/kpulbrain/js/md5.js'
})
requireScript.push({
    name: 'debugHelper',
    version: 'debugHelper',
    type: 'js',
    url: 'https://dev.rasal.de/kpulbrain/js/debugHelper.js'
})
requireScript.push({
    name: 'longpress',
    version: 'longpress',
    type: 'js',
    url: 'https://dev.rasal.de/kpulbrain/js/longpress.js'
})
requireScript.push({
    name: 'chartJS',
    version: 'chartJS',
    type: 'js',
    url: 'https://dev.rasal.de/kpulbrain/js/chartJS.js'
})
requireScript.push({
    name: 'luxon',
    version: 'luxon',
    type: 'js',
    url: 'https://dev.rasal.de/kpulbrain/js/luxon.js'
})
requireScript.push({
    name: 'chartjs-zoom',
    version: 'chartjs-zoom',
    type: 'js',
    url: 'https://dev.rasal.de/kpulbrain/js/chartjs-zoom.js'
})
requireScript.push({
        name: 'hammer',
        version: 'hammer',
        type: 'js',
        url: 'https://dev.rasal.de/kpulbrain/js/hammer.js'
    })
    //add push

function build() {
    for (var pos in requireScript) {
        var tmp = JSON.parse(localStorage.getItem(requireScript[pos].name))
        var s = null
        if (tmp.type == 'js') {
            s = document.createElement('script');
            s.type = "text/javascript";
        } else if (tmp.type == 'css') {
            s = document.createElement('style');
            s.type = "text/css";
        } else {
            return
        }
        var scriptContent = document.createTextNode(tmp.content);
        s.appendChild(scriptContent);
        document.getElementsByTagName("head")[0].appendChild(s);
        if (requireScript[pos].name == 'jQuery') {
            $(document).on("mobileinit", function() {
                $.mobile.loader.prototype.options.disabled = true;
            });
        }
    }
}

function check() {
    var DL = false
    for (var pos in requireScript) {
        var tmp = localStorage.getItem(requireScript[pos].name)
        if (tmp == null) {
            localStorage.setItem(requireScript[pos].name, JSON.stringify({
                content: null,
                version: requireScript[pos].version,
                type: requireScript[pos].type,
                url: requireScript[pos].url
            }));
            tmp = JSON.parse(localStorage.getItem(requireScript[pos].name))
        } else {
            tmp = JSON.parse(tmp)
            if (tmp.version != requireScript[pos].version) {
                tmp.content = null
                tmp.version = requireScript[pos].version
                tmp.type = requireScript[pos].type
                tmp.url = requireScript[pos].url
                localStorage.setItem(requireScript[pos].name, JSON.stringify(tmp))
            }
            if (tmp.content === false) {
                tmp.content = null
                localStorage.setItem(requireScript[pos].name, JSON.stringify(tmp))
            }
        }
        if (tmp.content === null) {
            DL = true
            download(requireScript[pos].name, tmp)
            tmp.content = false
            localStorage.setItem(requireScript[pos].name, JSON.stringify(tmp))
        }
    }
    return DL
}

function download(name, arg) {
    var xmlhttp = new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                localStorage.setItem(name, JSON.stringify({
                    content: xmlhttp.responseText,
                    version: arg.version,
                    type: arg.type,
                    url: arg.url
                }));
            } else {
                console.error('error loading ' + arg.url);
            }
        }
    }
    xmlhttp.open("GET", arg.url, true);
    xmlhttp.send();
}

function runner() {
    console.info('runner')
    var ready = true
    for (var pos in requireScript) {
        var tmp = JSON.parse(localStorage.getItem(requireScript[pos].name))
        if (tmp.content == null || tmp.content === false) ready = false
    }
    if (ready) location.reload()
}
if (check()) {
    setInterval(runner, 250)
    throw new Error("--JS break--");
} else {
    build()
    window.onload = init;
}

function init() {
    //your code
}