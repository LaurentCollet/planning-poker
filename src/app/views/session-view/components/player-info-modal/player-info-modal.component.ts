import {Component, EventEmitter, Output} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {CreatePlayerDTO} from "../../../../core/dtos/create-player.dto";

@Component({
  selector: 'app-player-info-modal',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
    MatError,
    FormsModule
  ],
  template: `
    <form (ngSubmit)="createPlayer()">
      <mat-form-field>
        <mat-label>
          Enter your game name
        </mat-label>
        <input matInput placeholder="enter name" [formControl]="playerControl" maxlength="25">
        @if (!playerControl.hasError("required") && playerControl.hasError("minlength")) {
          <mat-error>name must be at least 3 characters long</mat-error>
        } @else if (playerControl.hasError("required")) {
          <mat-error>name is required</mat-error>
        }
      </mat-form-field>

      <div class="buttons">
        <button mat-raised-button type="submit">validate</button>
      </div>
    </form>
  `,
  styles: `
    :host {
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    form {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      background: tomato;
      border-radius: 20px;
      padding: 0 20px;
      margin: 0 10%;
      height: 200px;
    }

    .buttons {
      display: flex;
      justify-content: space-around;
    }

    mat-error {
      color: white;
    }
  `
})
export class PlayerInfoModalComponent {
  @Output() playerEvent: EventEmitter<CreatePlayerDTO> = new EventEmitter();
  playerControl: FormControl = new FormControl("", [Validators.required, Validators.minLength(3)]);


  public createPlayer(): void {
    this.playerEvent.emit(new CreatePlayerDTO(this.playerControl.value))
  }
}
