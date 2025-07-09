// huffman.h
#ifndef HUFFMAN_H
#define HUFFMAN_H

#include <string>
#include <unordered_map>
#include "node.h"

using namespace std;

/**
 * Huffman Coding Implementation
 * 
 * This header provides functions for implementing Huffman coding algorithm,
 * a lossless data compression technique that assigns variable-length codes
 * to characters based on their frequency of occurrence.
 * 
 * The algorithm works in the following steps:
 * 1. Build frequency table of characters
 * 2. Create Huffman tree using priority queue
 * 3. Generate binary codes for each character
 * 4. Encode/decode text using the generated codes
 */

/**
 * Build frequency table for characters in the input string
 * 
 * Analyzes the input string and counts the occurrence of each character.
 * The frequency table is used to build the optimal Huffman tree.
 * 
 * @param input Input string to analyze
 * @param freqTable Reference to unordered_map to store character frequencies
 */
void buildFrequencyTable(const string& input, unordered_map<char, int>& freqTable);

/**
 * Build Huffman tree from character frequency table
 * 
 * Creates a binary tree where:
 * - Leaf nodes represent characters
 * - Internal nodes represent merged frequencies
 * - Path from root to leaf represents the Huffman code
 * 
 * @param freqTable Map containing character frequencies
 * @return Pointer to root of Huffman tree, or nullptr if empty input
 */
Node* buildHuffmanTree(const unordered_map<char, int>& freqTable);

/**
 * Generate Huffman codes for each character
 * 
 * Recursively traverses the Huffman tree to generate binary codes:
 * - Left traversal adds '0' to the code
 * - Right traversal adds '1' to the code
 * - Leaf nodes store the final code for each character
 * 
 * @param root Root of Huffman tree
 * @param str Current code string being built during traversal
 * @param huffmanCode Reference to map to store character-to-code mappings
 */
void generateCodes(Node* root, const string& str, unordered_map<char, string>& huffmanCode);

/**
 * Encode text using Huffman codes
 * 
 * Converts input text to compressed binary string using the generated
 * Huffman codes. Each character is replaced by its corresponding binary code.
 * 
 * @param text Input text to encode
 * @param huffmanCode Map containing character-to-code mappings (const version)
 * @return Encoded binary string
 * @throws runtime_error if character not found in code table
 */
string encode(const string& text, const unordered_map<char, string>& huffmanCode);

/**
 * Decode binary string using Huffman tree
 * 
 * Reconstructs the original text from encoded binary string by traversing
 * the Huffman tree. '0' goes left, '1' goes right in the tree.
 * 
 * @param root Root of Huffman tree used for encoding
 * @param encoded Binary string to decode
 * @return Decoded original text
 * @throws runtime_error if invalid bits or corrupted encoding detected
 */
string decode(Node* root, const string& encoded);

/**
 * Free memory allocated for Huffman tree
 * 
 * Recursively deletes all nodes in the tree using post-order traversal
 * to ensure proper memory cleanup without memory leaks.
 * 
 * @param root Root of tree to delete (can be nullptr)
 */
void freeTree(Node* root);

/**
 * Calculate compression ratio
 * 
 * Utility function to calculate the compression ratio achieved
 * by comparing original and encoded sizes.
 * 
 * @param originalSize Size of original text in bits
 * @param encodedSize Size of encoded text in bits
 * @return Compression ratio as percentage (0-100)
 */
double calculateCompressionRatio(size_t originalSize, size_t encodedSize);

/**
 * Print Huffman codes
 * 
 * Utility function to display the generated Huffman codes
 * for debugging and analysis purposes.
 * 
 * @param huffmanCode Map containing character-to-code mappings
 */
void printHuffmanCodes(const unordered_map<char, string>& huffmanCode);

/**
 * Validate Huffman tree
 * 
 * Utility function to check if the Huffman tree is properly constructed
 * and all leaf nodes contain valid characters.
 * 
 * @param root Root of Huffman tree to validate
 * @return true if tree is valid, false otherwise
 */
bool validateHuffmanTree(Node* root);

#endif // HUFFMAN_H
