//
// populate the ProfilForm
//
const populateForm = () => {
    // if (localStorage.key(localDataName)) {
    // const localData = JSON.parse(localStorage.getItem(localDataName));
    // console.log(localData)

    // find profil element in localData
    for (let i = 0; i < localData.length; i++) {
        if (localData[i].hasOwnProperty('Profil')) {
            var localDataProfil = localData[i].Profil;
            // console.log(localDataProfil)
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
            break;
        }
    }

    //
    // create wirkungsweisen from object
    //
    var wirkungenStd = {
            'Unruhe': {
                'active': false,
                'color': 'red'
            },

            'Konzentration': {
                'active': false,
                'color': 'blue'
            },

            'Aufmerksamkeit': {
                'active': false,
                'color': 'green'
            },
            'Motivation': {
                'active': false,
                'color': 'salomon'
            },
            'Auslastung': {
                'active': false,
                'color': 'orange'
            },
        }
        // console.log('wirkungenStd')
        // console.log(wirkungenStd)
        // console.log(wirkungenStd.Unruhe.color)

    // 
    // create label & checkboxes for "Wirkungen"
    if (localDataProfil) {

        var wirkungenLoc = localDataProfil.wirkung;
        // console.log('wirkungenLoc')
        // console.log(wirkungenLoc);

        // 
        // get wirkungen from local and set active state to wirkungenStd 
        //
        for (var wirkung in wirkungenLoc) {
            if (wirkungenStd.hasOwnProperty(wirkungenLoc[wirkung])) {
                wirkungenStd[wirkungenLoc[wirkung]].active = true;
            } else {
                let wirkungCust = wirkungenLoc[wirkung];
                // console.log(wirkungCust)

                wirkungenStd = Object.assign({
                    [wirkungCust]: {
                        'active': true,
                        'color': 'orange'
                    }
                }, wirkungenStd);

            }
        }
    }

    var WirkungCheckboxes = '';
    for (var wirkung in wirkungenStd) {
        let checked = (wirkungenStd[wirkung].active ? 'checked' : '');
        let color = wirkungenStd[wirkung].color;
        WirkungCheckboxes += `<input type=checkbox class=hidden id=${wirkung} name=wirkung[] value=${wirkung} ${checked}>`;
        WirkungCheckboxes += `<label class="buttonlabel wirkung" for=${wirkung}>${wirkung}</label>`;
    }
    WirkungCheckboxes += '<input type=text class=newSituation name=wirkung[] placeholder="individuelle Wirkungen">';
    document.getElementById('WirkungCheckboxes').innerHTML = WirkungCheckboxes;

    // }
};
// document.onload = populateForm();



//
// get POST from forms
//
var forms = document.getElementsByTagName("FORM");
// console.log(forms)
for (const form of forms) {
    form.addEventListener("submit", function(evt) {
        evt.preventDefault();
        // get local and form data
        // var localData = JSON.parse(localStorage.getItem(localDataName)) || [];
        var FormResultsObject = formToObject(document.getElementById(form.id));
        if (FormResultsObject) {
            // add date to formdata
            // FormResultsObject = Object.assign({Timestamp: Date.now()}, FormResultsObject);
            // FormResultsObject = Object.assign({DateISO: new Date()}, FormResultsObject);
            FormResultsObject = Object.assign({
                Date: new Date().toLocaleDateString()
            }, FormResultsObject);


            // PROFIL
            if ('ProfilForm' == form.id) {
                // delete username and password
                delete FormResultsObject.Name;
                delete FormResultsObject.Passwort;
                // console.log(localData)
                // find the Profil entry
                for (let i = 0; i < localData.length; i++) {
                    if (localData[i].hasOwnProperty('Profil')) {
                        // console.log(localData[i])
                        localData[i].Profil = FormResultsObject;
                        var addedProfile = 1;
                        break;
                    }
                }
                // create the Profil entry
                if (!addedProfile) {
                    localData.push({
                        Profil: FormResultsObject
                    });
                }
            }
            // MOOD
            if ('MoodForm' == form.id) {
                // console.log(localData)
                localData.push({
                    Mood: FormResultsObject
                });
            }
            // save data local
            localStorage.setItem(localDataName, JSON.stringify(localData));
            // send data to server if allowed by user
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
        populateForm();
        DataFreigeben();
    });
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
function showMessage(messageText = "Message", messageTitle = 'Info',  duration = '2', speed = '1') {
    //
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
    var DataFreigegeben = document.getElementById('P_Freigeben').checked;
    // deb(DataFreigegeben, 'DataFreigegeben')
    if (DataFreigegeben) {
        datalink.innerHTML = "<a class=pinkFont target='_blank' href='save.php?n=" + localDataName + "'>JSON<a/>";
        localDataNameField.addEventListener("input", event => {
            localDataName = md5(localDataNameField.value);
            datalink.innerHTML = "<a class=pinkFont target='_blank' href='save.php?n=" + localDataName + "'>JSON<a/>";
        });
    } else {
        datalink.innerHTML = " ";
    }
}
DataFreigeben()




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
            showMessage(hooverHelper[label.id], label.id, 50000)
        }, { passive: true });
    }
}
showMessage(hooverHelper['Test'], 'Datenfreigeben',200,5)


//
// checkboxhack via JA https://css-tricks.com/forums/topic/checkbox-hack-on-mobile-webkit/
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