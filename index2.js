import isNumber from 'is-number';
import chalk from 'chalk';

const values = [42, '42', null, undefined, {}, 'Hello', NaN, 0];
values.forEach(value => {
    console.log(`Is "${value}" a number?`, isNumber(value));
});

console.log(chalk.blue.bold('Hello, this is first lab work'));
console.log(chalk.yellow.italic('bebebebebebebebebebe'));