const fs = require('fs')

const data = fs.readFileSync('./data.txt', 'utf8')
const corruptMemory = data.trim()

const regexMatch = /mul\(\w*,\w*\)|don't\(\)|do\(\)/g
const matches = corruptMemory.match(regexMatch)

const numbersPart1 = []
const numbersPart2 = []
let doAction = true
for (const match of matches) {
  if (match.includes('do()')) {
    doAction = true
  } else if (match.includes("don't()")) {
    doAction = false
  } else {
    const firstNumber = match.split(',')[0].split('(')[1]
    const secondNumber = match.split(',')[1].split(')')[0]
    if (doAction) {
      numbersPart2.push(Number(firstNumber) * Number(secondNumber))
    }
    numbersPart1.push(Number(firstNumber) * Number(secondNumber))
  }
}

const totalPart1 = numbersPart1.reduce((acc, curr) => acc + curr, 0)
const totalPart2 = numbersPart2.reduce((acc, curr) => acc + curr, 0)
console.log('Total part 1: ' + totalPart1)
console.log('Total part 2: ' + totalPart2)
