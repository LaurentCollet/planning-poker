import {Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {
  collection,
  collectionData,
  Firestore,
  CollectionReference,
  addDoc
} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {VotingSystem} from "../../core/models/voting-system.model";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {CreateSession} from "../../core/interfaces/create-session.interface";
import {CreateSessionDTO} from "../../core/dtos/create-session.dto";
import {Router} from "@angular/router";
import {Session} from "../../core/models/session.model";


@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [
    AsyncPipe,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    MatError,
  ],
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.scss'
})
export class HomeView implements CreateSession {
  firestore: Firestore = inject(Firestore);
  votingSystems$: Observable<VotingSystem[]> = this.getVotingSystems();
  createSessionForm: FormGroup<{ name: FormControl, votingSystem: FormControl }> = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    votingSystem: new FormControl("", [Validators.required])
  })
  router: Router = inject(Router);

  private getVotingSystems(): Observable<VotingSystem[]> {
    const colRef: CollectionReference = collection(this.firestore, 'voting-systems');
    return collectionData(colRef) as Observable<VotingSystem[]>;
  }

  public async createSession(): Promise<void> {
    const document: CreateSessionDTO = {
      name: this.createSessionForm.value.name,
      votingSystem: this.createSessionForm.value.votingSystem
    };
    const colRef: CollectionReference = collection(this.firestore, "sessions");
    const createdSession: Session = await addDoc(colRef, document) as unknown as Session;
    this.navigateToSession(createdSession);
  }

  private navigateToSession(session: Session): void {
    this.router.navigateByUrl(`sessions/${session.id}`).then();
  }
}
