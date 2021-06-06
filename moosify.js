var moosify_count = 0;
var numImages = 7;
var moosify_add = function() {
    moosify_count += 1;
    var div = document.createElement('div');
    div.style.position = 'fixed';

    var numType = 'px';
    var heightRandom = Math.random() * .75;
    var windowHeight = 768;
    var windowWidth = 1024;
    var height = 0;
    var width = 0;
    var de = document.documentElement;
    if (typeof(window.innerHeight) == 'number') {
        windowHeight = window.innerHeight;
        windowWidth = window.innerWidth;
    } else if (de && de.clientHeight) {
        windowHeight = de.clientHeight;
        windowWidth = de.clientWidth;
    } else {
        numType = '%';
        height = Math.round(height * 100) + '%';
    }

    div.onclick = moosify_add;
    div.style.zIndex = 10;
    div.style.outline = 0;

    if (moosify_count == 15) {
        div.style.top = Math.max(0, Math.round((windowHeight - 530) / 2)) + 'px';
        div.style.left = Math.round((windowWidth - 530) / 2) + 'px';
        div.style.zIndex = 1000;
    } else {
        if (numType == 'px') div.style.top = Math.round(windowHeight * heightRandom) + numType;
        else div.style.top = height;
        div.style.left = Math.round(Math.random() * 90) + '%';
    }

    var img = document.createElement('img');
    var currentTime = new Date();
    var submitTime = currentTime.getTime();
    var random = submitTime % numImages;
    img.setAttribute('src', 'moose-' + random.toString(10) + ".png");
    var ease = "all .1s linear";
    div.style.WebkitTransition = ease;
    div.style.WebkitTransform = "rotate(1deg) scale(1.01,1.01)";
    div.style.transition = "all .1s linear";
    div.onmouseover = function() {
        var size = 1 + Math.round(Math.random() * 10) / 100;
        var angle = Math.round(Math.random() * 20 - 10);
        var result = "rotate(" + angle + "deg) scale(" + size + "," + size + ")";
        this.style.transform = result;
        this.style.WebkitTransform = result;
    };
    div.onmouseout = function() {
        var size = .9 + Math.round(Math.random() * 10) / 100;
        var angle = Math.round(Math.random() * 6 - 3);
        var result = "rotate(" + angle + "deg) scale(" + size + "," + size + ")";
        this.style.transform = result;
        this.style.WebkitTransform = result;
    };
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(div);
    div.appendChild(img);

    // Add stylesheet.
    if (moosify_count == 5) {
        var cssExisting = document.getElementById('__moosify_css');
        if (!cssExisting) {
            var head = document.getElementsByTagName("head")[0];
            var css = document.createElement('link');
            css.id = '__moosify_css';
            css.type = 'text/css';
            css.rel = 'stylesheet';
            css.href = 'moosify.css';
            css.media = 'screen';
            head.appendChild(css);
        }
        moosify_replace();
    }

    moosify_updatecount();
};

var moosify_updatecount = function() {
    var p = document.getElementById('moosifycount');
    if (p == null) {
        var p = document.createElement('p');
        p.id = 'moosifycount';
        p.style.position = 'fixed';
        p.style.bottom = '5px';
        p.style.left = '0px';
        p.style.right = '0px';
        p.style.zIndex = '1000000000';
        p.style.color = '#D2691E';
        p.style.textShadow = "-1px -1px 0px #000,1px -1px 0px #000,-1px 1px 0px #000,1px 1px 0px #000";
        p.style.textAlign = 'center';
        p.style.fontSize = '24px';
        p.style.fontFamily = '"Helvetica Neue", Helvetica, Arial, sans-serif';
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(p);
    }

    p.innerHTML = moosify_count + ' MOOSE CREATED';
    if (Math.random() >= 0.5) p.innerHTML = moosify_count + ' MEESE CREATED';
    moosify_setcookie('moosify', moosify_count + '', 1000);
};

var moosify_setcookie = function(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = name + "=" + value + "; " + expires;
};

var moosify_getcookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

moosify_count = parseInt(moosify_getcookie('moosify'));
if (isNaN(moosify_count)) {
    moosify_count = 0;
}

var moosify_replace = function() {
    // Replace text.
    var hc = 6;
    var hs;
    var h;
    var k;
    var words = ['Majestic', 'Fierce', 'Silly', 'Goofy', 'Large', 'Charming', 'Cute', 'Fantastic', 'Amazing', 'Wonderful'];
    while (hc >= 1) {
        hs = document.getElementsByTagName('h' + hc);
        for (k = 0; k < hs.length; k++) {
            h = hs[k];
            h.innerHTML = words[Math.floor(Math.random() * words.length)] + ' ' + h.innerHTML;
        }
        hc -= 1;
    }
};

/*
 * Adapted from http://www.snaptortoise.com/konami-js/
 */
var moosenami = {
    input: "",
    // moose
    pattern: "7779798369",
    clear: setTimeout('moosenami.clear_input()', 5000),
    load: function() {
        window.document.onkeydown = function(e) {
            if (moosenami.input == moosenami.pattern) {
                moosify_add();
                clearTimeout(moosenami.clear);
                return;
            } else {
                moosenami.input += e ? e.keyCode : event.keyCode;
                if (moosenami.input == moosenami.pattern) moosify_add();
                clearTimeout(moosenami.clear);
                moosenami.clear = setTimeout("moosenami.clear_input()", 5000);
            }
        };
    },
    clear_input: function() {
        moosenami.input = "";
        clearTimeout(moosenami.clear);
    }
};
moosenami.load();