//
// debug console output with color
//
// deb(document, 'ProfilLink:', 'red');
function deb(value, text = " ", c = '#e6c07b') {
    console.log("%c " + text + " ", `color:${c}; font-weight: normal; font-size:1.1em;`) //ᐁᐁᐁ
    console.log(value)
}

function getRandomInt(max, string = false) {
    if (string) {
        return (Math.floor(Math.random() * max)).toString(10);
    } else {
        return (Math.floor(Math.random() * max))
    }
}
// deb(getRandomInt(5), 'getRandomInt');


let MoodItems = 30;
let everyXhours = 2;


var TimestampNow = Date.now();
let Timestamp = []
for (let i = 0; i < MoodItems; i++) {
    let temTimestamp = TimestampNow - (i * 3600000 * everyXhours) + getRandomInt(60) * 60000;
    let hour = formatdate(temTimestamp, "G")
    if (hour >= 8 && hour <= 20) {
        Timestamp[i] = temTimestamp;
    } else {
        // Timestamp[i] = null;
    }

}
// deb(Timestamp,'Timestamp')

Timestamp = Timestamp.filter((item, index) => { return (Timestamp.indexOf(item) == index) });

// deb(Timestamp)

Mood = new Object;
for (let i = 0; i < Timestamp.length; i++) {
    Mood[[Timestamp[i]]] = {

        "Timestamp": Timestamp[i],
        "Datetime": formatdate(Timestamp[i]),
        "Medikation": [{
                "Medikament": "Elvanse Adult",
                "Dosierung": "30",
                "Zeitpunkt": "07:00",
                "SeitWann": "2021-06-01",
                "Kommentar": "und noch was"
            },
            {
                "Medikament": "Attentin",
                "Dosierung": "5",
                "Zeitpunkt": "07:00",
                "SeitWann": "2021-07-01"
            }
        ],
        "situations": [
            "zuhause",
            "kann nicht schlafen"
        ],
        "mood": {
            "Unruhe": getRandomInt(10, true) * 10,
            "Konzentration": getRandomInt(10, true) * 10,
            "Aufmerksamkeit": getRandomInt(10, true) * 10,
            "Brainload": getRandomInt(10, true) * 10,
        },
        "comment": "Was soll hier blo\u00df rein"

    }
}

let Profil = {
    "Freigeben": "on",
    "Timestamp": 1628116393212,
    "Datetime": "05.08.2021 00:33:13",
    "Alter": "1722",
    "Geschlecht": "divers",
    "Subtyp": "ADS",
    "Wirkung": [
        "Unruhe___red",
        "Konzentration___blue",
        "Aufmerksamkeit___green",
        "Motivation___salomon",
        "Brainload___orange"
    ],
    "P_Kommentar": "bin mal gespannt",
    "Situations": [
        "gerade aufgewacht",
        "bei der Arbeit",
        "zuhause",
        "kann nicht schlafen"
    ]
}

let initObj = { Profil, Mood }
    // deb(initObj,'initObj')