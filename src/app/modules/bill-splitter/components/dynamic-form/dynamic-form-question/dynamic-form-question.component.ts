import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DinerBase } from '@models/dinerBase';
import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-diner',
  standalone: true,
  providers: [DecimalPipe],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dynamic-form-question.component.html',
  styleUrl: './dynamic-form-question.component.css',
})
export class DynamicFormQuestionComponent implements OnChanges {
  @Input() diner!: DinerBase;
  @Input() form!: FormGroup;
  @Output() amountChanged = new EventEmitter();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['diner']) {
      this.amountChanged.emit();
      // Handle the change
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
    this.diner.amount += 1;
    this.amountChanged.emit();
  }

  decrementValue() {
    this.diner.amount -= 1;
    this.amountChanged.emit();
  }

  onValueChange(newVal: string) {
    this.amountChanged.emit();
  }
}
