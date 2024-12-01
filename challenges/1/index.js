const fs = require('fs')

const data = fs.readFileSync('./data.txt', 'utf8')
const lines = data.trim().split('\n')

const list1 = []
const list2 = []
for (const line of lines) {
  const [a, b] = line.trim().split(/\s+/)

  list1.push(Number(a))
  list2.push(Number(b))
}

list1.sort((a, b) => a - b)
list2.sort((a, b) => a - b)

/*

  Part 1
*/
const totalDistances = []
for (const [index, number] of list1.entries()) {
  totalDistances.push(Math.abs(number - list2[index]))
}

const totalDistance = totalDistances.reduce((a, b) => a + b, 0)
console.log('Total distance: ' + totalDistance)

/*

  Part 2

*/
const similarityScores = []
for (const number of list1) {
  const count = list2.filter((n) => n === number).length
  similarityScores.push(number * count)
}

const totalSimilarityScore = similarityScores.reduce((a, b) => a + b, 0)
console.log('Total similarity score: ' + totalSimilarityScore)
