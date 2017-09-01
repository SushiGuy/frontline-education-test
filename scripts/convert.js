$(function () {
    // JHeiner 8/31/2017: Note, if single quotes in JavaScript is preferred by reviewing developer I am happy to switch! :D
    $("#header p span").fadeIn(750, "swing", function () {
        // Animation complete, do next eye candy
        $("#main").fadeIn("slow");
    });

    $("#startButton").on("click", function () {
        var inputString = $("#inputString").val();
        // Re-initialize global objects for subsequent runs
        outputArray = []; 
        outputString = "";

        // Trim off first paren (parens trigger next recursion, but we want to start with level 0)
        inputString = inputString.substring(1, inputString.length);

        // Main
        convertString(inputString, outputArray, 0, "");

        // Prepare for display
        prepareString(outputArray, 0, 0);

        // Display results
        $("#output").hide().html(outputString).fadeIn();
    });
});

var outputArray;
var outputString;
var bullet = "-";

//j only needed here for "depth", to get right amount of pre-line dashes
function prepareString(arr, i, j) {
    while (i < arr.length) {
        if (arr[i].constructor === Array) {
            j++;
            prepareString(arr[i], 0, j);
            j--;
        }
        else {
            var bull = (j == 0 ? "" : bullet.repeat(j) + " ");
            outputString += bull + arr[i] + "\n";
        }
        i++;
    }
}

function convertString(str, outArr, i, strCurr) {

    // Loop for each major number (each row in the table)  
    while (i < str.length) {

        // If a delimiter has been hit 
        if (str[i] == "(" || str[i] == "," || str[i] == ")") { 
            // If string builder has a value 
            if (strCurr.length > 0) { 
                // Push to output and reinitialize string builder 
                outArr.push(strCurr);
                strCurr = ""; 
            } 
        } 

        // If sub array start
        if (str[i] == "(") {
            // Create a new array
            var subArr = [];
            outArr.push(subArr);

            // Recurse into subarray
            i = convertString(str, subArr, i + 1, strCurr);
        }
        // If array end, exit recursive call / loop
        else if (str[i] == ")") {
            return i + 1;
        }
        // No action on comma, could be inverted and swapped with next else to reduce code
        else if (str[i] == ",") {
        }
        // Alphabetic character
        else {
            strCurr += str[i];
        }
        i++;
    }

    return i;
}
