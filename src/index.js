/*
array in = ["Wheel_2", "Wheel_3", "Wheel_4", "Steering Wheel", "WheelBase"]
array out = {"Wheel": {_: {2,3,4}, Base}, Steering Wheel}
*/
testArray = ["Wheel_2", "Wheel_3", "Wheel_4", "Steering Wheel", "WheelBase"]
//our list of prefixes
var prefixes = []
//compare string
var cmpStr = ""
//the parts of the array already accessed
var readSlices = []
var rootId = 0

function rootNode(prefixes, rootId){
    let rootSlice = prefixes[rootId]
    console.log("root slice:", rootSlice)
    return findlcp(prefixes, rootSlice, cmpStr)
}

//find longest common prefix and make a tree like structure from them.
function findlcp(prefixes, node, cmpStr){
    //init string if blank
    if (cmpStr == ""){
        console.log("node:", node)
        //current longest common prefix
        let lcp = ""
        let slice = 
        //get longest prefix
        [...node].forEach(char =>{
            if (char.length() > lcp){
                lcp = char;
            }
        })
        console.log("longest common prefix: ", lcp)
        
    } else {
        //loop through list of words to find longest prefix
        prefixes.forEach(prefix => {
            //set string
        });
    }
}

//Run example
var myGraph = rootNode(testArray, rootId);