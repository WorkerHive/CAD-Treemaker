/*
array in = ["Wheel_2", "Wheel_3", "Wheel_4", "Steering Wheel", "WheelBase"]
array out = {"Wheel": {_: {2,3,4}, Base}, Steering Wheel}
*/

//the parts of the array already accessed
var readSlices = []

const testArray = ["Wheel_2", "Wheel_3", "Wheel_4", "Steering Wheel", "WheelBase"]
var prefixes = []
var cmpStr = "" //compare string
var rootId = 0

//find longest common prefix and make a tree like structure from them.
function findlcp(array, index, cmpStr){

    //if the compare string is blank, make one from the index of list
    if (cmpStr == "" || cmpStr == null || cmpStr ) {
        //set cmpStr to first entry in array
        var cmpStr = array[index]
        console.log("Blank cmpStr set:", cmpStr, "\n")
    }

    //loop through data for a prefix match
    array.forEach(function(e, index, array) {
        let len = e.length
        console.log("test: [cmpStr] ",cmpStr ," == [slice]", e.slice(0, len), "?")

        //check for match
        if(cmpStr == e.slice(0, len)) {
            
            //if another string found, add as prefix, build tree
            console.log("result: yes")
            console.log("outcome: Attempting loop.\n")

            let matchIndex = []
            //copy array
            let arr2 = array
            //remove entry at index
            arr2.splice(index, 1)
            console.log("new arr:", arr2)

            //loop through the rest of the array to try and find another match
            arr2.forEach(e2 => {
                console.log("Nested comparison on: [cmpStr] ",cmpStr ," == [slice]", e2.slice(0, len), "?")
                if(cmpStr == e2.slice(0, len)){
                    console.log("result: yes, valid prefix found")
                    //e slice is a valid prefix as 
                } else {
                    console.log("result: no")
                }
            })

        } else {
            //cmpstr didnt match the slice
            console.log("result: no")
            console.log("outcome: reducing tested string by last char")

            //reduce compared prefix by 1 char
            cmpStr = cmpStr.substring(0, (cmpStr.length - 1));
            console.log("new slice:", e)
            console.log("new string:", cmpStr)
            findlcp(array, e, cmpStr)
        }
    });
}

//Example
//var testData = testArray.sort() //sometimes may be quicker to sort through alphabetically first for long lists
var testData = testArray
console.log("my test data:", testData)

var newData = {}
var myGraph = findlcp(testData, 0, "");

//Look at this photoGRAPH
console.log("Finished LCP list: ", myGraph)