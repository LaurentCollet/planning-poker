import {Component, Input} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {PlayerCardComponent} from "../../../../shared/components/player-card/player-card.component";
import {Observable} from "rxjs";
import {Player} from "../../../../core/models/player.model";

@Component({
  selector: 'app-gameboard',
  standalone: true,
  imports: [
    AsyncPipe,
    PlayerCardComponent
  ],
  templateUrl: './gameboard.component.html',
  styleUrl: './gameboard.component.scss'
})
export class GameboardComponent {
  @Input({required: true}) players$!: Observable<Player[]>;
  @Input({required: true}) mainPlayer!: Player;
}
