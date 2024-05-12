import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Card} from "../../../core/models/card.model";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent
  ],
  template: `
    <div class="card">
      {{ card.value}}
    </div>
  `,
  styles: `
    .card {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 37px;
      height: 60px;
      background: white;
      border-radius: 20px;
      border: solid 2px black;
    }
  `
})
export class CardComponent {
  @Input({required: true}) card!: Card;
  @Output() cardEvent: EventEmitter<Card> = new EventEmitter<Card>();

  emitCard(card: Card) {
    this.cardEvent.emit(card);
  }
}
