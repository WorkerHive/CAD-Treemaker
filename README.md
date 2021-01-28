# CAD-Treemaker
 Input CAD objects of named parts. Outputs a tree of associated parts.

 How to use:

 1. Get the list of part names you want to prefix-trie-ify from your obj.

 const testArray = ["Wheel_2", "Wheel_3", "Wheel_4", "Steering Wheel", "WheelBase"];



 2. Make our Trie:
 
var trie = new Trie();



3. Add part names to trie:

testArray.forEach(e => {
  trie.insert(e)
})



4. Squash our trie tree into a prefix tree:

squashTrie(trie)



5. Pull the data out of the prefix tree into a JSON-like obj:

var myObj = {};
var refList = [];
readAndAdd(trie, myObj, refList)




6. Example data of the above:
{
  Wheel: { 
        _: {
            '2': {},
            '3': {},
            '4': {}
        },
        Base: {} 
    },
  'Steering Wheel': {}
}

