/*
array in = ["Wheel_2", "Wheel_3", "Wheel_4", "Steering Wheel", "WheelBase"]
array out = {"Wheel": {_: {2,3,4}, Base}, Steering Wheel}
*/

//the parts of the array already accessed
//var readSlices = []

const testArray = ["Wheel_2", "Wheel_3", "Wheel_4", "Steering Wheel", "WheelBase"]
var prefixes = []
var cmpStr = "" //compare string
var rootId = 0

//find longest common prefix and make a tree like structure from them.
function findlcp(array, cmpStr){

    //if the compare string is blank, make one from first index of list
    if (cmpStr == "" || cmpStr == null) {
        //set cmpStr to first entry in array
        var cmpStr = array[0]
        console.log("New LCP candidate due to null cmpStr:", lcp)
    }

    //loop through data for a prefix match
    array.forEach(e => {
        let len = e.length
        console.log("lcp candidate:", cmpStr)
        console.log("test: [cmpStr] ",cmpStr ," == [slice]", e.slice(0, len), "?")

        //check for match
        if(cmpStr == e.slice(0, len)) {
            //lcp = nodeSlice //new potential lcp
            
            //if another string found, add as prefix, build tree

            //add lcp to list with count of 1


            console.log("result: yes")
            console.log("success! Attempting loop. \n")
        } else {
            //lcp didnt match
            console.log("result: no")
            console.log("reducing tested string by last char")

            //reduce compared prefix by 
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
                                                    var myGraph = findlcp(testData, "");

//Look at this photoGRAPH
console.log("Finished LCP list: ", myGraph)