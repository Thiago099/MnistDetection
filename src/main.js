import { GetMnistData } from "./mnist";
import { AI } from "./booleanAlgebra";
import { Matrix } from "./matrix";
import { BarChart } from "./chart";
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
    const treshold = document.getElementById("treshold")
    const chart = document.getElementById("chart")
    const resetTreshold = document.getElementById("resetTreshold")

    const barChart = new BarChart(chart)

    let index = 0

    function update(){
      const prediction = encoder.Predict(xtest[index], Number(treshold.value))
      truth.value = Matrix.indexOfMax(ytest[index])
      predicted.value =  Matrix.indexOfMax(prediction)

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
    function doResetTreshold(){
      treshold.value = 0.9
      update()
    }
    next.addEventListener("click", goNext)
    previus.addEventListener("click", goPrevius)
    treshold.addEventListener("change", update)
    resetTreshold.addEventListener("click", doResetTreshold)
    update()
  }
}
Program.Main()