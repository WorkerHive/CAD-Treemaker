
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

//Our starting Id
const rootId = 0;

//the tree node object that we will be making the new tree structure
// out of
class TreeNode {
    constructor(id, parent, children) {
        this.id = id,
        this.parent = parent,
        this.children = children
      }
    
    get id() {return this.id; }
    get parent() {return this.parent}
    get children(){return this.children}

    set addBranch(branch){
        this.children = this.children.push(branch);
    }
}

//Our Parent Node
export function rootTree(g, rootId){
    let root = Treenode(rootId, null, [])
    return GrowTree(g, root, null)
}

//grow a tree from the input .glb file from it's contents
export function GrowTree(g, node, tree){
    g[node.id].forEach(twig => {
        if (tree !== null && twig.id == tree.id)
        {
            //continue
        } else {
            branch = TreeNode(twig.id, node, [])
            node.addBranch(branch)
            GrowTree(g, twig, node)
        }
    });
    return node
}


