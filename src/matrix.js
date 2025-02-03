class Matrix{
    static transpose(array) {
        return Array.from({ length: array[0].length }, (_, columnIndex) =>
            array.map(row => row[columnIndex])
        );
    }

    static join(arr) {
        return arr.join('-');
    }
    
    static not(item){
        return 
    }
    
    static not(array){
        const result = new Array(array.length)
        for(let i = 0; i < array.length; i++){
            result[i] = array[i] == 1 ? 0 : 1
        }
        return result
    }

    static difference(a,b){
        let result = 0
        for(let i = 0; i < a.length; i++){
            if(a[i] != b[i]){
                result++
            }
        }
        return result
    }

    static and(...input){
        const result = new Array(input[0].length)

        for(let i = 0; i < result.length; i++){
            let current = 1
            for(let j = 0; j < input.length; j++){
                if(input[j][i] == 0){
                    current = 0
                    break
                }
            }
            result[i] = current
        }

        return result
    }

    static isRequired(a, b){
        for(let i = 0; i < a.length; i++){
            if(a[i] == 0 && b[i] == 1){
                return false
            }
        }
        return true
    }

    static indexOfMax(arr) {
        if (arr.length === 0) return -1;
        let maxIndex = 0, maxValue = arr[0];
        for (let [i, num] of arr.entries()) {
            if (num > maxValue) {
                maxValue = num;
                maxIndex = i;
            }
        }
        return maxIndex;
    }
}

export { Matrix }