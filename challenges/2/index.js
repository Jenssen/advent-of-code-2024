const fs = require('fs')

const data = fs.readFileSync('./data.txt', 'utf8')
const reports = data.trim().split('\n')

const safeReports = []
for (const report of reports) {
  const level = report.trim().split(/\s+/).map(Number)

  let isSafe = true
  let isIncreasing = null
  for (const [index, number] of level.entries()) {
    if (level[index + 1]) {
      const diff = level[index + 1] - number

      // First number determines if sequence is increasing or decreasing
      if (isIncreasing === null) {
        isIncreasing = diff > 0
      }

      // Check if direction matches and diff is within bounds
      if (isIncreasing) {
        if (diff < 1 || diff > 3) {
          isSafe = false
          break
        }
      } else {
        if (diff > -1 || diff < -3) {
          isSafe = false
          break
        }
      }
    }
  }
  if (isSafe) {
    safeReports.push(report)
  } else {
    // Check for Problem Dampener
    let foundSafeSequence = false
    // Try removing each number one at a time
    for (let skipIndex = 0; skipIndex < level.length; skipIndex++) {
      const filteredLevel = level.filter((_, i) => i !== skipIndex)

      let sequenceIsSafe = true
      let sequenceIncreasing = null

      // Check the sequence with this number removed
      for (let i = 0; i < filteredLevel.length - 1; i++) {
        const diff = filteredLevel[i + 1] - filteredLevel[i]

        if (sequenceIncreasing === null) {
          sequenceIncreasing = diff > 0
        }

        if (sequenceIncreasing) {
          if (diff < 1 || diff > 3) {
            sequenceIsSafe = false
            break
          }
        } else {
          if (diff > -1 || diff < -3) {
            sequenceIsSafe = false
            break
          }
        }
      }

      if (sequenceIsSafe) {
        foundSafeSequence = true
        break
      }
    }

    if (foundSafeSequence) {
      safeReports.push(report)
    }
  }
}

console.log('Safe reports: ' + safeReports.length)
