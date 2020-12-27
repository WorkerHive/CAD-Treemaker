
/*
PSEUDO CODE

class Treenode:
    int id;
    Treenode parent;
    Treenode [] children;

function rootTree(g, rootId = 0):
    root = Treenode(rootId, null, [])
    return buildTree(g, root, null)

function buildTree(g, node, parent):
    for child in g[node.id]:
        if parent != null and childId == parent.id:
            continue
        child = Treenode(childId, node, [])
        node.children.add(child)
        buildTree(g, child, node)
    return node
*/

/*
 * The parent node is the node which we choose to order all other nodes by.
 * See: https://towardsdatascience.com/graph-theory-rooting-a-tree-fb2287b09779 [accessed: 23/12/2020]
 * 
 * This process uses Depth-first search [DFS, mentioned in article above] to order the tree object output from the .glb input.
 */

//Our starting Id
var rootId = 0;

//the tree node object that we will be making the new tree graph with
class TreeNode {
    constructor(id, parent, children) {
        this._id = id,
        this._parent = parent,
        this._children = [children]
      }
    
    //Setters
    set id(val) { return this._id = val};
    //set parent(p) {this.parent = p};
    //set children(c) {this.children = c};
    
    //Getters
    get id() {return this._id };
    //get parent() {return this.parent};
    //get children(){return this.children};

    /**
     * @param {TreeNode}
     * Add a node to the list of children nodes
     */
    set children(newChild){
        this._children = this._children.push(newChild);
    }
}

//Our Parent Node
// Use a process function to ensure 'g' is a flattened array of the .glb content
function rootTree(g, rootId){
    var root = new TreeNode(rootId, null, null);
    return growTree(g, root, null)
}

//grow a tree graph from the input .glb file from it's contents
//g is the graph input, tree is the tree output
function growTree(g, node, tree){
    let i = node.id
    console.log(g[i])
    g[i].forEach(twig => {
        console.log("twig:")
        console.log(twig)
        if (tree !== null && twig.id == tree.id)
        {
            return; //skip this iteration
        } else {
            let branch = new TreeNode(twig.id, node, null)
            node.children += branch;
            growTree(g, twig, node)
        }
    });
    return node;
}

// Instance tests
//var myNode = new TreeNode(rootId)
//console.log("Root ID:" + rootId);
//console.log("Treenode obj test" + TreeNode);
//console.log("Treenode instance test:" + myNode);

//usage:
// 1. set the root id, defualt is 0,
// 2. make the root node of the tree using rootTree
// 3. pass the root node into growTree


//Example:
// test data taken from: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#nodes-and-hierarchy [26/12/2020]
const testData = {
    "nodes": [
        {
            "name": "Car",
            "children": [1, 2, 3, 4]
        },
        {
            "name": "wheel_1"
        },
        {
            "name": "wheel_2"
        },
        {
            "name": "wheel_3"
        },
        {
            "name": "wheel_4"
        }        
    ]
}

//how the data should look like when cleaned down to a 1D array of objects
var cleanData = [
    {
        "name": "Car",
        "children": [1, 2, 3, 4]
    },
    {
        "name": "wheel_1"
    },
    {
        "name": "wheel_2"
    },
    {
        "name": "wheel_3"
    },
    {
        "name": "wheel_4"
    }        
]

//give objects ids
var i = 0;
cleanData.forEach(e => {
    if (e.id == null){
        e.id = i;
        i++;
    }
});

// 1. already appropriate
// 2. define tree root, note how the root node of the data is the first in the array
var myNode = rootTree(cleanData, rootId)




/*
export {
    rootId,
    TreeNode,
    rootTree,
    growTree
} */
