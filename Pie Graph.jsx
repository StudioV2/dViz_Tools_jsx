﻿var sversion = '2.0',    scriptName = 'dViz: Polar Area/Pie Graph' + ' ' + sversionif (version.split(".")[0] >= 15) {    if (app.documents.length > 0) {        if (app.activeDocument != null) {            doc = app.activeDocument;            var dlg = new Window('dialog', scriptName, undefined, { "resizeable": true, "closeButton":true, "independent":true } );                         var values = [];            var radius = 10;            var max_value = 10;                    dlg.inputGroup = dlg.add('group', undefined, 'Input Fields:');            dlg.inputGroup.spacing = 0;            (dlg.inputGroup.addutton = dlg.inputGroup.add('button', [0,0,25,20], '+')).helpTip = "Add another value input field";            function addValueInputField() {                values.push(0);                dlg.inputGroup["valueInput_"+values.length] = dlg.inputGroup.add('edittext', [0,0,50,20], 10);            }                        dlg.inputGroup.addutton.onClick = function addValueField() {                addValueInputField();                dlg.layout.layout(true);                dlg.inputGroup.layout.layout(true);            }            addValueInputField();            dlg.inputGroup.orientation = 'row';            dlg.optionGroup = dlg.add('group', undefined, 'Options Group');            dlg.optionGroup.add('statictext', undefined, 'Max Value:');            dlg.optionGroup.maxValueInput = dlg.optionGroup.add('edittext',  [0,0,50,20], max_value);            dlg.optionGroup.orientation = 'row';                        dlg.graphicsOptionsGroup = dlg.add('group', undefined, 'Options Group');            dlg.graphicsOptionsGroup.add('statictext', undefined, 'Radius:');            dlg.graphicsOptionsGroup.radiusInput = dlg.graphicsOptionsGroup.add('edittext',  [0,0,50,20], radius);            dlg.graphicsOptionsGroup.orientation = 'row';                dlg.buttonGroup = dlg.add('group', undefined, 'Button Group');            dlg.buttonGroup.cancelBtn = dlg.buttonGroup.add('button', undefined, 'Cancel', {name:'cancel'});            dlg.buttonGroup.cancelBtn.onClick = function() {dlg.close();};            dlg.buttonGroup.okBtn = dlg.buttonGroup.add('button', undefined, 'OK', {name:'ok'});            dlg.buttonGroup.okBtn.onClick = function() {                var inval = 0;                radius = parseFloat(dlg.graphicsOptionsGroup.radiusInput.text);                max_value = parseFloat(dlg.optionGroup.maxValueInput.text);                                for(var key in dlg.inputGroup) {                    if (key.split("_")[0]==="valueInput") {                        if (isNaN(dlg.inputGroup[key].text)) {                            inval++; break;                        } else {                            values[parseInt(key.split("_")[1])-1] = parseFloat(dlg.inputGroup[key].text);                        }                    }                }                            var centerPoint = doc.activeView.centerPoint;                if (inval) {                    Window.alert("Invalid values!");                } else {                    for (var i in values) {                        if (values[i] > max_value) {                            max_value = values[i];                        }                    }                    for (var i in values) {                        var v = values[i];                        var val = v * radius / max_value;                                                $.writeln(max_value/val);                        var tmpTopGroup = doc.groupItems.add(); // Top group                            var circle = tmpTopGroup.pathItems.ellipse(centerPoint[1]+val, centerPoint[0]-val, val*2, val*2);                         circle.selected = true;                           var verticeArray = [[centerPoint[0], centerPoint[1]],[centerPoint[0]+val*1.5, centerPoint[1]],[centerPoint[0]+val*1.5, centerPoint[1]+val*1.5],[centerPoint[0], centerPoint[1]]];                        var triangle = tmpTopGroup.pathItems.add();                        triangle.setEntirePath(verticeArray);                        triangle.selected = true;                           app.executeMenuCommand('Live Pathfinder Intersect');                                                var rmat = app.getRotationMatrix(360/values.length*i);                        rmat.tx = centerPoint[0];                        rmat.ty = centerPoint[1];                                                //tmpTopGroup.rotate(15, true, false, false, false, Transformation.BOTTOMLEFT);                        tmpTopGroup.transform(rmat, true, false, false, false, 0, Transformation.BOTTOMLEFT);                    }                    dlg.close();                }            }            dlg.buttonGroup.orientation = 'row';            dlg.show();        } else { Window.alert("You must have an active document to run this script."); }    } else { Window.alert("You must open at least one document to run this script."); }} else { Window.alert("Your version of Adobe illustrator is too old to run this script."); }