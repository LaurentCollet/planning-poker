import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardComponent} from "../../../../shared/components/card/card.component";
import {Card} from "../../../../core/models/card.model";

@Component({
  selector: 'app-card-picker',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './card-picker.component.html',
  styleUrl: './card-picker.component.scss'
})
export class CardPickerComponent {
  @Input({required : true}) cards!: Card[];
  @Output() cardEvent : EventEmitter<Card> = new EventEmitter<Card>();
}
