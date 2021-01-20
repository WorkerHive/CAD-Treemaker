// trie node and setup from https://gist.github.com/tpae/72e1c54471e88b689f85ad2b3940a8f0 [accessed 18/01/2020]

function TrieNode(key) {
  this.key = key; //node value e.g. 'a'
  this.parent = null;
  this.children = {};
  this.end = false; //if a word ends on this node
}

// go through parents to get the word.
TrieNode.prototype.getWord = function () {
  var output = [];
  var node = this;

  while (node !== null) {
    output.unshift(node.key);
    node = node.parent;
  }

  return output.join('');
};

function Trie() {
  this.root = new TrieNode(null);
}

// inserts a word into the trie.
// time complexity: O(k), k = word length
Trie.prototype.insert = function (word) {
  var node = this.root; // we start at the root

  // for every character in the word
  for (var i = 0; i < word.length; i++) {
    // check to see if character node exists in children.
    if (!node.children[word[i]]) {
      // if it doesn't exist, we then create it.
      node.children[word[i]] = new TrieNode(word[i]);

      // we also assign the parent to the child node.
      node.children[word[i]].parent = node;
    }

    // proceed to the next depth in the trie.
    node = node.children[word[i]];

    // finally, we check to see if it's the last word.
    if (i == word.length - 1) {
      // if it is, we set the end flag to true.
      node.end = true;
    }
  }
};

// check if it contains a whole word.
// time complexity: O(k), k = word length
Trie.prototype.contains = function (word) {
  var node = this.root;

  // for every character in the word
  for (var i = 0; i < word.length; i++) {
    // check to see if character node exists in children.
    if (node.children[word[i]]) {
      // if it exists, proceed to the next depth of the trie.
      node = node.children[word[i]];
    } else {
      // doesn't exist, return false since it's not a valid word.
      return false;
    }
  }

  // we finished going through all the words, but is it a whole word?
  return node.end;
};

// returns every word with given prefix
// time complexity: O(p + n), p = prefix length, n = number of child paths
Trie.prototype.find = function (prefix) {
  var node = this.root;
  var output = [];

  // for every character in the prefix
  for (var i = 0; i < prefix.length; i++) {
    // make sure prefix actually has words
    if (node.children[prefix[i]]) {
      node = node.children[prefix[i]];
    } else {
      // there's none. just return it.
      return output;
    }
  }

  // recursively find all words in the node
  findAllWords(node, output);

  return output;
};

// recursive function to find all words in the given node.
function findAllWords(node, arr) {
  // base case, if node is at a word, push to output
  if (node.end) {
    arr.unshift(node.getWord());
  }

  // iterate through each children, call recursive findAllWords
  for (var child in node.children) {
    findAllWords(node.children[child], arr);
  }
}

function doesPropExist(node, property) {
  if (node[property] === undefined || node[property] === null) {
    return false;
  } else {
    return true
  }
}

//for a given trie make an object map of vals which squash the vals of all consecutive nodes into
// longest common prefixes [LCP]. If a word is unique, it will appear in full as it is it's own LCP
/*function squashTrie(trie) {

  if (doesPropExist(trie, "root")) {
    //input node is root
    var children = trie.root.children;
    //console.log("Input was trie. Children: ", children)
  } else {
    var children = trie.children;
    //console.log("Input was node. Children: ", children)
  }

  //for every child in the given node
  for (var child in children) {

    //get child node rather than key ref
    let node = children[child]

    console.log("this is the node: ", node);
    console.log("this is the child: ", child)

    //if the child has children
    if (doesPropExist(node, "children")) {
      console.log("child of node: ", node.children)

      //and there is only one child
      if (Object.keys(node.children).length == 1) {
        //squash val into curr node val
        let val = node.children.key;
        node.key += val
        console.log("val added: ", val)
        console.log("new key for curr node: ", node.key)

        //copy children of node child
      }
    }
  }
}*/

function squashTrie(trieNode, childIndex) {
  if (doesPropExist(trieNode, "root")) {
    //input node is root, get first child with 1 char in val
    var children = trieNode.root.children;
  } else {
    var children = trieNode.children;
    //console.log("Input was node. Children: ", children)
  }

  //console.log(children)
  //console.log((Object.keys(children["W"]).length == 1))
  //console.log(Object.keys(children["W"].children).length)
  let i;
  if (i == undefined || i == null){
    i = 0;
  }
  console.log(i)
  for (var child in children) {
    
    var node = children[child];
    let len = Object.keys(node.children).length;
    let gChild = node.children[Object.keys(node.children)[i]]
    
    //if a word ends on that letter skip
    if(node.end){
      return;
    }

    if (len == 1){
      //node key update
      console.log("node.key before: ", node.key)
      node.key += gChild.key;
      console.log("node.key after: ", node.key)

      //reference fix for g child and parent
      gChild.parent = node;
      node.parent[Object.keys(node.parent)[i]] = node;

      //node children clone
      //console.log("node.children before: ", node.children)
      node.children = gChild.children;
      //console.log("node.children after: ", node.children)

      //remove child from trie
      //console.log("gChild before: ", gChild)
      gChild = null;
      //console.log("gChild after: ", gChild)

      //loop
      console.log(node)
      squashTrie(trieNode);
    } else {
      if (len > 1){
        //next child if more than one child
        return;
      } else {
        //no next to go to, break from recursion
        return;
      }
    }
  }

  console.log("trieNode after recursion: ", node)
}

// instantiate our trie
var trie = new Trie();

//out test data
const testArray = ["Wheel_2", "Wheel_3", "Wheel_4", "Steering Wheel", "WheelBase"];

// insert test data values
testArray.forEach(e => {
  trie.insert(e)
})

// check contains method
//console.log(trie.contains("helium"));  // false
//console.log(trie.contains("kickass")); // false
//console.log(trie.contains("Wheel_2")); // true
//console.log(trie.contains("Wheel_3")); // true

// check find method
//console.log(trie.find("Wheel_"));  // [ 'Wheel_4', 'Wheel_3', 'Wheel_2' ]
//console.log(trie.find("Stee")); // [ 'Steering Wheel' ]

squashTrie(trie)