// get slider values
document.getElementById("motivationSliderOutput").innerHTML = document.getElementById("motivationSlider").value;
document.getElementById("moodSliderOutput").innerHTML = document.getElementById("moodSlider").value;
document.getElementById("brainloadSliderOutput").innerHTML = document.getElementById("brainloadSlider").value;
// change on input
document.getElementById("motivationSlider").oninput = function() {
    document.getElementById("motivationSliderOutput").innerHTML = this.value;
}
document.getElementById("moodSlider").oninput = function() {
    document.getElementById("moodSliderOutput").innerHTML = this.value;
}
document.getElementById("brainloadSlider").oninput = function() {
    document.getElementById("brainloadSliderOutput").innerHTML = this.value;
}

//
// show submit button only if a situation is set
//
var allSituations = document.getElementById("SituationCheckboxes")
var submitButton = document.getElementById("submitButton")
var allCheckboxes = allSituations.querySelectorAll('input[type=checkbox]');
var allTextInput = allSituations.querySelectorAll('input[type=text]');
allSituations.addEventListener('change', checkSituations);
allSituations.addEventListener('input', checkSituations);

function checkSituations() {
    var oneSituation = 0;
    for (let checkbox of allCheckboxes) {
        if (checkbox.checked) {
            oneSituation = 1;
            break;
        };
    }
    for (let TextInput of allTextInput) {
        if (TextInput.value.length > 0) {
            oneSituation = 1;
            break;
        }
    };
    if (oneSituation) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}


//
// add fields for search & replace in SQL file
var ct = 1;
function newMedikation() {
    var new_medikation = document.createElement("div");
    new_medikation.className = 'medikation_' + ct;
    new_medikation.id = ct;
    new_medikation.innerHTML = document.getElementById("medikation").outerHTML.replaceAll('[0]', '[' + ct + ']');
    document.getElementById("newMedikation").before(new_medikation);
    ct++;
}


// LOCALSTORAGE
// var testObject = { 'one': 1, 'two': 2, 'three': 3 };
// // Put the object into storage
// localStorage.setItem('testObject', JSON.stringify(testObject));
// // Retrieve the object from storage
// var retrievedObject = localStorage.getItem('testObject');
// console.log('retrievedObject: ', JSON.parse(retrievedObject));