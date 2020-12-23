
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
 * This process uses Depth-first search [DFS] to order the tree object output from the .glb input.
 */

//Our Parent Node
const TreeRoot;
const Seed = AmorphusTreeEntity

class TreeNode {
    constructor(id, parent, children) {
        this.id = id,
        this.parent = parent,
        this.children = children
      }

    id() {
        return this.id; 
    }

    parent() {
        return this.parent
    }

    children(){
        return this.children
    }
}

function GrowTree(tree){
    //process tree
    let processedtree = tree
    let branches = processedtree

    branches.forEach(twig => {
        // order the twigs
        twig
    });

}

var rootId = 1
function rootTree(g, rootId){
    let root = Treenode(rootId, null, [])
    return GrowTree(g, root, null)
}
