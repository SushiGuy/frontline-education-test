$(function () {
    // JHeiner 8/31/2017: Note, if single quotes in JavaScript is preferred by reviewing developer I am happy to switch! :D
    $("#header p span").fadeIn(750, "swing", function () {
        // Animation complete, do next eye candy
        $("#main").fadeIn("slow");
    });

    $("#startButton").on("click", function () {
        var inputString = $("#inputString").val();
        //Initialize global objects (prevents result duplicate stacking after first run)
        var gArray = [];
        gOutputString = "";

        //Trim off first paren
        inputString = inputString.substring(1, inputString.length);
        convertString(inputString, gArray, 0, 0, "");
        displayArray(gArray);
    });
});

//"g" for global variable - declare outside of recursive loop to preserve state
//var gOutputString;
var gArray;
//var gBullet = "-";

function displayArray(gArray) {
    var output = "";
    for (i = 0; i < gArray.length; i++) {
        if (gArray[i].constructor === Array) {
            for (j = 0; j < gArray[i].length; j++) {
                //output += gArray[i][j] + "\n";
                output += gArray[i][j] + " - i/j = " + i + "/" + j + "\n";
            }
        }
        else {
            output += gArray[i] + " - i = " + i + "\n";
        }
    }
    //$("#output").html(gArray.join("\n"));
    $("#output").html(output);
}

function convertString(str, arr, i, arrDep, strCurr) {

    // Loop for each major number (each row in the table)  
    while (i < str.length) {

        //If a delimiter has been hit 
        if (str[i] == "(" || str[i] == "," || str[i] == ")") { 
            //If string builder has a value 
            if (strCurr.length > 0) { 
                //Push to output and reinitialize string builder 
                //var bullet = (arrDep == 0 ? "" : gBullet.repeat(arrDep) + " "); 
                //gArray[arrDep] = strCurr;
                //gArray.push(bullet + strCurr);
                arr.push(strCurr);
                strCurr = ""; 
            } 
        } 

        //If array start
        if (str[i] == "(") {
            arrDep++;
            // Create a new array
            var arr2 = arr[arrDep] = [];

            //Recurse
            i = convertString(str, arr2, i + 1, arrDep, strCurr);

            //After recursion returns, decrement depth
            arrDep--;
        }

        //If array end, exit recursive call / loop
        else if (str[i] == ")") {
            return i + 1;
        }
        else {
            //Aplhabetic character
            if (str[i] != ",") {
                strCurr += str[i];
            }
            i++;
        }

    }
    return i;
}