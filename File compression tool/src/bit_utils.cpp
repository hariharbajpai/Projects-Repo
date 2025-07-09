// bit_utils.cpp
#include "bit_utils.h"
#include <bitset>
#include <stdexcept>
#include <iostream>
using namespace std;

/**
 * Convert a character to its 8-bit binary string representation
 * 
 * Uses std::bitset to convert the character to binary format.
 * The result is always exactly 8 characters long.
 * 
 * @param c Character to convert to binary
 * @return 8-character string representing the binary form of the character
 */
string toBinary(char c) {
    return bitset<8>(static_cast<unsigned char>(c)).to_string();
}

/**
 * Convert an 8-bit binary string back to a character
 * 
 * Validates input and converts binary string to character.
 * Throws exceptions for invalid input to ensure data integrity.
 * 
 * @param bits 8-character string containing only '0' and '1' characters
 * @return Character represented by the binary string
 * @throws std::invalid_argument if bits string is not exactly 8 characters
 * @throws std::invalid_argument if bits contains characters other than '0' or '1'
 */
char toChar(const string& bits) {
    // Validate input length
    if (bits.length() != 8) {
        throw invalid_argument("Bit string must be exactly 8 characters long");
    }
    
    // Validate input characters
    for (char bit : bits) {
        if (bit != '0' && bit != '1') {
            throw invalid_argument("Bit string must contain only '0' and '1' characters");
        }
    }
    
    return static_cast<char>(bitset<8>(bits).to_ulong());
}

/**
 * Convert a string of bits to a vector of bytes
 * 
 * Processes the bit string in chunks of 8 bits, converting each chunk
 * to a byte. If the input length is not a multiple of 8, it pads with zeros.
 * 
 * @param bits String of '0' and '1' characters
 * @return Vector of bytes representing the bit string
 */
vector<unsigned char> bitsToBytes(const string& bits) {
    vector<unsigned char> bytes;
    string paddedBits = padBits(bits);
    
    // Process 8 bits at a time
    for (size_t i = 0; i < paddedBits.length(); i += 8) {
        string byte = paddedBits.substr(i, 8);
        bytes.push_back(static_cast<unsigned char>(bitset<8>(byte).to_ulong()));
    }
    
    return bytes;
}

/**
 * Convert a vector of bytes to a string of bits
 * 
 * Converts each byte in the vector to its 8-bit binary representation
 * and concatenates them into a single bit string.
 * 
 * @param bytes Vector of bytes to convert
 * @return String of '0' and '1' characters representing the bytes
 */
string bytesToBits(const vector<unsigned char>& bytes) {
    string bits;
    
    for (unsigned char byte : bytes) {
        bits += bitset<8>(byte).to_string();
    }
    
    return bits;
}

/**
 * Pad a bit string to make its length a multiple of 8
 * 
 * Adds '0' bits to the end of the string if necessary to make
 * the total length a multiple of 8. This is useful for byte alignment.
 * 
 * @param bits String of '0' and '1' characters
 * @return Padded bit string with length as multiple of 8
 */
string padBits(const string& bits) {
    string padded = bits;
    size_t remainder = bits.length() % 8;
    
    if (remainder != 0) {
        size_t padding = 8 - remainder;
        padded.append(padding, '0');
    }
    
    return padded;
}
