// trie node and setup from https://gist.github.com/tpae/72e1c54471e88b689f85ad2b3940a8f0 [accessed 18/01/2021]

export function TrieNode(key) {
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

export function Trie() {
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
export function findAllWords(node, arr) {
  // base case, if node is at a word, push to output
  if (node.end) {
    arr.unshift(node.getWord());
  }

  // iterate through each children, call recursive findAllWords
  for (var child in node.children) {
    findAllWords(node.children[child], arr);
  }
}

export function doesPropExist(node, property) {
  if (node[property] === undefined || node[property] === null) {
    return false;
  } else {
    return true
  }
}

//squash all chars into char groups based on number of children 
export function squashTrie(trieTree) {
  if (doesPropExist(trieTree, "root")) {
    var children = trieTree.root.children;
  } else {
    //Not root but has children prop
    var children = trieTree.children;
  }

  for (var x in children) {
    var node = children[x];
    let len = Object.keys(node.children).length;
    //console.log(node)

    //if a word ends on that letter skip
    //console.log("\nNode end?: ", node.end)
    if (node.end) {
      return;
    }

    //if theres only 1 child in tree, squish
    if (len == 1) {
      let gChild = node.children[Object.keys(node.children)[0]]
      node.key += gChild.key; //node key update
      //console.log("Node key after update: ", node.key)
      gChild.parent = node; //reference fix for g child and parent
      node.children = gChild.children;//node children clone
      gChild = null; //remove child from trie, has been squished into parent
      squashTrie(trieTree); //loop
    }

    //if there are more than 1 child, check to see if they have chains, for each chain squish
    // for each end
    if (len > 1) {
      //console.log("len was greater than 1! New node ")

      //recursion on node after key pop
      squashTrie(node)
    }
  }
}

//see third answer on: https://stackoverflow.com/questions/18936915/dynamically-set-property-of-nested-object [[accessed 27/01/2021]]
//path is list of key names, reduce goes through path from 0 -> last ele
//where a = prev val of .reduce func
//  b = curr val of the 
// level = index of arr
export function setDeep(obj, path, value, setrecursively = false) {
  path.reduce((a, b, level) => {
    if (setrecursively && typeof a[b] === "undefined" && level !== path.length) {
      a[b] = {};
      return a[b];
    }

    if (level === path.length) {
      a[b] = value;
      return value;
    }
    return a[b];
  }, obj);
}

export function readAndAdd(squishedTrie, obj, refList) {
  if (doesPropExist(squishedTrie, "root")) {
    var children = squishedTrie.root.children;
  } else {
    var children = squishedTrie.children;
  }

  //for each node in the children list
  for (var x in children) {
    if (doesPropExist(squishedTrie, "root")) {
      refList = []; //reset reflist as we are at the top of the tree
    }
    var node = children[x];
    let len = Object.keys(node.children).length;

    console.log("\nnode key: ", node.key);
    console.log("children: ", len);
    //no children, leaf node, dont push onto reflist
    if (len == 0) {
      // add key as string into obj
      console.log("reflist: ", refList);
      refList.push(node.key)
      setDeep(obj, refList, "", true);
      refList.pop(node.key)
      return;
    }

    //has children, loop
    if (len >= 1) {
      refList.push(node.key)
      //push ref for child index
      for (var gChild in node.children) {
        //add every child key to add obj
        refList.push(node.children[gChild].key)
        setDeep(obj, refList, "", true);
        refList.pop(node.children[gChild].key)
      }

      readAndAdd(node, obj, refList);
      refList.pop(node.key)
    }
  }

}

// check contains method
//console.log(trie.contains("helium"));  // false
//console.log(trie.contains("kickass")); // false
//console.log(trie.contains("Wheel_2")); // true
//console.log(trie.contains("Wheel_3")); // true

// check find method
//console.log(trie.find("Wheel_"));  // [ 'Wheel_4', 'Wheel_3', 'Wheel_2' ]
//console.log(trie.find("Stee")); // [ 'Steering Wheel' ]

//console.log("Trie node: \n", trie)
//console.log("trieNode after recursion: ", trie.root.children["W"])
//console.log(trie.root.children["S"])
