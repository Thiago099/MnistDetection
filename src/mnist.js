import fs from "fs"
const print = console.log


function indexes(array) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(i)
    }
    return result;
}

async function readFile(path){
    const data = await fetch(path) .then(response => response.text())
    const jsonData = JSON.parse(data);
    return jsonData
}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}


async function GetMnistData(){
    const x = []
    const y = []
    for(let i = 0; i < 10; i++){
        const { data } = await readFile(`mnist/${i}.json`)

        for(let j = 0; j < data.length; j+=28*28){
            x.push(data.slice(j, j+28*28))
            y.push(new Array(10).fill(0).map((_,x)=>x==i?1:0))
        }
    }
    const idxs = shuffle(indexes(y))
    
    const resultX = []
    const resultY = []
    
    for(const idx of idxs){
        resultX.push(x[idx])
        resultY.push(y[idx])
    }

    return {
        xtrain:resultX.slice(0, 9000), 
        ytrain:resultY.slice(0, 9000),
        xtest:resultX.slice(9000, 10000), 
        ytest:resultY.slice(9000, 10000)
    }
}
export { GetMnistData }