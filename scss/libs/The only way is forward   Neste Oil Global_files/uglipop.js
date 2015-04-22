/*|--uglipop.js--|
|--(A Minimalistic Pure JavaScript Modal )--|
|--Author : argunner (gunnerar7@gmail.com)(http://github.com/argunner)--|
|--Contributers : Mikaela Oksanen --|*/

window.onload = function() {

    var overlay = document.createElement('div');
    var content_fixed = document.createElement('div');
    var popbox = document.createElement('div');
    var overlay_wrapper = document.createElement('div');
    //add close wrapper and content
    var overlay_close = document.createElement('h1');
    var close_content = document.createTextNode('X');
    content_fixed.id = 'uglipop_content_fixed';
    content_fixed.setAttribute('style', 'position:fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);opacity:1;z-index:9999; max-width: 100%');
    popbox.id = 'uglipop_popbox';
    overlay_wrapper.id = "uglipop_overlay_wrapper";
    overlay_wrapper.setAttribute('style', 'position:absolute;top:0;bottom:0;left:0;right:0;');
    //close button styling
    overlay_close.setAttribute('style', 'float: right; display: inline-block; padding: 20px; cursor: pointer;');
    overlay.id = "uglipop_overlay";
    overlay.setAttribute('style', 'position:fixed;top:0;bottom:0;left:0;right:0;opacity:1;width:100%;height:100%;background-color:white;z-index:999;');
    overlay_wrapper.appendChild(overlay);
    content_fixed.appendChild(popbox);
    //add content to close button and close button to the site
    overlay_close.appendChild(close_content);
    overlay.appendChild(overlay_close);
    document.body.appendChild(overlay_wrapper);
    document.body.appendChild(content_fixed);
    document.getElementById('uglipop_overlay_wrapper').style.display = 'none';
    document.getElementById('uglipop_overlay').style.display = 'none';
    document.getElementById('uglipop_content_fixed').style.display = 'none';
    //modify remove class so that it listens to the close wrapper instead overlay_wrapper
    overlay_close.addEventListener('click', remove);
    window.addEventListener('keypress', function(e) {
        //kill pop if button is ESC ;)
        if (e.keyCode == 27) {
            remove();
        }
    });
}



function uglipop(config) {

    if (config) {
        if (typeof config.class == 'string' && config.class) {
            document.getElementById('uglipop_popbox').setAttribute('class', config.class);
        }
        if (config.keepLayout && (!config.class)) {
            document.getElementById('uglipop_popbox').setAttribute('style', 'position:relative;height:300px;width:300px;background-color:white;opacity:1;');
        }

        if (typeof config.content == 'string' && config.content && config.source == 'html') {
            document.getElementById('uglipop_popbox').innerHTML = config.content;
        }

        if (typeof config.content == 'string' && config.content && config.source == 'div') {
            
            document.getElementById('uglipop_popbox').innerHTML = document.getElementById(config.content).innerHTML;

        }



        
    }

    document.getElementById('uglipop_overlay_wrapper').style.display = '';
    document.getElementById('uglipop_overlay').style.display = '';
    document.getElementById('uglipop_content_fixed').style.display = '';

    //hide scroll
    //document.getElementsByTagName('html').className = 'hideScroll';   ** not working **
    //written with jQuery because JS didn't work
    jQuery('html').addClass('hideScroll');

}

//overlay_wrapper.click(function(){

function remove() {
    document.getElementById('uglipop_overlay_wrapper').style.display = 'none';
    document.getElementById('uglipop_overlay').style.display = 'none';
    document.getElementById('uglipop_content_fixed').style.display = 'none';
    //allow scroll again
    //written with jQuery because JS didn't work
    //document.getElementsByTagName('html').className = '';
    jQuery('html').removeClass('hideScroll');
}