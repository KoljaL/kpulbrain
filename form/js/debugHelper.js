//
// debug console output with color
//
// deb(document, 'ProfilLink:', 'red');
function deb(value, text = " ", c = '#0081AB') {
    console.log("%c " + text + " ᐁᐁᐁ", "color:" + c)
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


/**
 * get date format
 * @param {string} date
 * @param {string} format
 * @returns
 */
function formatdate(date, format = "Y-m-d", locale = "DE") {
    const groupFormats = {
            minute: "Y-m-d H:s",
            hour: "Y-m-d H:00",
            day: "Y-m-d 00:00",
            month: "Y-m-01 00:00",
            year: "Y-12-31 00:00"
        }
        // const localeNames = {
        //     days_short: ['So','Mo','Di','Mi','Do','Fr','Sa'],
        //     days_long: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Frreitag','Samstag'],
        //     month_short: ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'],
        //     month_long: ['Januar','Februar','März','April','Mai','Juni','Juli','August','Sepember','Oktober','November','Dezember']
        // }
        // const locale = "DE";
    const localeNames = {
        days_short: [...Array(7).keys()].map((day) =>
            new Intl.DateTimeFormat(locale, { weekday: "short" }).format(new Date(Date.UTC(2021, 5, day)))
        ),
        days_long: [...Array(7).keys()].map((day) =>
            new Intl.DateTimeFormat(locale, { weekday: "long" }).format(new Date(Date.UTC(2021, 5, day)))
        ),
        month_short: [...Array(12).keys()].map((month) =>
            new Intl.DateTimeFormat(locale, { month: "short" }).format(new Date(Date.UTC(2021, month, 1)))
        ),
        month_long: [...Array(12).keys()].map((month) =>
            new Intl.DateTimeFormat(locale, { month: "long" }).format(new Date(Date.UTC(2021, month, 1)))
        )

    }

    format = groupFormats[format] || format || "Y-m-d"
    date = new Date(date)
    const hour24 = date.getHours()
    const hour12 = date.getHours() % 12 || 12
    const numDay = date.getDay()
    const numMonth = date.getMonth()
    const parts = {
        Y: date.getFullYear().toString(),
        y: ("00" + (date.getYear() - 100)).toString().slice(-2),
        m: ("0" + (numMonth + 1)).toString().slice(-2),
        n: (numMonth + 1).toString(),
        d: ("0" + date.getDate()).toString().slice(-2),
        j: date.getDate().toString(),
        H: ("0" + hour24).toString().slice(-2),
        h: ("0" + hour12).toString().slice(-2),
        G: hour24.toString(),
        g: hour12.toString(),
        a: hour24 >= 12 && hour24 < 24 ? "pm" : "am",
        A: hour24 >= 12 && hour24 < 24 ? "PM" : "AM",
        i: ("0" + date.getMinutes()).toString().slice(-2),
        s: ("0" + date.getSeconds()).toString().slice(-2),
        w: numDay,
        N: numDay > 0 ? numDay : 7,
        D: localeNames.days_short[numDay],
        l: localeNames.days_long[numDay],
        M: localeNames.month_short[numMonth],
        F: localeNames.month_long[numMonth]
    }
    const modifiers = Object.keys(parts).join("")
    const reDate = new RegExp("[" + modifiers + "]", "g")
    const dt = format.replace(reDate, ($0) => parts[$0])
    return dt
}