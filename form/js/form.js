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

    removeByLongpress("label.buttonlabel.situation");

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







    // <label class="itemLabel brainload" for=brainloadSlider>Brainload: </label>
    // <div class=sliderValue id=brainloadSliderOutput></div>
    // <input type="range" min="0" max="100" value="0" step="10" class="slider brainload" id=brainloadSlider name=mood[brainload]>

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
            Datetime = formatdate(Timestamp, "d.m.Y H:i:s")
            FormResultsObject = Object.assign({ Timestamp: Timestamp, Datetime: Datetime }, FormResultsObject);

            // split string with new Situations (last item of array) from input field
            if (FormResultsObject.situations) {
                let newSituations = FormResultsObject.situations[Object.keys(FormResultsObject.situations)[Object.keys(FormResultsObject.situations).length - 1]].split(",");
                FormResultsObject.situations = { newSituations };
            }


            //
            // PROFIL
            //
            if ('ProfilForm' == form.id) {
                // delete username and password
                delete FormResultsObject.Name;
                delete FormResultsObject.Passwort;
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
                // deb(FormResultsObject, 'FormResultsObject')

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
                    // deb(FormResultsObject.situations,'FormResultsObject.situations')
                    let allSituation = mergeObj(localData.Profil.Situations, FormResultsObject.situations.newSituations);
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
var ct = 1;

function newMedikation() {
    var new_medikation = document.createElement("div");
    new_medikation.className = 'pure-g';
    new_medikation.id = "Medikation_" + ct;
    new_medikation.innerHTML = document.getElementById("Medikation_0").innerHTML.replaceAll('[0]', '[' + ct + ']');
    document.getElementById("AddRemoveMedikation").before(new_medikation);
    document.getElementById("RemoveMedikation").style.display = 'inline';
    ct++;
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
        datalink.innerHTML = "<a class=pinkFont target='_blank' href='save.php?n=" + localDataName + "'>JSON<a/>";
        // localDataNameField.addEventListener("input", event => {
        //     localDataName = md5(localDataNameField.value);
        //     datalink.innerHTML = "<a class=pinkFont target='_blank' href='save.php?n=" + localDataName + "'>JSONx<a/>";
        // });
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
                    showMessage('Situation "' + item + '" entfernt', 'Info', 1, 1)
                    populateMoodForm();
                }
            }
        });
    }
}


















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