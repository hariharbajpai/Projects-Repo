# Huffman Coding File Compression Tool

A complete implementation of the Huffman coding algorithm in C++ for lossless text file compression. This project demonstrates data structures, algorithms, and file I/O operations through an efficient compression technique.

## 🚀 Features

- **Lossless Compression**: Compresses text files without losing any information
- **Optimal Encoding**: Uses Huffman algorithm to assign shorter codes to frequent characters
- **Memory Efficient**: Proper memory management with no memory leaks
- **Error Handling**: Robust error checking for file operations and edge cases
- **Compression Statistics**: Displays original size, compressed size, and compression ratio
- **Cross-Platform**: Works on Windows, Linux, and macOS

## 📁 Project Structure

```
File compression tool/
├── README.md              # Project documentation
├── huffman.exe            # Compiled executable
├── input/                 # Input directory
│   └── sample.txt         # Sample input file
├── output/                # Output directory
│   └── encoded.txt        # Generated compressed file
└── src/                   # Source code directory
    ├── main.cpp           # Main program entry point
    ├── huffman.h          # Huffman algorithm header
    ├── huffman.cpp        # Huffman algorithm implementation
    ├── node.h             # Tree node structure header
    ├── node.cpp           # Tree node implementation
    ├── priority_queue.h   # Custom comparator header
    ├── priority_queue.cpp # Custom comparator implementation
    ├── bit_utils.h        # Bit manipulation utilities header
    └── bit_utils.cpp      # Bit manipulation utilities implementation
```

## 🛠️ How to Build and Run

### Prerequisites
- C++ compiler with C++11 support (g++, clang++, or MSVC)
- Windows, Linux, or macOS operating system

### Compilation
```bash
g++ src/*.cpp -o huffman.exe
```

### Execution
```bash
.\huffman.exe
```

## 📖 How It Works

### Algorithm Overview
1. **Frequency Analysis**: Counts the occurrence of each character in the input file
2. **Tree Construction**: Builds a binary Huffman tree using a priority queue
3. **Code Generation**: Generates variable-length binary codes for each character
4. **Text Encoding**: Replaces each character with its corresponding Huffman code
5. **File Output**: Saves the compressed binary string to the output file

### Example Output
```
Compression completed successfully!
Original size: 10936 bits
Encoded size: 7842 bits
Compression ratio: 28.31%
```

## 🔧 Usage

### Default Operation
The program automatically:
- Reads from `input/sample.txt`
- Compresses the content using Huffman coding
- Saves the result to `output/encoded.txt`
- Displays compression statistics

### Custom Input Files
To use a different input file:
1. Place your text file in the `input/` directory
2. Modify line 10 in `src/main.cpp`:
   ```cpp
   ifstream input("input/your_file.txt");
   ```
3. Recompile and run

## 📊 Performance

### Compression Efficiency
- **English Text**: Typically achieves 20-40% compression
- **Repetitive Text**: Can achieve 60-80% compression
- **Random Text**: May show minimal or no compression

### Time Complexity
- **Building Frequency Table**: O(n)
- **Building Huffman Tree**: O(k log k) where k is unique characters
- **Encoding**: O(n)
- **Overall**: O(n + k log k)

### Space Complexity
- **Tree Storage**: O(k) where k is unique characters
- **Code Table**: O(k)
- **Overall**: O(k)

## 🧪 Testing

### Basic Test
```bash
# Compile the project
g++ src/*.cpp -o huffman.exe

# Run with sample file
.\huffman.exe
```

### Edge Cases Tested
- ✅ Empty input files
- ✅ Single character files
- ✅ Files with all unique characters
- ✅ Large text files
- ✅ File I/O error handling

### Sample Test Files
Create these test files in the `input/` directory:

**test_simple.txt**:
```
hello world hello
```

**test_repetitive.txt**:
```
aaaaaabbbbbbccccccdddddd
```

**test_unique.txt**:
```
abcdefghijklmnopqrstuvwxyz
```

## 🔍 Code Structure

### Core Components

#### `Node` Structure
- Represents nodes in the Huffman tree
- Contains character, frequency, and child pointers
- Implements leaf node detection

#### `Huffman` Functions
- `buildFrequencyTable()`: Analyzes character frequencies
- `buildHuffmanTree()`: Constructs the optimal tree
- `generateCodes()`: Creates binary codes for characters
- `encode()`: Compresses text using generated codes
- `decode()`: Decompresses encoded text (available)
- `freeTree()`: Manages memory cleanup

#### `Priority Queue`
- Custom comparator for min-heap behavior
- Ensures nodes with lower frequencies have higher priority

#### `Bit Utils`
- Utility functions for bit manipulation
- Conversion between characters and binary strings

## 🚨 Error Handling

The program handles various error conditions:

- **File Not Found**: `Error: Could not open input file.`
- **Empty Input**: `Error: Input file is empty.`
- **Output Error**: `Error: Could not open output file.`
- **Memory Issues**: Proper cleanup prevents memory leaks
- **Invalid Encoding**: Runtime error detection

## 🔧 Customization

### Modifying Input/Output Paths
Edit `src/main.cpp` lines 10-11:
```cpp
ifstream input("path/to/your/input.txt");
ofstream output("path/to/your/output.txt");
```

### Adding Debug Information
Compile with debug flags:
```bash
g++ -g -DDEBUG src/*.cpp -o huffman_debug.exe
```

### Binary Output
The current implementation outputs text representation of binary codes. For actual binary file output, modify the file writing section in `main.cpp`.

## 📈 Future Enhancements

- [ ] Binary file output format
- [ ] Decompression utility
- [ ] GUI interface
- [ ] Support for multiple file formats
- [ ] Parallel processing for large files
- [ ] Compression ratio optimization
- [ ] File header with metadata

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created as a demonstration of Huffman coding algorithm implementation in C++.

## 🙏 Acknowledgments

- Donald Huffman for the original algorithm
- C++ Standard Library for data structures
- Community feedback and testing

---

**Note**: This implementation is designed for educational purposes and demonstrates core concepts of data compression, binary trees, and algorithm optimization.