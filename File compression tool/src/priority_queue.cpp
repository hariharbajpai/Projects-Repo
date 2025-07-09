// priority_queue.cpp
#include "priority_queue.h"
using namespace std;

/**
 * Comparison operator for priority queue (non-const version)
 * 
 * This operator creates a min-heap behavior for the priority queue by returning true
 * when node 'a' should have lower priority than node 'b' (i.e., when a->freq > b->freq).
 * 
 * In Huffman coding algorithm:
 * - Nodes with lower frequencies should be processed first (higher priority)
 * - This ensures optimal tree construction where frequent characters get shorter codes
 * - Since std::priority_queue is a max-heap by default, we invert the comparison
 * 
 * @param a First node pointer to compare
 * @param b Second node pointer to compare
 * @return true if node 'a' has higher frequency (lower priority) than node 'b'
 */
bool Compare::operator()(Node* a, Node* b) {
    // Return true if 'a' has higher frequency than 'b'
    // This creates min-heap behavior (lower frequency = higher priority)
    return a->freq > b->freq;
}

/**
 * Comparison operator for priority queue (const version)
 * 
 * Provides the same functionality as the non-const version but with const parameters.
 * This version can be used when working with const Node pointers and provides
 * better const-correctness for the comparison operation.
 * 
 * @param a First const node pointer to compare
 * @param b Second const node pointer to compare
 * @return true if node 'a' has higher frequency (lower priority) than node 'b'
 */
bool Compare::operator()(const Node* a, const Node* b) const {
    // Return true if 'a' has higher frequency than 'b'
    // This creates min-heap behavior (lower frequency = higher priority)
    return a->freq > b->freq;
}
