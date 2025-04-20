function getDistance(a, b) {
    let squaredDistance = 0
    for (let i = 0; i < a.length; i++) {
        squaredDistance += (a[i] - b[i]) ** 2
    }
    return Math.sqrt(squaredDistance)
}

class SmallestDistance {
    constructor(index, distance) {
        this.index = index
        this.distance = distance
    }
}

class SimpleAI {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    Predict(x) {
        let best = new SmallestDistance(null, Infinity)

        for(let i = 0; i < x.length; i++){
            const currentDistance = getDistance(this.x[i], x)
            if (currentDistance < best.distance) {
                best = new SmallestDistance(i, currentDistance)
            }
        }

        return [this.x[best.index], this.y[best.index]]
    }
}

export { SimpleAI }