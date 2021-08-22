//
// populate the ProfilForm
//
const populateProfilForm = () => {
    let localData = JSON.parse(localStorage.getItem(localDataName)) || initObj;
    let localDataProfil = localData.Profil;
    // deb(localDataProfil, 'localDataProfil')
    // console.log(ProfilFormElements)
    for (const ProfilFormElement of ProfilFormElements) {
        if (['input', 'textarea'].indexOf(ProfilFormElement.type) && ProfilFormElement.name in localDataProfil) {
            ProfilFormElement.value = localDataProfil[ProfilFormElement.name];
        }
        if (('checkbox' == ProfilFormElement.type) &&
            (ProfilFormElement.name in localDataProfil) &&
            ('on' == localDataProfil[ProfilFormElement.name])) {
            ProfilFormElement.checked = 'checked';
        }
    }

    //
    // create wirkungsweisen from object
    //
    var wirkungenStd = {
        'Unruhe___red': {
            'active': false,
        },

        'Konzentration___blue': {
            'active': false,
        },

        'Aufmerksamkeit___green': {
            'active': false,
        },
        'Motivation___salomon': {
            'active': false,
        },
        'Auslastung___orange': {
            'active': false,
        },
    }

    // 
    // create label & checkboxes for "Wirkungen"
    if (localDataProfil) {
        // 
        // get wirkungen from localData and set active state to wirkungenStd 
        //
        var wirkungenLoc = localDataProfil.Wirkung;
        // deb(wirkungenLoc, 'wirkungenLoc')
        for (var wirkung in wirkungenLoc) {
            if (wirkungenStd.hasOwnProperty(wirkungenLoc[wirkung])) {
                wirkungenStd[wirkungenLoc[wirkung]].active = true;
            } else {
                let wirkungCust = wirkungenLoc[wirkung];
                // console.log(wirkungCust)
                wirkungenStd = Object.assign({
                    [wirkungCust]: {
                        'active': true,
                    }
                }, wirkungenStd);
            }
        }
    }
    // deb(wirkungenStd, 'wirkungenStd')

    var WirkungCheckboxes = '';
    for (var wirkung in wirkungenStd) {
        let checked = (wirkungenStd[wirkung].active ? 'checked' : '');

        let split = wirkung.split("___");
        // deb(split)
        let NameWirkung = split[0];
        let color = split[1];



        // WirkungCheckboxes += `<input type=checkbox class=hidden id=${NameWirkung} name=Wirkung[] value="${NameWirkung}___${color}" ${checked}>`;
        // WirkungCheckboxes += `<label class="buttonlabel wirkung ${color}" for=${NameWirkung}>${NameWirkung}</label>`;

        WirkungCheckboxes += `<div class=checkbox>`;
        WirkungCheckboxes += `<input type=checkbox class="" id=${NameWirkung} name=Wirkung[] value="${NameWirkung}___${color}" ${checked}>`;
        WirkungCheckboxes += `<label class=" ${color}" for=${NameWirkung}><span></span>${NameWirkung}</label>`;
        WirkungCheckboxes += `</div>`;


    }
    // WirkungCheckboxes += '<div id=WirkungIndividuell>';
    // WirkungCheckboxes += '<input type=text class=newSituation name=Wirkung[] placeholder="individuelle Wirkung">';
    // WirkungCheckboxes += '<select id=P_WirkungColor class=newSituation name=WirkungColor>';
    // WirkungCheckboxes += '<option disabled selected>Farbe</option><option>red</option><option>orange</option><option>yellow</option><option>green</option><option>bluegreen</option><option>blue</option><option>lachs</option><option>pink</option><option>grey</option>';
    // WirkungCheckboxes += '</select>';
    // WirkungCheckboxes += '</div>';

    document.getElementById('WirkungCheckboxes').innerHTML = WirkungCheckboxes;
}


//   <div class="zyklus"> 
//         <input type=checkbox class="" id=P_Zyklus name=Zyklus>
//         <label class="" for=P_Zyklus>
//             <span></span> 
//             Zyklus abfragen</label>
//     </div>



//
// populate the MoodForm
//
function populateMoodForm() {

    let localData = JSON.parse(localStorage.getItem(localDataName)) || initObj;
    let localDataProfil = localData.Profil;
    let localDataMood = localData.Mood;


    //
    // POPULATE MEDICATION FORM
    //

    // chech if the last entry has a medikation 
    // deb(Object.keys(localDataMood).length, 'localDataMood')
    if (Object.keys(localDataMood).length > 1) {
        var localDataMoodLastEntry = localDataMood[Object.keys(localDataMood).reduce((a, b) => localDataMood[a] > localDataMood[b] ? b : a)].Medikation;
    } else {
        var localDataMoodLastEntry = '';
    }
    // deb(localDataMoodLastEntry, 'localDataMoodLastEntry')
    // let MedikationItems = document.getElementById('Medikation_0').elements;
    // deb(localDataMood, 'localDataMood')
    if (localDataMoodLastEntry && localDataMood && Object.keys(localDataMood).length !== 0 && localDataMood.constructor === Object) {

        //
        // get the medikation of last entry 
        //
        // let localDataMoodLastEntry = localDataMood[Object.keys(localDataMood).reduce((a, b) => localDataMood[a] > localDataMood[b] ? b : a)].Medikation;
        // deb(localDataMoodLastEntry, 'localDataMoodLastEntry')
        let FormMedikationCount = document.querySelectorAll('[id^=Medikation_]').length;
        // deb(FormMedikationCount, 'FormMedikationCount')



        let LocalMedikationCount = Object.keys(localDataMoodLastEntry).length;
        // deb(LocalMedikationCount, 'LocalMedikationCount')
        // deb(FormMedikationCount, 'FormMedikationCount')
        let buildMedikations = LocalMedikationCount - FormMedikationCount - 1;
        // deb(buildMedikations, 'buildMedikations')

        // 
        // make a copy from "Medikation_0" for every medikation in localDataMoodLastEntry
        //
        var ct = 1;
        let new_medikationID = "";
        // for (const useless in localDataMoodLastEntry) {
        let n = 0;
        while (n <= buildMedikations) {
            new_medikationID = "Medikation_" + ct;
            newMedikation();
            // deb(new_medikationID)
            n++;
            if (n == 10) {
                break;
            }
        }
        // remove one element
        // document.getElementById(new_medikationID).remove()


        let MedikationItems = document.getElementById('MoodForm').elements;
        // deb(MedikationItems,'MedikationItems')
        let count = 0;
        for (const key in localDataMoodLastEntry) {
            // deb(localDataMoodLastEntry[key], 'localDataMoodLastEntry[key]')
            for (const MedikationItem of MedikationItems) {
                if (MedikationItem.name.slice(0, 12) === "Medikation[" + count) {
                    // deb(MedikationItem.name, 'MedikationItem.name');
                    // get the fieldname out of Medikation[0][fieldname]
                    var FormItemName = MedikationItem.name.match(/(?<=\[)[^\][]*(?=])/g)[1];
                    // deb(FormItemName)
                    if (['input', 'textarea'].indexOf(MedikationItem.type) && FormItemName in localDataMoodLastEntry[key]) {
                        // deb(localDataMoodLastEntry[key][FormItemName])
                        MedikationItem.value = localDataMoodLastEntry[key][FormItemName];
                    }
                    if (('checkbox' == MedikationItem.type) && (FormItemName in localDataMoodLastEntry[key]) && ('on' == localDataMoodLastEntry[key][FormItemName])) {
                        MedikationItem.checked = 'checked';
                    }
                }
            }
            count++;
        }

    }


    //
    // CREATE SITUATION CHECKBOXES
    //
    let SituationCheckboxes = '';
    if (localDataProfil && localDataProfil.Situations) {
        let ProfilSituations = localDataProfil.Situations;
        // deb(ProfilSituations, 'ProfilSituations')
        for (var i in ProfilSituations) {
            SituationCheckboxes += `<input type=checkbox class=hidden id="${ProfilSituations[i]}" name=situations[] value="${ProfilSituations[i]}">`;
            SituationCheckboxes += `<label class="buttonlabel situation" for="${ProfilSituations[i]}">${ProfilSituations[i]}</label>`;
        }
    }
    SituationCheckboxes += '<input type=text class=newSituation name=situations[]  placeholder="neue Situation">';
    document.getElementById('SituationCheckboxes').innerHTML = SituationCheckboxes;
    // call remove function to add eventlistener
    removeByLongpress("label.buttonlabel.situation");

    //
    // CREATE WIRKUNG SLIDER
    //
    // deb(localDataProfil.Wirkung)
    let WirkungRange = '';
    for (const key in localDataProfil.Wirkung) {
        let value = localDataProfil.Wirkung[key].split("___")
        let name = value[0];
        let color = value[1];
        WirkungRange += `<div class="rangediv ${color}">`;
        WirkungRange += `<label class="itemLabel ${name} rangeLabel" for="${name}Range">${name}: </label>`;
        WirkungRange += `<div class=rangeValue id="${name}RangeOutput">0</div>`;
        WirkungRange += `<input type="range" min="-5" max="5" value="0" step="1" oninput="updateRange(this)" class="range ${color}" id="${name}Range" name="mood[${name}]">`;
        WirkungRange += `</div>`;
    }
    document.getElementById('MoodRange').innerHTML = WirkungRange;
};



//
// get called by changing the range and updates the value in the output div
//
function updateRange(range) {
    let value = range.value
    let name = range.id
    document.getElementById(name + 'Output').innerHTML = value;
}



//
// get POST from forms
//
var forms = document.getElementsByTagName("FORM");
for (const form of forms) {
    form.addEventListener("submit", function(evt) {
        let localData = JSON.parse(localStorage.getItem(localDataName)) || initObj;
        evt.preventDefault();
        // get local and form data
        let FormResultsObject = formToObject(document.getElementById(form.id));
        if (FormResultsObject) {
            // add date to formdata
            var Timestamp = Date.now();
            // deb(Timestamp, 'Timestamp');
            Datetime = formatdate(Timestamp, "d.m.Y H:i:s")
            FormResultsObject = Object.assign({ Timestamp: Timestamp, Datetime: Datetime }, FormResultsObject);

            // split string with new Situations (last item of array) from input field
            if (FormResultsObject.situations) {
                let lastkey = Object.keys(FormResultsObject.situations).length - 1;
                // deb(lastkey)
                let newSituations = Object.assign({}, FormResultsObject.situations[lastkey].split(","));
                delete FormResultsObject.situations[lastkey];
                // deb(newSituations, 'newSituations')
                FormResultsObject.situations = mergeObj(FormResultsObject.situations, newSituations);
                // deb(FormResultsObject.situations, 'FormResultsObject.situations')
            }


            //
            // PROFIL
            //
            if ('ProfilForm' == form.id) {
                // delete username and password
                delete FormResultsObject.Name;
                delete FormResultsObject.Passwort;
                FormResultsObject.Browser = getBrowser();
                FormResultsObject.OS = getOS();
                FormResultsObject.Viewport = getViewport();
                // deb(localData, 'localData vorher');
                // deb(FormResultsObject.Wirkung, 'FormResultsObject');
                // combine the name of "individuelle Wirkunng" with the color 
                let WirkungColor = (FormResultsObject.WirkungColor == 'Farbe') ? 'blue' : FormResultsObject.WirkungColor;
                // delete FormResultsObject.WirkungColor;
                ({ WirkungColor, ...FormResultsObject } = FormResultsObject);
                for (let key in FormResultsObject.Wirkung) {
                    if (0 >= FormResultsObject.Wirkung[key].search("___")) {
                        // deb(FormResultsObject.Wirkung[key], "no___")
                        FormResultsObject.Wirkung[key] = FormResultsObject.Wirkung[key] + "___" + WirkungColor;
                    }
                }
                // save Profil to localData Object
                localData.Profil = Object.assign(localData.Profil, FormResultsObject);
                // deb(localData, 'localData nachher');

                // putData(JSON.stringify(FormResultsObject),'Profil')
                putData(FormResultsObject, 'Profil' + Timestamp)

            }

            //
            // MOOD
            //
            if ('MoodForm' == form.id) {
                // deb(FormResultsObject, 'FormResultsObject')

                //
                // add Timestamp arround  Mood FormResults & save to localData.Mood
                //
                localData.Mood = Object.assign({
                    [Timestamp]: FormResultsObject
                }, localData.Mood);
                // putData(JSON.stringify(FormResultsObject),Timestamp)
                // putData(FormResultsObject, '"' + Timestamp + '"');


                //
                // save SITUATION to Profil try mergeObj()
                //  
                if (FormResultsObject.situations) {
                    // deb(localData.Profil.Situations,'localData.Profil.Situations')
                    // deb(FormResultsObject.situations, 'FormResultsObject.situations')
                    let allSituation = mergeObj(localData.Profil.Situations, FormResultsObject.situations);
                    delete localData.Profil.Situations;
                    localData.Profil.Situations = Object.assign({}, allSituation);
                    // deb(localData.Profil.Situations, 'localData.Profil.Situations afetr assign')
                }

            }


            //
            // save data local
            //
            // deb(localData)
            // deb(JSON.stringify(localData))
            localStorage.setItem(localDataName, JSON.stringify(localData));
            //
            //
            // send data to server if allowed by user
            //
            if (document.getElementById('P_Freigeben').checked) {
                saveOnServer(localData, localDataName);
            } else {
                showMessage("Form data has been saved locally!");
            }
        }

        //
        // get FormData in 2D for validation and HTML Output
        //
        let FormData2D = getFormData(form);
        outputFormHTML(FormData2D);
        // update forms
        populateProfilForm();
        populateMoodForm();
        DataFreigeben();
    });
}


 


//////////////////// PouchDB //////////////////// PouchDB //////////////////// PouchDB //////////////////// PouchDB //////////////////// PouchDB 
//
// PouchDB
//
let dbName = localDataName;
var db = new PouchDB(dbName);
var remoteCouch = 'http://root:root@127.0.0.1:5984/' + dbName;
showData()
// deb(db,'db')

db.changes({
    since: 'now',
    live: true
}).on('change', showData);




// We have to create a new todo document and enter it in the database
function putData(text, timestamp) {
    var todo = {
        _id: timestamp, //new Date().toISOString(),
        JSON: text,
        completed: false
    };
    // deb(todo, 'putData')
    db.put(todo, function callback(err, result) {
        if (!err) {
            deb('Successfully posted: ') // + text);
            sync();
        } else {
            deb(err, 'NOT posted: ') // + text);
        }
    });
}

// Show the current list of todos by reading them from the database
function showData() {
    db.allDocs({ include_docs: true, descending: true }, function(err, doc) {
        redrawTodosUI(doc.rows);
        // deb(doc, 'showData')
    });
}

// There was some form or error syncing
function syncError() {
    deb('There was some form or error syncing')
    syncDom.setAttribute('data-sync-state', 'error');
}





// if (remoteCouch) {
//     // sync();
// }

// Initialise a sync with the remote server
function sync() {
    syncDom.setAttribute('data-sync-state', 'syncing');
    var opts = { live: true };
    db.replicate.to(remoteCouch, opts, syncError);
    db.replicate.from(remoteCouch, opts, syncError);
}



// User pressed the delete button for a todo, delete it
function deleteButtonPressed(db) {
    db.get(db, function(err, doc) {
        deb(db, 'deleteButton')
        if (err) { return console.log(err); }
        db.remove(doc._id, doc._rev, function(err, response) {
            if (err) { return console.log(err); }
            // handle response
        });
    });
}


// deleteButtonPressed(db)



// db.info(function(err, info) {
//     if (err) { return console.log(err); }
//     // deb(info, 'info') 
// });




function redrawTodosUI(todos) {
    var pouchData = document.getElementById('pouchData');
    let json = ''
    todos.forEach(function(todo) {
        // deb(todo.doc.JSON, 'todo.doc.JSON')
        json += '<div style="border:0px solid green">' + syntaxHighlight(todo.doc.JSON).replace(/{/g, '').replace(/}/g, '').replace(/"/g, '').replace(/,/g, '').replace(/\n\n/g, '') + '</div>';
        // deb(json, 'json')
    });
    json = json.split('\n').filter(function(v) { return (/\S/.test(v)) }).join('\n');
    // deb(json.split('\n'), 'json.split(n)')
    pouchData.innerHTML = json;
}





function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}




//////////////////// PouchDB //////////////////// PouchDB //////////////////// PouchDB //////////////////// PouchDB //////////////////// PouchDB 

//
// merge two objects and return an object with unique values
// DELETE ALL KEYS
//
function mergeObj(...objs) {
    let array = [];
    objs.forEach(obj => {
        for (const key in obj) {
            let value = obj[key];
            if (typeof value === 'string' || value instanceof String) {
                value = value.trim();
            }
            // console.log(value)
            array.push(value)
        }
    });
    // remove duplicates
    array = array.filter((item, index) => { return (array.indexOf(item) == index) });

    return Object.assign({}, array);
}


//
// send the local file to server
//
function saveOnServer(data, localDataName) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "save.php?n=" + localDataName);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // console.log(xhr.responseText);
            showMessage("Form data has been sended to server!");
        }
    }
    xhr.setRequestHeader("Content-type", "application/json")
    xhr.send(JSON.stringify(data));
}


//
// print the FormData on Website
//
function outputFormHTML(FormData2D) {
    // write to HTML
    var formContent = '<table>';
    for (const el of FormData2D) {
        formContent += "<tr><td>" + el.name + " </td><td> " + el.value + "</td></tr>";
    }
    formContent += '</table>';
    document.getElementById("formcontent").innerHTML = formContent;
}

//
// get an iterable array from form data 
// parameter: form.id
//
function getFormData(form) {
    var FormData = [];
    Array.prototype.slice.call(form.elements).forEach(function(field) {
        if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1) return;
        if (field.type === 'select-multiple') {
            Array.prototype.slice.call(field.options).forEach(function(option) {
                if (!option.selected) return;
                FormData.push({
                    name: field.name,
                    value: option.value
                });
            });
            return;
        }
        if (['checkbox', 'radio'].indexOf(field.type) > -1 && !field.checked) return;
        if (!field.value) return;
        FormData.push({
            name: field.name,
            value: field.value
        });
    });
    // console.log(FormData);
    return FormData;
}




//
// This function displays a message on the page for 1 second
//
function showMessage(messageText = "Message", messageTitle = 'Info', duration = '1', speed = '5') {
    // create new DIV and add styles
    var overlay = document.createElement("div");
    duration = duration * 1000;
    overlay.id = "MessageOverlay";
    overlay.style.display = "block";
    overlay.style.position = "fixed";
    overlay.style.width = "100%";
    overlay.style.height = "max-content";
    overlay.style.left = "0";
    overlay.style.zIndex = "99";
    overlay.style.cursor = "pointer";
    // add message
    overlay.innerHTML = "<fieldset><legend>" + messageTitle + "</legend>" + messageText + "</fieldset>";
    // add new DIV to BODY
    document.getElementsByTagName('BODY')[0].appendChild(overlay);
    // get real height of the new DIV
    var OverlayHeight = overlay.clientHeight;
    // calculate transform time
    var time = OverlayHeight / (speed * 150);
    // add position, translateWay & time
    overlay.style.top = "-" + OverlayHeight + "px";
    overlay.style.transform = "translateY(" + OverlayHeight + "px)";
    overlay.style.transition = "transform " + time + "s linear";
    // the DIV moves in
    //

    //
    // close message after timeout
    time = time * 1000;
    setTimeout(function() {
        overlay.style.transform = "translateY(-" + OverlayHeight + "px)";
    }, duration + time);

    setTimeout(function() {
        overlay.remove();
    }, duration + time + time);
    //
    // close message after click at message
    overlay.onmousedown = function(event) {
        overlay.style.transform = "translateY(-" + OverlayHeight + "px)";

        setTimeout(function() {
            overlay.remove();
        }, time);
    }
}




//
// add or delete medikations
//
// var ct = 10;

var MedikationArray = ["Attentin", "Elvanse", "Elvanse Adult", "Ritalin (unretardiert)", "Medikinet (unretardiert)", "Ritalin Retard", "Medikinet Retard", "Equasym", "Ritalin Adult", "Medikinet Adult", "Kinecteen", "Concerta", "Strattera", "Intuniv "];

function newMedikation() {
    var MedikationCount = document.querySelectorAll('[id^=Medikation_]').length;

    var new_medikation = document.createElement("div");
    new_medikation.className = 'medikationSet';
    new_medikation.id = "Medikation_" + MedikationCount;
    new_medikation.innerHTML = document.getElementById("Medikation_0").innerHTML.replaceAll('[0]', '[' + MedikationCount + ']');
    new_medikation.innerHTML = new_medikation.innerHTML.replaceAll('<!---placeholder-->', MedikationCount + 1);

    document.getElementById("AnmerkungMedikation").before(new_medikation);
    document.getElementById("RemoveMedikation").style.display = 'inline';
    // ct++;
    let input = document.getElementById('M_Medikament[' + MedikationCount + ']')
        // deb(input)
    new Awesomplete(input, {
        list: MedikationArray
    });

}

let input = document.getElementById('M_Medikament[0]')
    // deb(input)
new Awesomplete(input, {
    list: MedikationArray
});



function delMedikation() {
    var delMedikation = document.querySelectorAll('[id^=Medikation_]');
    if (delMedikation.length > 1) {
        delMedikation[delMedikation.length - 1].remove();
    }
    if (delMedikation.length == 2) {
        document.getElementById("RemoveMedikation").style.display = 'none';
    }
}



//
// show profil form
//
function showProfil() {
    // ProfilForm.style.display = 'block';
    // MoodForm.style.display = 'none';
    // AuswertungsChart.style.display = 'none';
}


//
// show profil form
//
function showChart() {
    // AuswertungsChart.style.display = 'block';
    // ProfilForm.style.display = 'none';
    // MoodForm.style.display = 'none';
}

//
// show mood form
//
function showMood() {
    // MoodForm.style.display = 'block';
    // ProfilForm.style.display = 'none';
    // AuswertungsChart.style.display = 'none';

}

//
// remove current localstorage file 
//
DelLocalLink.addEventListener("click", event => {
    // localDataName = md5(localDataNameField.value); // wurde umbenannt
    localStorage.removeItem(localDataName);
    location.reload();
});


//
// show JSON on server
//
function DataFreigeben() {
    let localData = JSON.parse(localStorage.getItem(localDataName)) || initObj;

    // deb(localData.Profil.Freigeben)
    if ('on' == localData.Profil.Freigeben) {
        let html = "<a class=pinkFont target='_blank' href='save.php?n=" + localDataName + "'><i class='icono-sitemap'></i><a/>";
        datalink.innerHTML = html;
    } else {
        datalink.innerHTML = " ";
    }
}


//
// read url and show content
//
function showContent() {
    urlParts = document.URL.split('#');
    let anchor = (urlParts.length > 1) ? urlParts[1] : null;
    if (!anchor || 'chart' == anchor) showChart();
    if (!anchor || 'profil' == anchor) showProfil();
    if ('mood' == anchor) showMood();
}
showContent()


//
// Hoover Helper
//
var hooverHelper = {
    'Test': "Deine Daten werden zur Auswertung an den Bereitsteller dieser Software gesendet. Es werden keine Daten erhoben, die direkte Rückschlüsse auf DiDeine Daten werden zur Auswertung an den Bereitsteller dieser Software gesendet. Es werden keine Daten erhoben, die direkte Rückschlüsse auf DiDeine Daten werden zur Auswertung an den Bereitsteller dieser Software gesendet. Es werden keine Daten erhoben, die direkte Rückschlüsse auf Dich als Person zulassen.",
    'Daten freigeben': "Deine Daten werden zur Auswertung an den Bereitsteller dieser Software gesendet. Es werden keine Daten erhoben, die direkte Rückschlüsse auf Dich als Person zulassen.",
    'Zyklus': "Hiermit aktivierst du die Möglichkeit, deine Zyklusphase in den Daten mit anzugeben."
}

for (const label of labels) {
    if (hooverHelper.hasOwnProperty(label.id)) {

        // label.addEventListener("touchstart", function() {
        //     showMessage(hooverHelper[label.id], label.id, 50000)
        // }, { passive: true });

        label.addEventListener("click", function() {
            showMessage(hooverHelper[label.id], label.id, 50000, 1)
        }, { passive: true });
    }
}
// showMessage(hooverHelper['Test'], 'Datenfreigeben',200,5)



//
// removes situation buttons by longpress on them
//
function removeByLongpress(query) {
    let listItems = document.querySelectorAll(query);
    for (var i = 0, j = listItems.length; i < j; i++) {
        // add attribute with delay time to every item
        let att = document.createAttribute("data-long-press-delay");
        att.value = "1000";
        listItems[i].setAttributeNode(att);
        // add eventlistener to every item
        listItems[i].addEventListener('long-press', function(e) {
            e.preventDefault()
                // works in FF not in chrome
                // deb(e.originalTarget.innerHTML, 'e.originalTarget.innerHTML');
                // FF & chrome
                // deb(e.target.attributes.for.value, 'e.target.attributes.for.value');
                // deb(e.target.textContent, 'e.textContent');

            // 
            // get localstorage, find & remove current item, save localstorage & reload form
            //
            let localData = JSON.parse(localStorage.getItem(localDataName));
            let situations = localData.Profil.Situations;
            let item = e.target.textContent;
            // deb(item);
            // deb(situations);
            for (const key in situations) {
                // deb(item)
                // deb(situations[key])
                if (situations[key] == item) {
                    // deb(item)
                    // deb(key)
                    delete localData.Profil.Situations[key]
                    localStorage.setItem(localDataName, JSON.stringify(localData));
                    showMessage('Situation "' + item + '" entfernt', 'Info', 2, 2)
                    populateMoodForm();
                }
            }
        });
    }
}







//
// get the viewport of the current document, for stat. info
//
function getViewport() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    return vw + " x " + vh;
}


// 
// get the browsername
//
function getBrowser() {
    var ua = navigator.userAgent,
        tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return { name: 'IE', version: (tem[1] || '') };
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR|Edge\/(\d+)/)
        if (tem != null) { return { name: 'Opera', version: tem[1] }; }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
    return M[0] + " " + M[1];
}
// showMessage(getBrowser())

//
// get the OS
//
function getOS() {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;
    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
    }

    return os;
}
// deb(getOS());




//
// TOGGLE THEME
//
var toggle = document.getElementById("theme-toggle");
var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme)
}
toggle.onclick = function() {
    var currentTheme = document.documentElement.getAttribute("data-theme");
    var targetTheme = "light";
    if (currentTheme === "light") {
        targetTheme = "dark";
    }
    document.documentElement.setAttribute('data-theme', targetTheme)
    localStorage.setItem('theme', targetTheme);
};





//
// checkboxhack via JA  
//
// function avtivateButtonLabel() {
//     for (const label of labels) {
//         label.addEventListener("click", function() {
//             setTimeout(function() {
//                 if (label.control.checked){
//                     label.style.color = "red";
//                 }
//                 deb(label.control.checked)
//             }, 5);
//         }, { passive: true });
//     }
// }
// avtivateButtonLabel()




// function showMessage(message, title = 'Info', duration = 2000) {
//     var overlay = document.createElement("div");
//     overlay.id = "overlay";
//     overlay.style.display = "block";
//     overlay.innerHTML = "<fieldset><legend>" + title + "</legend>" + message + "</fieldset>";
//     document.getElementsByTagName('BODY')[0].appendChild(overlay);
//     // add class with some short timeout to let the transition work
//     setTimeout(function() {
//         overlay.classList.add("transition");
//     }, 5);
//     // close message after timeout
//     // setTimeout(function() {
//     //     overlay.classList.remove("transition");
//     //     setTimeout(function() {
//     //         overlay.remove();
//     //     }, 500);
//     // }, duration);
//     // close message after click at anywhere
//     window.onmousedown = function(event) {
//         // deb(event)
//         overlay.classList.remove("transition");
//         setTimeout(function() {
//             overlay.remove();
//         }, 800);
//     }
// };