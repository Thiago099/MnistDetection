function getDistance(a, b) {
    let squaredDistance = 0
    for (let i = 0; i < a.length; i++) {
        squaredDistance += (a[i] - b[i]) ** 2
    }
    return Math.sqrt(squaredDistance)
}

class SimilarityItem {
    constructor(index, score) {
        this.index = index
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
            const targetScore = getDistance(this.x[i], x)
            if (targetScore < best.score) {
                best = new SimilarityItem(i, targetScore)
            }
        }

        return [this.x[best.index], this.y[best.index]]
    }
}

export { SimpleAI }