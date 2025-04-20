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

class SimpleAI {
    constructor(x, y) {
        this.dict = {}
        this.sim = new Array(2)
        this.inputs = new Array(x.length)
        for (let i = 0; i < x.length; i++) {
            const key = x[i].join("-")
            this.dict[key] = y[i]
            this.inputs[i] = x[i]

            let it = this.sim
            for(let j = 0; j < x[i].length; j++){
                if(!(x[i][j] in it)){
                    it[x[i][j]] = new Array(2)
                }
                it = it[x[i][j]]
            }
        }
        console.log(JSON.stringify(this.sim))
    }
    Predict(x) {
        const key = x.join("-")

        if (key in this.dict) {
            return this.dict[key]
        }

        let best = new SimilarityItem(this.inputs[0], -1)

        for (const target of this.inputs) 
        {
            const targetScore = similarity(target, x)

            if (targetScore > best.score) {
                best = new SimilarityItem(target, targetScore)
            }
        }

        return this.dict[best.key]
    }
}

export { SimpleAI }