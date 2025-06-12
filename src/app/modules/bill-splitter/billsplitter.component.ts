import { Component, ViewChild } from '@angular/core';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { PieChartComponent } from './components/piechart/piechart.component';
import { DinerBase } from '@models/dinerBase';
import { DinersService } from './services/diners.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [PieChartComponent, DynamicFormComponent],
  templateUrl: './billsplitter.component.html',
})
export class BillSplitterComponent {
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