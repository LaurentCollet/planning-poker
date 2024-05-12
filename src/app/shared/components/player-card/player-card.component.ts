import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {Player} from "../../../core/models/player.model";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    NgClass
  ],
  template: `
    @defer (when player) {
      <p class="name">
        {{ player.name }}
      </p>
      <div class="content" [ngClass]="{'main-player': isMainPlayer}">
        {{ player.card?.value }}
      </div>
    }
  `,
  styles: `
    .content {
      width: 37px;
      height: 60px;
      background: deepskyblue;
      border-radius: 20px;
      border: solid 2px black;
    }

    .main-player {
      background: greenyellow !important;
    }
  `
})
export class PlayerCardComponent {
  @Input({required: true}) player!: Player;
  @Input() isMainPlayer: boolean = false;
}
