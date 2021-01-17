/*
array in = ["Wheel_2", "Wheel_3", "Wheel_4", "Steering Wheel", "WheelBase"]
array out = {"Wheel": {_: {2,3,4}, Base}, Steering Wheel}
*/
const testArray = ["Wheel_2", "Wheel_3", "Wheel_4", "Steering Wheel", "WheelBase"];

var readSlices = []; //the parts of the array already converted completely into prefix groups
var prefixes = [];
var cmpStr = ""; //compare string
var rootId = 0;
var sliceIndex = 0; //the index of the substring slice for the cmpStr

var mtchLst = []; //our list of matches for different prefixes of this element
var lngMtchLst = []; //the most matched prefixes get put here for sorting

//compare contents of an array to build a tree of prefixes
function growLCPTree(array, index, cmpStr){
    //if the compare string is blank, make one from the first index of list
    if (cmpStr == "" || cmpStr == null || cmpStr == undefined ) {
        var cmpStr = array[index].slice(0, 2) //get first 2 chars of index of the array
        console.log("Blank cmpStr set:", cmpStr, "\n")
    }

    //go through all of the array comparing the first 2 characters
    array.forEach(function(e, index, array){
        let len = cmpStr.length;
        console.log("test: [cmpStr] ",cmpStr ," == [slice]", e.slice(0, len), "?");

        //check for match
        if(cmpStr == e.slice(0, len)) {
            console.log("\nMatch found, commencing length check")

            let arr2 = array;
            let eleCmp = array[index];
            arr2.splice(index, 1);

            //add the match obj to the match list
            mtchLst.push(
                {
                    "element": e, //ele from the main data
                    "index": index, //index of the ele from main data
                    "prefixes" : [
                        {
                            "prefix": cmpStr,
                            "matches": 1
                        }
                    ]
                }
            )

            console.log(mtchLst[0].prefixes)
            console.log("Finding LCP of: ", eleCmp)
            
            //

            arr2.forEach(e2 => {
                console.log("Nested test: [cmpStr] ",cmpStr ," == [slice]", e2.slice(0, len), "?");
                if(cmpStr == e2.slice(0, len)){
                    console.log("result: yes, valid prefix found")
                    //e slice is a valid prefix as there was more than 1 match

                    //add prefix as new key to list of prefixes
                    console.log("Adding prefix: ", cmpStr)
                    prefixes.push({cmpStr})
                } else {
                    console.log("result: no")
                }
            })

        } else {
            //loop at end with no match, add arr index as unique and remove from list
            if (index === array.length - 1) {
                let unq = array[index]
                prefixes.push({unq})
                console.log("Adding element as unique: ", unq)
            }
        }
        
    })
}

//Example
//var testData = testArray.sort() //sometimes may be quicker to sort through alphabetically first for long lists
var testData = testArray
console.log("my test data:", testData)
growLCPTree(testData, 0, "");
console.log("Finished prefixes list: ", prefixes)