// bit_utils.h
#ifndef BIT_UTILS_H
#define BIT_UTILS_H

#include <string>
#include <vector>

using namespace std;

/**
 * Bit manipulation utilities for file compression operations
 * These functions provide conversion between characters and binary representations
 * Useful for encoding/decoding operations and bit-level file manipulation
 */

/**
 * Convert a character to its 8-bit binary string representation
 * 
 * This function takes a character and returns its binary representation
 * as a string of '0' and '1' characters. The result is always 8 bits long.
 * 
 * Example: toBinary('A') returns "01000001"
 * 
 * @param c Character to convert to binary
 * @return 8-character string representing the binary form of the character
 */
string toBinary(char c);

/**
 * Convert an 8-bit binary string back to a character
 * 
 * This function takes a string of '0' and '1' characters (exactly 8 bits)
 * and converts it back to the corresponding character.
 * 
 * Example: toChar("01000001") returns 'A'
 * 
 * @param bits 8-character string containing only '0' and '1' characters
 * @return Character represented by the binary string
 * @throws std::invalid_argument if bits string is not exactly 8 characters
 * @throws std::invalid_argument if bits contains characters other than '0' or '1'
 */
char toChar(const string& bits);

/**
 * Convert a string of bits to a vector of bytes
 * Useful for writing binary data to files
 * 
 * @param bits String of '0' and '1' characters (length should be multiple of 8)
 * @return Vector of bytes representing the bit string
 */
vector<unsigned char> bitsToBytes(const string& bits);

/**
 * Convert a vector of bytes to a string of bits
 * Useful for reading binary data from files
 * 
 * @param bytes Vector of bytes to convert
 * @return String of '0' and '1' characters representing the bytes
 */
string bytesToBits(const vector<unsigned char>& bytes);

/**
 * Pad a bit string to make its length a multiple of 8
 * Adds '0' bits to the end if necessary
 * 
 * @param bits String of '0' and '1' characters
 * @return Padded bit string with length as multiple of 8
 */
string padBits(const string& bits);

#endif // BIT_UTILS_H
