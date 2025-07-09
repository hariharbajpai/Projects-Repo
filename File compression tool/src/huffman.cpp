// huffman.cpp
#include "huffman.h"
#include "priority_queue.h"
#include <queue>
#include <stdexcept>
using namespace std;

/**
 * Build frequency table for characters in the input string
 * 
 * Counts the occurrence of each character in the input string
 * and stores the frequencies in the provided hash map.
 * 
 * @param input Input string to analyze
 * @param freqTable Reference to unordered_map to store character frequencies
 */
void buildFrequencyTable(const string& input, unordered_map<char, int>& freqTable) {
    // Clear the frequency table to ensure clean state
    freqTable.clear();
    
    // Count frequency of each character
    for (char c : input) {
        freqTable[c]++;
    }
}

/**
 * Build Huffman tree from character frequency table
 * 
 * Creates a binary tree where leaf nodes represent characters and
 * the path from root to leaf represents the Huffman code.
 * Uses a priority queue to build the optimal tree.
 * 
 * @param freqTable Map containing character frequencies
 * @return Pointer to root of Huffman tree, or nullptr if empty input
 */
Node* buildHuffmanTree(const unordered_map<char, int>& freqTable) {
    // Handle empty frequency table
    if (freqTable.empty()) {
        return nullptr;
    }
    
    // Create priority queue with custom comparator for min-heap behavior
    priority_queue<Node*, vector<Node*>, Compare> pq;

    // Create leaf nodes for each character and add to priority queue
    for (const auto& entry : freqTable) {
        pq.push(new Node(entry.first, entry.second));
    }
    
    // Handle single character case
    if (pq.size() == 1) {
        Node* singleNode = pq.top();
        pq.pop();
        
        // Create a dummy root with the single character as left child
        Node* root = new Node('\0', singleNode->freq);
        root->left = singleNode;
        root->right = nullptr;
        return root;
    }

    // Build Huffman tree by merging nodes with lowest frequencies
    while (pq.size() > 1) {
        // Get two nodes with lowest frequencies
        Node* left = pq.top(); 
        pq.pop();
        Node* right = pq.top(); 
        pq.pop();

        // Create merged internal node
        Node* merged = new Node('\0', left->freq + right->freq);
        merged->left = left;
        merged->right = right;
        
        // Add merged node back to priority queue
        pq.push(merged);
    }

    return pq.top();
}

/**
 * Generate Huffman codes for each character
 * 
 * Recursively traverses the Huffman tree to generate binary codes.
 * Left traversal adds '0', right traversal adds '1'.
 * 
 * @param root Root of Huffman tree
 * @param str Current code string being built
 * @param huffmanCode Reference to map to store character codes
 */
void generateCodes(Node* root, const string& str, unordered_map<char, string>& huffmanCode) {
    if (!root) return;
    
    // If leaf node, store the code for this character
    if (root->isLeaf()) {
        // Handle single character case - assign "0" if str is empty
        huffmanCode[root->ch] = str.empty() ? "0" : str;
        return;
    }
    
    // Recursively generate codes for left and right subtrees
    generateCodes(root->left, str + "0", huffmanCode);
    generateCodes(root->right, str + "1", huffmanCode);
}

/**
 * Encode text using Huffman codes
 * 
 * Converts input text to binary string using the generated Huffman codes.
 * Each character is replaced by its corresponding binary code.
 * 
 * @param text Input text to encode
 * @param huffmanCode Map containing character to code mappings
 * @return Encoded binary string
 */
string encode(const string& text, const unordered_map<char, string>& huffmanCode) {
    string encoded;
    encoded.reserve(text.length() * 4); // Reserve space for efficiency
    
    // Replace each character with its Huffman code
    for (char c : text) {
        auto it = huffmanCode.find(c);
        if (it != huffmanCode.end()) {
            encoded += it->second;
        } else {
            // This should not happen if frequency table was built correctly
            throw runtime_error("Character not found in Huffman code table: " + string(1, c));
        }
    }
    
    return encoded;
}

/**
 * Decode binary string using Huffman tree
 * 
 * Traverses the Huffman tree based on binary input to reconstruct
 * the original text. '0' goes left, '1' goes right.
 * 
 * @param root Root of Huffman tree
 * @param encoded Binary string to decode
 * @return Decoded original text
 */
string decode(Node* root, const string& encoded) {
    if (!root) {
        return "";
    }
    
    string decoded;
    decoded.reserve(encoded.length() / 4); // Reserve space for efficiency
    
    Node* current = root;
    
    // Handle single character tree case
    if (root->isLeaf()) {
        // For single character, each bit represents one occurrence
        for (char bit : encoded) {
            if (bit == '0') {
                decoded += root->ch;
            }
        }
        return decoded;
    }
    
    // Traverse tree based on encoded bits
    for (char bit : encoded) {
        if (bit == '0') {
            current = current->left;
        } else if (bit == '1') {
            current = current->right;
        } else {
            throw runtime_error("Invalid bit in encoded string: " + string(1, bit));
        }
        
        // Check for null pointer (corrupted tree or invalid encoding)
        if (!current) {
            throw runtime_error("Invalid encoding: reached null node during decoding");
        }
        
        // If we reach a leaf, we've decoded one character
        if (current->isLeaf()) {
            decoded += current->ch;
            current = root; // Reset to root for next character
        }
    }
    
    return decoded;
}

/**
 * Free memory allocated for Huffman tree
 * 
 * Recursively deletes all nodes in the tree using post-order traversal
 * to ensure child nodes are deleted before parent nodes.
 * 
 * @param root Root of tree to delete
 */
void freeTree(Node* root) {
    if (!root) return;
    
    // Post-order deletion: delete children first, then parent
    freeTree(root->left);
    freeTree(root->right);
    delete root;
}
