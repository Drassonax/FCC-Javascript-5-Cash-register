function checkCashRegister(price, cash, cid) {
    let change = cash - price
    let coins = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100]
    let i = 0
    for (let j=coins.length-1; j>=0; j--) {
      if (change >= coins[j]) {
        i = j
        break
      }
    }
    let kusur = []
    let numOfCoins = 0
    while (i>=0) {
      if (cid[i][1] > change) {
        numOfCoins = Math.floor(change / coins[i])
      } else {
        numOfCoins = Math.floor(cid[i][1] / coins[i])
        cid[i][1] = 0
      }
      change = Math.round(change*100 - numOfCoins * coins[i] *100) / 100
      if (numOfCoins * coins[i] !== 0){
        kusur.push([cid[i][0], numOfCoins * coins[i]])
      }
      if (change === 0) {
        break
      }
      i--
    }
    let status = ''
    if (change > 0) {
      status = "INSUFFICIENT_FUNDS"
      kusur = []
    } else if (cid.every((arr) => arr[1] === 0)) {
      status = "CLOSED"
      cid.forEach((cidArr) => {
        if (kusur.every((kusArr) => kusArr[0] !== cidArr[0])) {
          kusur.push(cidArr)
        }
        })
    } else {
      status = "OPEN"
    }
    console.log(status)
    console.log(kusur)
    return {
      status: status,
      change: kusur
    }
  }