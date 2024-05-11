import {VotingSystem} from "../models/voting-system.model";

export class CreateSessionDTO {
  name: string;
  votingSystem: VotingSystem;

  constructor(name: string, votingSystem: VotingSystem) {
    this.name = name;
    this.votingSystem = votingSystem;
  }
}
