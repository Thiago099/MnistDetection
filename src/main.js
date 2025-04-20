import { GetMnistData } from "./data/mnist";
import { BarChart } from "./ui/chart";
import { Matrix } from "./algebra/matrix"
import { SimpleAI } from "./ai/simpleAI";
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

    const training = document.getElementById("training")

    const { xtrain, ytrain, xtest, ytest } = await GetMnistData()

    const booleanXtrain = xtrain.map(Matrix.convertToBoolean)
    const booleanXtest = xtest.map(Matrix.convertToBoolean)

    training.innerHTML = "<h3>Training...</h3>"
    const ai = new SimpleAI(booleanXtrain, ytrain)

    training.innerHTML = "<h3>Evaluating...</h3>"

    // for(const item of booleanXtest){
    //   ai.Predict(item)
    // }


    const trained = document.getElementById("trained")

    trained.style.display = "flex"
    training.style.display = "none"

    const truth = document.getElementById("truth")
    const predicted = document.getElementById("predicted")
    const previus = document.getElementById("previus")
    const next = document.getElementById("next")

    const chart = document.getElementById("chart")

    const barChart = new BarChart(chart)

    let index = 0

    function update(){

      const prediction = ai.Predict(booleanXtest[index])

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

    next.addEventListener("click", goNext)
    previus.addEventListener("click", goPrevius)

    update()
  }
}
Program.Main()