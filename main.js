import { Tree } from './classes/Tree.js'

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const array = new Array(20).fill(0).map(() => getRandomInt(1, 100));

const tree = new Tree(array);
console.log(tree.isBalanced());
tree.insert(89)
tree.insert(23)
tree.insert(48)
tree.insert(18)
tree.insert(88)
tree.insert(90)
console.log(tree.isBalanced());
tree.prettyPrint();
tree.rebalance();
tree.prettyPrint();

console.log("==============================================")

tree.preOrderForEach((data) => {
    console.log(data.value);
});
