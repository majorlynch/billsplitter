import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormDinerComponent } from './dynamic-form-diner/dynamic-form-diner.component';
import { DinerBase } from '../../model/dinerBase';
import { DinersService } from '../../service/diners.service';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DynamicFormDinerComponent, FormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css',
})
export class DynamicFormComponent implements OnInit {
  @Input() diners: DinerBase[] | null | undefined = [];
  @Input() totalAmount: number =0;
  @Output() updatechart = new EventEmitter();
  @Output() divideamount = new EventEmitter<number>();
  @Output() insertdiner = new EventEmitter();
  @Output() removediner = new EventEmitter<string>();
  @Output() generateRandomNames = new EventEmitter();
  form!: FormGroup;
  payLoad = '';

  constructor(private dinersService: DinersService){

  }

  ngOnInit() {
    //this.updateTotal();
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

  onAmountChanged(){
    this.updatechart.emit();
    //this.updateTotal();
  }

  onDivideAmount(){
    this.divideamount.emit(this.totalAmount);
  }

  //updateTotal() { 
  //  this.totalAmount = this.dinersService.getTotal(this.diners);
  //}

  onGenerateRandomNames() {
    this.generateRandomNames.emit();
  }

  onInsertDiner() {
    this.insertdiner.emit();
}

  onRemoveDiner(name: string) {
      this.removediner.emit(name);
  }

}
