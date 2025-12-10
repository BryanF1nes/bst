import { Node } from './Node.js';

export class Tree {
    constructor(array) {
        this.root = this.buildTree(array, array[0], array.length - 1);
    }

    buildTree(array, start, end) {
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
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
}

//TODO: Update merge sort to remove duplicates
//Consider different sorting algorithim??
const mergeSort = (array) => {
    if (array.length <= 1) return array;
    const mid = Math.floor(array.length / 2);
    const leftHalf = array.slice(0, mid);
    const rightHalf = array.slice(mid, array.length);

    const sortedLeft = mergeSort(leftHalf);
    const sortedRight = mergeSort(rightHalf);

    const result = [];

    while (sortedLeft.length > 0 && sortedRight.length > 0) {
        if (sortedLeft[0] <= sortedRight[0]) {
            result.push(sortedLeft.shift());
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

const random = [1, 13, 2, 5, 7, 6, 3, 14, 8, 9]
const sorted = mergeSort(random);
console.log(sorted);
const tree = new Tree(sorted);
tree.prettyPrint(tree.root);

