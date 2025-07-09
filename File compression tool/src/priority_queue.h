// priority_queue.h
#ifndef PRIORITY_QUEUE_H
#define PRIORITY_QUEUE_H

#include <vector>
#include "node.h"

using namespace std;

/**
 * Compare struct for priority queue used in Huffman tree construction
 * This comparator is used to create a min-heap based on node frequencies
 * 
 * In Huffman coding, we need nodes with lower frequencies to have higher priority
 * (appear at the top of the priority queue) to build an optimal tree
 */
struct Compare {
    /**
     * Comparison operator for priority queue
     * Returns true if node 'a' should have lower priority than node 'b'
     * 
     * Since std::priority_queue is a max-heap by default, we return true
     * when a->freq > b->freq to create a min-heap behavior
     * 
     * @param a First node to compare
     * @param b Second node to compare
     * @return true if 'a' has lower priority than 'b' (higher frequency)
     */
    bool operator()(Node* a, Node* b);
    
    /**
     * Alternative comparison function (const version)
     * Provides the same functionality but with const parameters
     * 
     * @param a First node to compare (const)
     * @param b Second node to compare (const)
     * @return true if 'a' has lower priority than 'b'
     */
    bool operator()(const Node* a, const Node* b) const;
};

#endif // PRIORITY_QUEUE_H
