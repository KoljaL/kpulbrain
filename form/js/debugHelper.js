//
// debug console output with color
//
// deb(document, 'ProfilLink:', 'red');
function deb(value, text = " ", c = 'white') {
    console.log("%c" + text, "color:" + c)
    console.log(value)
}


//
// reat url and return the anchor
//
function getAnchor() {
    var currentUrl = document.URL,
        urlParts = currentUrl.split('#');
    return (urlParts.length > 1) ? urlParts[1] : null;
}


//
// delete element on doubleClick
//
window.ondblclick = function(event) {
    event.preventDefault
    event.target.remove()
}

//
// show element size
//
function showSize(el = 'x') {
    if (el == 'x') {
        let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        console.log(width, height);
        return width + " : " + height;

    } else {
        let width = el.innerWidth;
        let height = el.innerHeight;
        console.log(width, height);
        return width + " : " + height;

    }
}