class MnistCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
    }

    getRelativeMouse(e) {
        const rect = this.canvas.getBoundingClientRect()
        const scaleX = this.canvas.width / rect.width
        const scaleY = this.canvas.height / rect.height

        const x = Math.floor((e.clientX - rect.left) * scaleX)
        const y = Math.floor((e.clientY - rect.top) * scaleY)
        return [x, y]
    }
    set data(pixelData) {
        const imageData = this.ctx.createImageData(28, 28);
        this.canvas.width = 28
        this.canvas.height = 28

        for (let i = 0; i < 784; i++) {
            const value = pixelData[i];
            const index = i * 4;
            imageData.data[index] = value * 255;
            imageData.data[index + 1] = value * 255;
            imageData.data[index + 2] = value * 255;
            imageData.data[index + 3] = 255;
        }

        this.ctx.putImageData(imageData, 0, 0);
    }
    get data() {
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const pixelData = imageData.data;
        
        const grayscaleData = [];
        for (let i = 0; i < pixelData.length; i += 4) {
            const r = pixelData[i];
            const g = pixelData[i + 1];
            const b = pixelData[i + 2];
            const grayValue = (r + g + b) / 3 / 255; 
            grayscaleData.push(grayValue);
        }
        
        return grayscaleData;
    }
    clear() {
        this.ctx.fillStyle = "#000"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

class DrawingMnistCanvas extends MnistCanvas{
    onDrawEnd = null
    constructor(canvasId) {
        super(canvasId);
        this.#SetupDrawing()
    }
    #SetupDrawing() {
        this.drawing = false
        this.color = "#fff"

        this.canvas.addEventListener('contextmenu', e => {
            e.preventDefault()
            e.stopPropagation()
        })

        this.canvas.addEventListener('mousedown', e => {
            this.drawing = true
            this.ctx.beginPath()
            const [x, y] = this.getRelativeMouse(e)
            this.ctx.moveTo(x, y)
            this.color = e.button === 2 ? '#000' : '#fff'
            this.ctx.lineWidth = 1
            this.ctx.lineJoin = 'round'
            this.ctx.lineCap = 'round'
            this.ctx.shadowBlur = 1
            this.ctx.shadowColor = this.color
            this.ctx.shadowOffsetX = 0
            this.ctx.shadowOffsetY = 0
        })

        this.canvas.addEventListener('mousemove', e => {
            if (!this.drawing) return
            const [x, y] = this.getRelativeMouse(e)
            this.ctx.lineTo(x, y)
            this.ctx.strokeStyle = this.color
            this.ctx.stroke()
        })

        this.canvas.addEventListener('mouseup', () => {
            this.drawing = false
            this.#drawEnd()
        })

        this.canvas.addEventListener('mouseleave', () => {
            this.drawing = false
            this.#drawEnd()
        })
    }
    #drawEnd(){
        if(this.onDrawEnd != null){
            this.onDrawEnd()
        }
    }
}

export { MnistCanvas, DrawingMnistCanvas }