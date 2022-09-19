import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent {
  @Input() options: string[] = [];
  @Input() placeholder: string = 'Select an option';
  @Input() selectedOption: string | undefined;
  @Output() selectedOptionChange = new EventEmitter<string>();
  showOptions: boolean = false;
  toggleShowOptions() {
    this.showOptions = !this.showOptions;
  }
  onOptionClick(option: string) {
    this.toggleShowOptions();
    this.selectedOption = option;
    this.selectedOptionChange.emit(this.selectedOption);
  }
}
