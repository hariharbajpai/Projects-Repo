// node.cpp
#include "node.h"
using namespace std;

/**
 * Constructor for Node
 * Initializes a new node with character and frequency
 * Sets left and right pointers to nullptr
 * 
 * @param c Character to store (use '\0' for internal nodes)
 * @param f Frequency value for this character/node
 */
Node::Node(char c, int f) : ch(c), freq(f), left(nullptr), right(nullptr) {
    // Constructor body is empty as initialization is done in member initializer list
}

/**
 * Destructor for Node
 * Note: This destructor does NOT delete child nodes
 * Child nodes should be deleted by the freeTree() function in huffman.cpp
 * to avoid double deletion and maintain proper tree cleanup order
 */
Node::~Node() {
    // Destructor intentionally empty
    // Child nodes are managed by freeTree() function
}

/**
 * Check if this node is a leaf node
 * A leaf node has no children (both left and right are nullptr)
 * Leaf nodes contain actual characters, while internal nodes are used for tree structure
 * 
 * @return true if node is a leaf (no children), false if it's an internal node
 */
bool Node::isLeaf() const {
    return !left && !right;
}
