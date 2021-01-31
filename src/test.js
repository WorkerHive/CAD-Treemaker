import {
    Trie,
    squashTrie,
    readAndAdd
} from './index.js'

// instantiate our trie
var trie = new Trie();

//out test data
const testArray = ["Wheel_2", "Wheel_3", "Wheel_4", "Steering Wheel", "WheelBase"];

// insert test data values
testArray.forEach(e => {
  trie.insert(e)
})

squashTrie(trie) //note that after squashing the trie the contains and find methods no longer work

var myObj = {};
var refList = [];
readAndAdd(trie, myObj, refList)

console.log("\nMy obj after inserting vals from grouped trie: \n", myObj)


//wrapped into one, simply pass in the array of strings and they will be turned into a prefix obj
function doAll(objArrData){
    let trie2 = new Trie();

    objArrData.forEach(e => {
        trie2.insert(e)
    })

    squashTrie(trie2)

    let obj2 = {};
    let refList2 = [];
    readAndAdd(trie2,obj2,refList2);

    return obj2;
}