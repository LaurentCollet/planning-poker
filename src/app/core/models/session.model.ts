import {VotingSystem} from "./voting-system.model";
import {Player} from "./player.model";

export class Session {
  id: string;
  name: string;
  votingSystem: VotingSystem;
  players: Player[];

  constructor(id: string, name: string, votingSystem: VotingSystem, players: Player[]) {
    this.id = id;
    this.name = name;
    this.votingSystem = votingSystem
    this.players = players;
  }
}
