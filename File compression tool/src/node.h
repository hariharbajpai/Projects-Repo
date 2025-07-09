// node.h
#ifndef NODE_H
#define NODE_H

/**
 * Node structure for Huffman Tree
 * Each node contains:
 * - ch: character (for leaf nodes) or '\0' (for internal nodes)
 * - freq: frequency of the character or sum of frequencies for internal nodes
 * - left: pointer to left child node
 * - right: pointer to right child node
 */
struct Node {
    char ch;        // Character stored in the node (leaf nodes only)
    int freq;       // Frequency of the character or combined frequency
    Node* left;     // Pointer to left child
    Node* right;    // Pointer to right child

    /**
     * Constructor to create a new node
     * @param c Character to store (use '\0' for internal nodes)
     * @param f Frequency value
     */
    Node(char c, int f);
    
    /**
     * Destructor to ensure proper cleanup
     */
    ~Node();

    /**
     * Check if this node is a leaf node (has no children)
     * @return true if node is a leaf, false otherwise
     */
    bool isLeaf() const;
    
    /**
     * Copy constructor (deleted to prevent accidental copying)
     */
    Node(const Node&) = delete;
    
    /**
     * Assignment operator (deleted to prevent accidental copying)
     */
    Node& operator=(const Node&) = delete;
};

#endif // NODE_H
