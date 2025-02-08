import { AI } from "./booleanAI.js";
import { Matrix } from "./matrix";

class OneHotBooleanAi{
    constructor(xtrain, ytrain) {
        this.ai = new AI(xtrain, ytrain)
    }
    Predict(input, precision){
        let treshold = 1;
        let prediction = null
        while(prediction == null || Matrix.areZeros(prediction)){
          prediction = this.ai.Predict(input, treshold, precision)
          treshold -= 0.01
        }
        return prediction
    }
}


export { OneHotBooleanAi }