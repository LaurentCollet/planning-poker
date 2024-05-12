import {Component, inject, OnInit} from '@angular/core';
import {Session} from "../../core/models/session.model";
import {
  doc,
  Firestore,
  getDoc,
  DocumentSnapshot, DocumentReference,
  collection,
  addDoc,
  CollectionReference, collectionData
} from "@angular/fire/firestore";
import {ActivatedRoute, Router} from "@angular/router";
import {Player} from "../../core/models/player.model";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {PlayerInfoModalComponent} from "./components/player-info-modal/player-info-modal.component";
import {CreatePlayerDTO} from "../../core/dtos/create-player.dto";
import {AsyncPipe, NgClass, NgStyle} from "@angular/common";
import {Observable} from "rxjs";
import {LocalStorageService} from "../../shared/services/local-storage.service";
import {CardComponent} from "../../shared/components/card/card.component";
import {PlayerCardComponent} from "../../shared/components/player-card/player-card.component";
import {GameboardComponent} from "./components/gameboard/gameboard.component";
import {CardPickerComponent} from "./components/card-picker/card-picker.component";


@Component({
  selector: 'app-session-view',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    PlayerInfoModalComponent,
    AsyncPipe,
    CardComponent,
    PlayerCardComponent,
    NgStyle,
    NgClass,
    GameboardComponent,
    CardPickerComponent
  ],
  templateUrl: './session-view.component.html',
  styleUrl: './session-view.component.scss'
})
export class SessionView implements OnInit {
  firestore: Firestore = inject(Firestore);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  showModal: boolean = false;
  mainPlayer?: Player;
  session!: Session;
  players$!: Observable<Player[]>;
  localStorageService: LocalStorageService = inject(LocalStorageService);

  async ngOnInit(): Promise<void> {
    await this.loadSession();
    this.createOrRetrievePlayer();
    this.players$ = this.getPlayers$();
  }

  private async loadSession(): Promise<void> {
    if (!this.route.snapshot.paramMap.has("sessionId")) {
      throw new Error("no session id found in URL");
    }
    const sessionId: string = this.route.snapshot.paramMap.get("sessionId")!;
    const snapshot: DocumentSnapshot = await getDoc(doc(this.firestore, "sessions", sessionId));
    this.session = snapshot.data() as Session;
    this.session.id = snapshot.id;
  }

  private async createOrRetrievePlayer(): Promise<void> {
    // check if player is in local storage
    const playerIdLocalStorage: string | null = this.localStorageService.getItem("current-player-id");
    // if not show create player modal
    if (!playerIdLocalStorage) {
      this.showModal = true;
      return;
    }
    // check if player in local storage is in the active session
    const docRef: DocumentReference = doc(this.firestore, "sessions", this.session.id, "players", playerIdLocalStorage);
    const snapshot: DocumentSnapshot = await getDoc(docRef);
    // if not show create player modal
    if (!snapshot.exists()) {
      this.showModal = true;
      return;
    }
    // retrieve player and set it as main player
    this.mainPlayer = {id : snapshot.id , ...snapshot.data()} as Player;
  }

  public async createPlayer(player: CreatePlayerDTO): Promise<void> {
    const colRef: CollectionReference = collection(this.firestore, "sessions", this.session.id, "players");
    addDoc(colRef, {...player}).then((player) => {
      this.mainPlayer = player as unknown as Player
      this.showModal = false;
      this.localStorageService.setItem("current-player-id", player.id);
    });
  }

  private getPlayers$(): Observable<Player[]> {
    const colRef: CollectionReference = collection(this.firestore, "sessions", this.session.id, "players");
    return collectionData(colRef, {idField: "id"}) as Observable<Player[]>
  }
}
