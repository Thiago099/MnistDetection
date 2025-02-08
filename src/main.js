import { GetMnistData } from "./mnist";
import { AI } from "./booleanAlgebra";
import { Matrix } from "./matrix";
import { BarChart } from "./chart";
const print = console.log
function drawMNIST(canvasId, pixelData) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(28, 28);
  canvas.width = 28
  canvas.height = 28
  
  for (let i = 0; i < 784; i++) {
      const value = pixelData[i];
      const index = i * 4;
      imageData.data[index] = value*255;
      imageData.data[index + 1] = value*255;
      imageData.data[index + 2] = value*255;
      imageData.data[index + 3] = 255;
  }
  
  ctx.putImageData(imageData, 0, 0);
}



class Program{
  static async Main(){


    const { xtrain, ytrain, xtest, ytest } = await GetMnistData()
    const encoder = new AI(xtrain, ytrain)


    const trained = document.getElementById("trained")
    const training = document.getElementById("training")

    trained.style.display = "flex"
    training.style.display = "none"



    const truth = document.getElementById("truth")
    const predicted = document.getElementById("predicted")
    const previus = document.getElementById("previus")
    const next = document.getElementById("next")
    const inferencePercentage = document.getElementById("inferencePercentage")
    const resetInferencePercentage = document.getElementById("resetInferencePercentage")

    const chart = document.getElementById("chart")

    const barChart = new BarChart(chart)

    let index = 0

    function update(){

      let treshold = 1;

      let prediction = null

      while(prediction == null || Matrix.areZeros(prediction)){
        prediction = encoder.Predict(xtest[index], treshold, Number(inferencePercentage.value))
        treshold -= 0.01
      }

      predicted.value =  Matrix.indexOfMax(prediction)
      truth.value = Matrix.indexOfMax(ytest[index])

      barChart.Update(prediction)
      drawMNIST("canvas", xtest[index])
    }
    function  goNext(){
      if(index < xtest.length){
        index++
      }
      update()
    }
    function goPrevius(){
      if(index>0){
        index--
      }
      update()
    }

    function doResetInferencePercentage(){
      inferencePercentage.value = 10
      update()
    }

    inferencePercentage.addEventListener("change", e=>{
      update()
    })

    next.addEventListener("click", goNext)
    previus.addEventListener("click", goPrevius)
    resetInferencePercentage.addEventListener("click", doResetInferencePercentage)

    update()
  }
}
Program.Main()