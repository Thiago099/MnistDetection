import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

class BarChart {
    constructor(canvas) {
        const ctx = canvas.getContext('2d');
        this.base = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                datasets: [{
                    label: 'Confidence',
                    data: [],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    Update(data){
        console.log(data)
        this.base.data.datasets[0].data = data;
        this.base.update();
    }
}
export {BarChart}