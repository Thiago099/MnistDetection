import { Matrix } from "./matrix.js"

function numberToBase26(n) {
    let s = '';
    while (n >= 0) {
        const rem = n % 26;
        const char = String.fromCharCode(97 + rem);
        s = char + s;
        n = Math.floor(n / 26) - 1;
    }
    return s;
}

class Node{
    constructor(index, not) {
        this.index = index
        this.not = not
    }
    Evaluate(x){
        return x[this.index] == (this.not ? 0 : 1)
    }
    ToString(x){
        return (this.not ? "!" : "") + numberToBase26(this.index)
    }
}

function addToAnwser(awnser, xey, i){
    for(let j = 0; j < xey.length; j++){

        if(xey[j] == 1){
            
            if(!(j in awnser)){
                awnser[j] = []
            }

            awnser[j].push(i)
        }
    }
}
function normalize(arr) {
    let max = Math.max(...arr);
    if(max == 0){
        max = 1
    }
    return arr.map(num => num / max);
}
function getKey(list){
    return list.map(x=>x.index+"|"+x.not).join("-")
}
class AI {
    outputs = []
    constructor(tx, ty) {
        
        const x = Matrix.transpose(tx)
        const y = Matrix.transpose(ty)

        for(let i = 0; i < y.length; i++){
            const target = y[i]

            const awnser = {}

            for(let i = 0; i < x.length; i++){

                const item = x[i]

                const XandY = Matrix.and(item, target)
                const notXandY = Matrix.and(Matrix.not(item), target)
                addToAnwser(awnser, XandY, new Node(i, false))
                addToAnwser(awnser, notXandY, new Node(i, true))
            }
            this.outputs.push(Object.values(awnser))
        }
        console.log(this.outputs.length)
        console.log(this.outputs[0].length)
        console.log(this.outputs[0][0].length)
    }
    PredictAll(x){
        const result = []
        for(const item of x){
            console.log("x")
            result.push(this.Predict(item))
        }
        return result
    }
    Predict(x, targetScore = 0.5){
        const result = []
        for(const or of this.outputs){
            let current = 0
            let max = 0
            for(const and of or){
                let score = 0
                let maxScore = 0
                for(const node of and){
                    maxScore++
                    if(node.Evaluate(x)){
                        score ++
                    }
                }

                max++
                
                if((score / maxScore) >= targetScore){
                    current++
                }
            }
            result.push(current)
        }
        return normalize(result)
    }
    ToString(){
        let result = ""
        for(const or of this.outputs){
            const orResult = []
            for(const and of or){
                const andResult = []
                for(const node of and){
                    andResult.push(node.ToString())
                }
                orResult.push(`(${andResult.join(" && ")})`)
            }

            result+= orResult.join(" || ") + "\n"
            
        }
        return result
    }
}

export {AI}