/* var ui_references = {
    stylesheet: document.styleSheets[0].cssRules,
    //one: document.styleSheets[0].cssRules[0],
    //two: document.styleSheets[0].cssRules[1]
	//four: document.styleSheets[0].cssRules[6],
};

function switchInterface(interfaceLabel) {
    "use strict";
    var ui;
    console.log(document.styleSheets[0]);
    if (interfaceLabel === 1) {
        ui = ui_references.one;
        ui.style.visibility = "visible";
        ui = ui_references.two;
        ui.style.visibility = "hidden";
		ui = ui_references.four;
        ui.style.visibility = "hidden";
    } else if (interfaceLabel === 2) {
        ui = ui_references.one;
        ui.style.visibility = "hidden";
        ui = ui_references.two;
        ui.style.visibility = "visible";
		ui = ui_references.four;
        ui.style.visibility = "hidden";
    }
}
*/

var uimode1 = document.getElementById('Results');
var uimode2 = document.getElementById('Parameters');

uimode1.addEventListener('mouseup', function() {switchInterface(1);});
uimode2.addEventListener('mouseup', function() {switchInterface(2);});

