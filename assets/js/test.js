function w3_inject(url) {
    var n = document.createElement("script");
    n.type = "text/javascript";
    n.src = url;
    n.async = true;
    var r = document.getElementsByTagName("script")[0];
    r.parentNode.insertBefore(n, r);
}

function w3counter(id) {

    if (typeof window._w3counter !== 'undefined') return;

    var info = '&userAgent=' + encodeURIComponent(navigator.userAgent);
    info += '&webpageName=' + encodeURIComponent(document.title);
    info += '&ref=' + encodeURIComponent(document.referrer);
    info += '&url=' + encodeURIComponent(window.location);
    info += '&width=' + screen.width;
    info += '&height=' + screen.height;
    info += '&rand=' + Math.round(1000*Math.random());

    w3_inject('https://www.w3counter.com/track/pv?id=' + id + info);


    window._w3counter = true;

}


function w3counter_conversion(options) {

    var info = '&rand=' + Math.round(1000*Math.random());
    if (typeof options === 'object') {
        if (typeof options.goal !== 'undefined')
            info += '&goal=' + encodeURIComponent(options.goal);
        if (typeof options.revenue !== 'undefined')
            info += '&revenue=' + encodeURIComponent(options.revenue);
        if (typeof options.reference !== 'undefined')
            info += '&reference=' + encodeURIComponent(options.reference);
    }
    info += '&userAgent=' + encodeURIComponent(navigator.userAgent);
    info += '&url=' + encodeURIComponent(window.location);

    var url = 'https://www.w3counter.com/track/gc?id=108244' + info;
    w3_inject(url);

}

if (typeof window._w3counter === 'undefined')
    w3counter(108244);
