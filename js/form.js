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

        WirkungCheckboxes += `<input type=checkbox class=hidden id=${NameWirkung} name=Wirkung[] value="${NameWirkung}___${color}" ${checked}>`;
        WirkungCheckboxes += `<label class="buttonlabel wirkung ${color}" for=${NameWirkung}>${NameWirkung}</label>`;
    }
    WirkungCheckboxes += '<div id=WirkungIndividuell>';
    WirkungCheckboxes += '<input type=text class=newSituation name=Wirkung[] placeholder="individuelle Wirkung">';
    WirkungCheckboxes += '<select id=P_WirkungColor class=newSituation name=WirkungColor>';
    WirkungCheckboxes += '<option disabled selected>Farbe</option><option>red</option><option>orange</option><option>yellow</option><option>green</option><option>bluegreen</option><option>blue</option><option>lachs</option><option>pink</option><option>grey</option>';
    WirkungCheckboxes += '</select>';
    WirkungCheckboxes += '</div>';
    document.getElementById('WirkungCheckboxes').innerHTML = WirkungCheckboxes;
}


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

    // let MedikationItems = document.getElementById('Medikation_0').elements;

    // deb(localDataMood, 'localDataMood')
    if (localDataMood && Object.keys(localDataMood).length !== 0 && localDataMood.constructor === Object) {

        //
        // get the medikation of last entry 
        //
        let localDataMoodLastEntry = localDataMood[Object.keys(localDataMood).reduce((a, b) => localDataMood[a] > localDataMood[b] ? b : a)].Medikation;
        // deb(localDataMoodLastEntry, 'localDataMoodLastEntry')
        let FormMedikationCount = document.querySelectorAll('[id^=Medikation_]').length;
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
    let WirkungSlider = '';
    for (const key in localDataProfil.Wirkung) {
        let value = localDataProfil.Wirkung[key].split("___")
        let name = value[0];
        let color = value[1];
        WirkungSlider += `<div class="sliderdiv ${color}">`;
        WirkungSlider += `<label class="itemLabel ${name}" for="${name}Slider">${name}: 0</label>`;
        WirkungSlider += `<div class=sliderValue id="${name}SliderOutput"></div>`;
        WirkungSlider += `<input type="range" min="0" max="100" value="0" step="10" class="slider ${color}" id="${name}loadSlider" name="mood[${name}]">`;
        WirkungSlider += `</div>`;
    }
    document.getElementById('MoodSlider').innerHTML = WirkungSlider;








};




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
            }

            //
            // MOOD
            //
            if ('MoodForm' == form.id) {
                deb(FormResultsObject, 'FormResultsObject')

                //
                // add Timestamp arround  Mood FormResults & save to localData.Mood
                //
                localData.Mood = Object.assign({
                    [Timestamp]: FormResultsObject
                }, localData.Mood);


                //
                // save SITUATION to Profil try mergeObj()
                //  
                if (FormResultsObject.situations) {
                    // deb(localData.Profil.Situations,'localData.Profil.Situations')
                    deb(FormResultsObject.situations, 'FormResultsObject.situations')
                    let allSituation = mergeObj(localData.Profil.Situations, FormResultsObject.situations);
                    delete localData.Profil.Situations;
                    localData.Profil.Situations = Object.assign({}, allSituation);
                    deb(localData.Profil.Situations, 'localData.Profil.Situations afetr assign')
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
            console.log(value)
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
}

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
ProfilLink.addEventListener("click", event => {
    showProfil();
});

function showProfil() {
    ProfilForm.style.display = 'block';
    MoodForm.style.display = 'none';
    AuswertungsChart.style.display = 'none';

}




//
// show profil form
//
ChartLink.addEventListener("click", event => {
    showChart();
});

function showChart() {
    AuswertungsChart.style.display = 'block';
    ProfilForm.style.display = 'none';
    MoodForm.style.display = 'none';
}

//
// show mood form
//
MoodLink.addEventListener("click", event => {
    showMood()
});

function showMood() {
    MoodForm.style.display = 'block';
    ProfilForm.style.display = 'none';
    AuswertungsChart.style.display = 'none';

}

//
// remove current localstorage file
//
DelLocalLink.addEventListener("click", event => {
    localDataName = md5(localDataNameField.value);
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
        let html = "<a class=pinkFont target='_blank' href='save.php?n=" + localDataName + "'>";

        html += '<svg id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50px" height="50px" viewBox="0, 0, 350,350">';
        html += '<g>                            <path  stroke="none" fill="#c678dd" fill-rule="evenodd" d="m 6.2 1.1 c -2.7 1.2 -5.5 4.6 -6 7.3 c -0.2 1.1 -0.3 52.9 -0.2 114.9 c 0.2 126.6 -0.3 114 4.8 117.8 l 1.8 1.4 l 112.6 0 l 112.6 0 l 1.8 -1.4 c 1 -0.7 2.5 -2.2 3.2 -3.2 l 1.4 -1.8 l 0 -114.6 l 0 -114.6 l -1.4 -1.8 c -3.8 -5.1 8.7 -4.6 -116.8 -4.7 c -91.9 -0.2 -112.2 0 -113.8 0.7 m 31 64.6 l 0 58.2 l 1.5 1.4 c 3.2 2.9 1.1 2.9 80.8 2.9 c 82.3 0 79.5 0.1 81.9 -3.4 c 1 -1.5 1.1 -7 1.1 -59.4 l 0 -57.9 l 14 0 c 13.1 0 14 0.1 14.7 1.3 c 0.9 1.8 0.9 223.6 0 225.4 c -0.7 1.3 -1.7 1.3 -29.7 1.3 l -29 0 l 0 -31.6 l 0 -31.6 l -1.9 -1.6 c -3.1 -2.6 -101.9 -3.9 -108.1 -1.5 c -4.7 2 -4.6 1.2 -4.6 35.6 l 0 30.7 l -25 0 c -24 0 -25 -0.1 -25.7 -1.3 c -0.9 -1.8 -0.9 -223.6 0 -225.4 c 0.7 -1.2 1.6 -1.3 15.4 -1.3 l 14.6 0 l 0 58.2 m 158.7 -0.9 l 0 56.7 l -76.4 0 l -76.3 0 l 0 -56.7 l 0 -56.6 l 76.3 0 l 76.4 0 l 0 56.6 m -56.7 140 l 0 30 l -37.3 0 l -37.4 0 l 0 -30 l 0 -30 l 37.4 0 l 37.3 0 l 0 30 m 27.2 0.2 l 0.1 29.8 l -10.3 0 l -10.3 0 l 0 -30 l 0 -30 l 10.1 0.2 l 10.2 0.2 l 0.2 29.8 m -93.9 -0.8 l 0 22 l 10.7 0 l 10.7 0 l 0 -22 l 0 -22 l -10.7 0 l -10.7 0 l 0 22"/></g></svg>';
        html += '<a/>';
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
    Zyklus: "Hiermit aktivierst du die Möglichkeit, deine Zyklusphase in den Daten mit anzugeben."
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














































// setTimeout(function() {
//     overlay.style.transform = "translateY(-" + OverlayHeight + "px)";
// }, duration + time);


// longPress("label.buttonlabel.situation");

// function removeByLongpress(listItems) {
//     var listItems = document.querySelectorAll(listItems);
//     var longpress = 500;
//     var delay;
//     var listItem;
//     for (var i = 0, j = listItems.length; i < j; i++) {
//         listItem = listItems[i];
//         listItem.addEventListener('mousedown', function(e) {
//             var _this = this;
//             // showMessage('Situation entfernt', 'Info', 1, 1)
//             delay = setTimeout(function() {
//                     let localData = JSON.parse(localStorage.getItem(localDataName));
//                     let situations = localData.Profil.Situations;
//                     let item = e.originalTarget.innerHTML;
//                     // deb(item);
//                     // deb(situations);
//                     for (const key in situations) {
//                         // deb(item)
//                         // deb(situations[key])
//                         if (situations[key] == item) {
//                             deb(item)
//                             deb(key)
//                                 // delete localData.Profil.Situations[key]
//                                 // localStorage.setItem(localDataName, JSON.stringify(localData));
//                             showMessage('Situation "' + item + '" entfernt', 'Info', 1, 1)
//                             populateMoodForm();
//                         }
//                     }
//                     deb(localData.Profil.Situations);
//                 }
//                 , longpress);
//         }, true);
//         listItem.addEventListener('mouseup', function(e) {
//             // On mouse up, we know it is no longer a longpress
//             clearTimeout(delay);
//         });
//         listItem.addEventListener('mouseout', function(e) {
//             clearTimeout(delay);
//         });
//     }
// };




















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









function getViewport() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    return vw + " x " + vh;
}

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