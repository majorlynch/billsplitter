import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-aurebesh',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './aurebesh.component.html',
  styleUrl: './aurebesh.component.css'
})
export class AurebeshComponent {
  translation: string = '';
  inputText: string = '';
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");

  addLetter(letter: string)
  {
    this.inputText += letter;
  }
  clearText()
  {
    this.inputText = '';
  }
}
