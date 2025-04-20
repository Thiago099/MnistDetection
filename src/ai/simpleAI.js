function similarity(a, b) {
    let score = 0
    for (let i = 0; i < a.length; i++) {
        if (a[i] == b[i]) {
            score++
        }
    }
    return score
}

class SimilarityItem {
    constructor(item, score) {
        this.item = item
        this.score = score
    }
    get key() {
        return this.item.join("-")
    }
}

let i = 0
class Pair {
    id = i++
    false = null
    true = null
    value = null
    SetResult(value){
        this.value = value
    }
    Process(value) {
        if(value == 1){
            this.true = new Pair()
            return this.true
        } 
        else{
            this.false = new Pair()
            return this.false
        }
    }
    Get(value){
        if(value == 1){
            return this.true
        }
        else{
            return this.false
        }
    }
}

class SimpleAI {
    constructor(x, y) {
        this.dict = {}
        this.sim = new Pair()
        this.inputs = new Array(x.length)

        for (let i = 0; i < x.length; i++) {
            const key = x[i].join("-")
            this.dict[key] = y[i]
            this.inputs[i] = x[i]

            let it = this.sim
            
            for(let j = 0; j < x[i].length; j++){
                it = it.Process(x[i][j])
            }


            it.SetResult(y[i])
        }
    }
    Predict(x) {
        const key = x.join("-")

        if (key in this.dict) {
            return this.dict[key]
        }

        let it = this.sim

        for(let i = 0; i < x.length; i++){
            it = it.Get(x[i])
        }

        return it.value
    }
}

export { SimpleAI }