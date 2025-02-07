import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DinerBase } from '../../../shared/model/dinerBase';

@Component({
  selector: 'app-diner',
  standalone: true,
  providers: [DecimalPipe],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dynamic-form-diner.component.html',
  styleUrl: './dynamic-form-diner.component.css',
})
export class DynamicFormDinerComponent implements OnChanges {
  @Input() diner!: DinerBase;
  @Input() form!: FormGroup;
  @Output() amountChanged = new EventEmitter();
  isChecked = true;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['diner']) {
      this.amountChanged.emit();
    }
  }

  get isValid() {
    return this.form.controls[this.diner.key].valid;
  }

  validateInput(e: any, input: any = null) {
    const text = e.replace(/a/g, '');
    this.diner.amount = text;
  }

  incrementValue() {
    console.log(this.diner.amount);
    this.diner.amount = +this.diner.amount + 1;
    console.log(this.diner.amount);
    this.amountChanged.emit();
  }

  decrementValue() {
    this.diner.amount -= 1;
    this.amountChanged.emit();
  }

  onValueChange(newVal: string) {
    this.amountChanged.emit();
  }

  formatAmount(amount: number): string {
    // Format the amount to two decimal places
    return amount.toFixed(2);
  }
}
