'use strict'

const execFileSync = require('child_process').execFileSync

module.exports = function getCurrentRepo () {
  const result = execFileSync('git', [ 'remote', '-v' ], { encoding: 'utf8' })
  const lines = result.split('\n').map(line => line.trim().split('\t'))
  for (const line of lines) {
    if (line[0] === 'origin') {
      const m = line[1].match(/github\.com[:\/]([^\/]+)\/([^\/]+?)(?:\.git)?\/? \(push\)$/)
      if (m) return m[1] + '/' + m[2]
    }
  }
}
