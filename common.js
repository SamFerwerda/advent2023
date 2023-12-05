const fs = require('fs');
const readline = require('readline');

async function processLineByLine(filename) {
  const fileStream = fs.createReadStream(`inputs/${filename}.txt`);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const list = [];
  for await (const line of rl) {
    list.push(line);
  }
  
  return list;
}

module.exports = { 
    processLineByLine   
};