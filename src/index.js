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

function rootNode(array, rootId){
    let rootSlice = array[rootId]
    console.log("root slice:", rootSlice)
    return findlcp(array, rootSlice, cmpStr)
}

//find longest common prefix and make a tree like structure from them.
function findlcp(array, node, cmpStr){

    if (cmpStr == "" || cmpStr == null) {
        //set to node val
        var lcp = node

        //add cmpStr to "read list"
        readSlices.push({"val":cmpStr, "instances":0})
    }
    
    //get longest prefix
    console.log("slice:", node)
    

    //check through data for a prefix match, add if true
    array.forEach(nodeSlice => {
    let len = nodeSlice.length
    console.log("lcp candidate:", cmpStr)
        //set string if match
        console.log("test: ",nodeSlice ," == ", node.slice(0, len), "?")
        if(nodeSlice == node.slice(0, len)) {
            lcp = nodeSlice //new potential lcp
                //add lcp to 
            console.log("result: yes")
            console.log("success! Next word. \n")
        } else {
            //lcp didnt match
            console.log("result: no")
            console.log("reducing tested string by last char")
            lcp = nodeSlice.substring(0, len - 1);
            console.log("new slice:", lcp)
            findlcp(array, nodeSlice, lcp)
        }
    });
    console.log("longest common prefix: ", lcp)
}

//Run example
var myGraph = rootNode(testArray, rootId, null);