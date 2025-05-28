import { HeaderComponent } from './header/header.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { Component, ViewChild } from '@angular/core';
import { PieChartComponent } from './piechart/piechart.component';
import { DinerBase } from './../shared/model/dinerBase';
import { DinersService } from './../service/diners.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, PieChartComponent, DynamicFormComponent],
  templateUrl: './main.component.html',
})
export class MainComponent {
  @ViewChild(PieChartComponent) pieChartComponentChild!: PieChartComponent;
  diners: DinerBase[] = [];
  totalAmount: number = 0;

  constructor(public dinersService: DinersService) {}

  ngOnInit() {
    this.dinersService
      .getDefaultDiners()
      .subscribe((data) => (this.diners = data));
    this.dinersService.setRandomNames(this.diners);
    this.totalAmount = this.dinersService.getTotal(this.diners);
  }

  onUpdateChart() {
    this.pieChartComponentChild?.updateChart(this.diners);
    this.totalAmount = this.dinersService.getTotal(this.diners);
  }

  onDivideAmount(divideAmountParam: number) {
    this.dinersService.divideAmount(this.diners, divideAmountParam);
    this.pieChartComponentChild?.updateChart(this.diners);
  }

  onGenerateRandomNames() {
    this.dinersService.setRandomNames(this.diners);
    this.pieChartComponentChild?.updateChart(this.diners);
  }

  onInsertDiner() {
    this.diners.push({
      key: Math.floor(Math.random() * 100),
      name: this.dinersService.getRandomName(),
      amount: 0,
      order: 1,
      locked: false,
    });
    const currentTotalAmount = this.dinersService.getTotal(this.diners);
    this.dinersService.divideAmount(this.diners, currentTotalAmount);
    this.pieChartComponentChild.updateChart(this.diners);
    this.totalAmount = this.dinersService.getTotal(this.diners);
  }

  onRemoveDiner(name: string) {
    const currentTotalAmount = this.dinersService.getTotal(this.diners);
    this.diners = this.diners?.filter((d) => d.name !== name);
    this.dinersService.divideAmount(this.diners, currentTotalAmount);
    this.pieChartComponentChild.updateChart(this.diners);
  }
}