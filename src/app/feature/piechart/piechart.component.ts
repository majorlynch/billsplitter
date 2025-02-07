import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { ChartConfiguration, Chart } from 'chart.js/auto';
import { DinerBase } from '../../shared/model/dinerBase';

@Component({
  selector: 'app-piechart',
  standalone: true,
  imports: [],
  templateUrl: './piechart.component.html',
  styleUrl: './piechart.component.css'
})
export class PieChartComponent{
  @ViewChild('mychart') chartCanvas!: ElementRef;
  @Input() diners: DinerBase[] | null = [];
  pieChartData: ChartConfiguration['data']['datasets'] = [];
  myPieChart : any;
  dataValues: number[] | undefined = [];
  dataLabels: string[] | undefined = [];

  ngAfterViewInit() {
    this.createChart();
  }

  createChart(){
    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    this.dataLabels = this.diners?.map(item => item.name);
    this.dataValues = this.diners?.map(item => item.amount);
    

    this.myPieChart =  new Chart(ctx, {
      type: 'pie', // Change to 'line', 'pie', etc. as needed
      data: {
        labels: this.dataLabels,
        datasets: [{
          label: 'Amount',
          data: this.dataValues,
          borderWidth: 1
        }]
      },
      options: {
      }
    });
  }

  public updateChart(dinersParam: DinerBase[]){
    this.diners = dinersParam;
    this.myPieChart.data.labels = this.diners?.map(i => i.name);
    this.myPieChart.data.datasets[0].data = this.diners?.map(i => i.amount);
    this.myPieChart.update();
  }

}
