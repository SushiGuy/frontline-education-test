$(function () {
    // JHeiner 8/31/2017: Note, if single quotes in JavaScript is preferred by reviewing developer I am happy to switch! :D
    $("#header p span").fadeIn(750, "swing", function () {
        // Animation complete, do next eye candy
        $("#main").fadeIn("slow");
    });

    $("#startButton").on("click", function () {
        var inputString = $("#inputString").val();
        //Initialize global objects (prevents result duplicate stacking after first run)
        var outputArray = [];
        //gOutputString = "";

        //Trim off first paren (parens trigger new subarray, but we want to start with level 0)
        inputString = inputString.substring(1, inputString.length);
        convertString(inputString, outputArray, 0, 0, "");
        displayArray(outputArray);
    });
});

//"g" for global variable - declare outside of recursive loop to preserve state
//var gOutputString;
//var gArray = [];
//var gBullet = "-";

function displayArray(arr) {
    var output = "";
    var bullet = "-";
    //var bullet = (arrDep == 0 ? "" : gBullet.repeat(arrDep) + " "); 
    //debugger;
    //var depth = 0;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].constructor === Array) {
            //depth++;
            for (j = 0; j < arr[i].length; j++) {
                output += arr[i][j] + "\n";
                //output += bullet + " " + arr[i][j] + "\n";
                //output += arr[i][j] + " - i/j = " + i + "/" + j + " depth " + depth + "\n";
            }
        }
        else {
            output += arr[i] + "\n";
            //output += arr[i] + " - i = " + i + "\n";
        }
    }
    //$("#output").html(arr.join("\n"));
    $("#output").html(output);
}

function convertString(str, arr, i, j, strCurr) {

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
            j++;
            // Create a new array
            var subArr = [];
            arr.push(subArr);

            //Recurse into subarray
            i = convertString(str, subArr, i + 1, j, strCurr);

            //After recursion returns, decrement depth
            j--;
        }
        //If array end, exit recursive call / loop
        else if (str[i] == ")") {
            return i + 1;
        }
        else if (str[i] == ",") {
            //No action
        }
        //Alphabetic character
        else {
            strCurr += str[i];
        }
        i++;
    }
    return i;
}