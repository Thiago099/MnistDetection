function getDifference(a, b) {
    let score = 0
    for (let i = 0; i < a.length; i++) {
        score += Math.abs(a[i] - b[i])
    }
    return score
}

class SimilarityItem {
    constructor(item, score) {
        this.item = item
        this.score = score
    }
}

class SimpleAI {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    Predict(x) {
        let best = new SimilarityItem(this.x[0], Infinity)

        for(let i = 0; i < x.length; i++){
            const targetScore = getDifference(this.x[i], x)
            if (targetScore < best.score) {
                best = new SimilarityItem(this.y[i], targetScore)
            }
        }

        return best.item
    }
}

export { SimpleAI }