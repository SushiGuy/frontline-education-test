$(function () {
    // JHeiner 8/31/2017: Note, if single quotes in JavaScript is preferred by reviewing developer I am happy to switch! :D
    $("#header p span").fadeIn(750, "swing", function () {
        // Animation complete, do next eye candy
        $("#main").fadeIn("slow");
    });

    $("#startButton").on("click", function () {
        var inputString = $("#inputString").val();
        // Initialize global objects (prevents result duplicate stacking after first run)
        outputString = "";

        // Trim off first paren (parens trigger next recursion, but we want to start with level 0)
        inputString = inputString.substring(1, inputString.length);

        // Main
        convertString(inputString, 0, 0, "");

        // Display results
        $("#output").hide().html(outputString).fadeIn();
    });
});

var outputString;
var bullet = "-";

function convertString(str, i, j, strCurr) {

    // Loop for each major number (each row in the table)  
    while (i < str.length) {

        // If a delimiter has been hit 
        if (str[i] == "(" || str[i] == "," || str[i] == ")") { 
            // If string builder has a value 
            if (strCurr.length > 0) { 
                // Push to output and reinitialize string builder 
                // arr.push(strCurr);
                var bull = (j == 0 ? "" : bullet.repeat(j) + " ");
                outputString += bull + strCurr + "\n";
                strCurr = ""; 
            } 
        } 

        // If sub array start
        if (str[i] == "(") {
            j++;

            // Recurse into subarray
            i = convertString(str, i + 1, j, strCurr);

            // After recursion returns, decrement depth
            j--;
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
