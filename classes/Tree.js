import { Node } from './Node.js';

export class Tree {
    constructor(array) {
        this.sortedArray = mergeSort(array);
        this.root = this.buildTree(this.sortedArray);
    }

    buildTree(array, start = array[0], end = array.length - 1) {
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
