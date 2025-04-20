import { GetMnistData } from "./data/mnist";
import { BarChart } from "./ui/chart";
import { Matrix } from "./algebra/matrix"
import { SimpleAI } from "./ai/simpleAI";
import { MnistCanvas, DrawingMnistCanvas } from "./ui/mnistCanvas";
const print = console.log


class Program{
  static async Main(){

    const canvas = new DrawingMnistCanvas("canvas")
    const canvas2 = new MnistCanvas("canvas2")

    const training = document.getElementById("training")

    const { xtrain, ytrain, xtest, ytest } = await GetMnistData()


    training.innerHTML = "<h3>Training...</h3>"
    const ai = new SimpleAI(xtrain, ytrain)


    const trained = document.getElementById("trained")

    trained.style.display = "flex"
    training.style.display = "none"

    const truth = document.getElementById("truth")
    const predicted = document.getElementById("predicted")
    const previus = document.getElementById("previus")
    const next = document.getElementById("next")
    const clear = document.getElementById("clear")

    const chart = document.getElementById("chart")

    const barChart = new BarChart(chart)

    let index = 0

    function update()
    {
      const [x,y] = ai.Predict(xtest[index])

      predicted.value =  Matrix.indexOfMax(y)
      truth.value = Matrix.indexOfMax(ytest[index])
      barChart.Update(y)
      canvas.data = xtest[index]
      canvas2.data = x
    }

    canvas.onDrawEnd = predictDrawing

    function predictDrawing() {
      const [x,y] = ai.Predict(canvas.data)
      predicted.value =  Matrix.indexOfMax(y)
      barChart.Update(y)
      canvas2.data = x
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
    clear.addEventListener("click", e=>{
      canvas.clear()
      predictDrawing()
    })
    update()
  }
}
Program.Main()