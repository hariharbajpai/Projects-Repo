// main.cpp
#include <iostream>
#include <fstream>
#include <unordered_map>
#include "huffman.h"
using namespace std;

int main() {
    // Open input and output files
    ifstream input("input/sample.txt");
    ofstream output("output/encoded.txt");

    // Check if input file opened successfully
    if (!input.is_open()) {
        cerr << "Error: Could not open input file.\n";
        return 1;
    }

    // Check if output file opened successfully
    if (!output.is_open()) {
        cerr << "Error: Could not open output file.\n";
        input.close();
        return 1;
    }

    // Read the entire file content into a string
    string text((istreambuf_iterator<char>(input)), istreambuf_iterator<char>());

    // Check if input file is empty
    if (text.empty()) {
        cerr << "Error: Input file is empty.\n";
        input.close();
        output.close();
        return 1;
    }

    // Build frequency table for characters in the input text
    unordered_map<char, int> freqTable;
    buildFrequencyTable(text, freqTable);

    // Build Huffman tree from frequency table
    Node* root = buildHuffmanTree(freqTable);

    // Check if Huffman tree was built successfully
    if (!root) {
        cerr << "Error: Failed to build Huffman tree.\n";
        input.close();
        output.close();
        return 1;
    }

    // Generate Huffman codes for each character
    unordered_map<char, string> huffmanCode;
    generateCodes(root, "", huffmanCode);

    // Encode the input text using Huffman codes
    string encodedText = encode(text, huffmanCode);
    
    // Write encoded text to output file
    output << encodedText;

    // Display compression statistics
    cout << "Compression completed successfully!\n";
    cout << "Original size: " << text.size() * 8 << " bits\n";
    cout << "Encoded size: " << encodedText.size() << " bits\n";
    cout << "Compression ratio: " << (1.0 - (double)encodedText.size() / (text.size() * 8)) * 100 << "%\n";

    // Clean up memory and close files
    freeTree(root);
    input.close();
    output.close();

    return 0;
}
