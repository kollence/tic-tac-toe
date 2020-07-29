const keyGenerator = () => {
    // return Math.random().toString(36).substr(2, lenght)
    return Math.floor(10000 + Math.random() * 90000);
}
const winningFields = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
const winnerIs = (fields) => {

    for (let i = 0; i < winningFields.length; i++) {
      const [a, b, c] = winningFields[i]
      if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
        // return fields[a]
        return {
            winningFields: [a,b,c]
        }
      }
    }
    return null
}
module.exports = { keyGenerator, winnerIs }