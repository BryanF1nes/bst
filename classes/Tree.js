import { Node } from './Node.js';

export class Tree {
    constructor(array) {
        this.sortedArray = mergeSort(array);
        this.root = this.buildTree(this.sortedArray);
    }

    buildTree(array, start = 0, end = array.length - 1) {
        if (start > end) return null;

        let mid = start + Math.floor((end - start) / 2);
        let root = new Node(array[mid]);

        root.left = this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);

        return root;
    }

    prettyPrint(node, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    insert(value, current = this.root) {
        const node = new Node(value);

        if (!current) {
            this.root = node;
            return;
        }

        if (value < current.value) {
            if (!current.left) {
                current.left = node;
            } else {
                this.insert(value, current.left);
            }
        } else if (value > current.value) {
            if (!current.right) {
                current.right = node;
            } else {
                this.insert(value, current.right);
            }
        }
    }

    remove(value, current = this.root) {
        if (!current) return null;

        if (value < current.value) {
            current.left = this.remove(value, current.left);
        } else if (value > current.value) {
            current.right = this.remove(value, current.right);
        } else {
            if (!current.left && !current.right) {
                return null;
            }

            if (!current.left) {
                return current.right;
            }

            if (!current.right) {
                return current.left;
            }

            let successor = current.right;
            while (successor.left) {
                successor = successor.left;
            }

            current.value = successor.value;
            current.right = this.remove(successor.value, current.right);
        }
        return current;
    }

    find(value, current = this.root) {
        if (!current) return null;

        if (value === current.value) {
            return current;
        }

        if (value < current.value) {
            return this.find(value, current.left);
        } else {
            return this.find(value, current.right);
        };
    }

    levelOrderForEach(callback, queue = [this.root]) {
        if (typeof callback !== 'function') {
            throw new Error("A callback is required.");
        }

        if (!queue.length) return;
        const current = queue.shift();
        if (!current) return;

        callback(current);

        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);

        this.levelOrderForEach(callback, queue);

    }

    inOrderForEach(callback, current = this.root) {
        if (typeof callback !== 'function') {
            throw new Error("A callback is required.");
        }

        if (!current) return;

        this.inOrderForEach(callback, current.left);
        callback(current);
        this.inOrderForEach(callback, current.right);
    }

    preOrderForEach(callback, current = this.root) {
        if (typeof callback !== 'function') {
            throw new Error("A callback is required.");
        }

        if (!current) return;

        callback(current);
        this.preOrderForEach(callback, current.left);
        this.preOrderForEach(callback, current.right);
    }

    postOrderForEach(callback, current = this.root) {
        if (typeof callback !== 'function') {
            throw new Error("A callback is required.");
        }

        if (!current) return;

        this.postOrderForEach(callback, current.left);
        this.postOrderForEach(callback, current.right);
        callback(current);
    }

    height(value) {
        const node = this.find(value);

        const computeHeight = (node) => {
            if (!node) {
                return -1;
            }

            const leftHeight = computeHeight(node.left);
            const rightHeight = computeHeight(node.right);

            if (leftHeight > rightHeight) {
                return 1 + leftHeight;
            } else {
                return 1 + rightHeight;
            }
        }

        return computeHeight(node);
    }

    depth(value) {
        const computeDepth = (value, current = this.root, currentDepth = 0) => {
            if (!current) {
                return null;
            }

            if (current.value === value) return currentDepth;
            if (current.value > value) {
                return computeDepth(value, current.left, currentDepth + 1);
            }
            if (current.value < value) {
                return computeDepth(value, current.right, currentDepth + 1);
            }

        }

        return computeDepth(value);
    }

    isBalanced(node = this.root) {
        if (!node) {
            return true;
        }

        const leftHeight = this.height(node.left.value);
        const rightHeight = this.height(node.right.value);

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return false;
        }

        return this.isBalanced(node.left) && this.isBalanced(node.right);
    }

    rebalance() {
        if (!this.root) return;

        const sortedValues = [];
        this.inOrderForEach((node) => {
            sortedValues.push(node.value);
        });

        this.root = this.buildTree(sortedValues);
    }
}

const mergeSort = (array) => {
    if (array.length <= 1) return array;
    const mid = Math.floor(array.length / 2);
    const leftHalf = array.slice(0, mid);
    const rightHalf = array.slice(mid, array.length);

    const sortedLeft = mergeSort(leftHalf);
    const sortedRight = mergeSort(rightHalf);

    const result = [];

    while (sortedLeft.length > 0 && sortedRight.length > 0) {
        if (sortedLeft[0] < sortedRight[0]) {
            result.push(sortedLeft.shift());
        } else if (sortedLeft[0] === sortedRight[0]) {
            result.push(sortedLeft.shift());
            sortedRight.shift();
        } else {
            result.push(sortedRight.shift());
        }
    }

    while (sortedLeft.length > 0) {
        result.push(sortedLeft.shift());
    }

    while (sortedRight.length > 0) {
        result.push(sortedRight.shift());
    }

    return result;
}


// testing
const random = [1, 13, 13, 5, 2, 5, 7, 6, 3, 14, 8, 9];
const tree = new Tree(random);
console.log(tree);

tree.insert(100);
tree.remove(5);
tree.prettyPrint(tree.root);
console.log(tree.find(14));

console.log("=================================================");

console.log(tree.height(13));

console.log("=================================================");

console.log(tree.depth(13));

console.log("=================================================");
console.log(tree.isBalanced());
console.log("=================================================");
tree.rebalance();
tree.prettyPrint(tree.root);
