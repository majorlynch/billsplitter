import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from './feature/header/header.component';
import { DynamicFormComponent } from './feature/dynamic-form/dynamic-form.component';
import { PieChartComponent } from './feature/piechart/piechart.component';
import { DinerBase } from './shared/model/dinerBase';

import { Observable } from 'rxjs';
import { DinersService } from './service/diners.service';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [DinersService],
  imports: [HeaderComponent, DynamicFormComponent, PieChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
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
    console.log(this.diners);
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
