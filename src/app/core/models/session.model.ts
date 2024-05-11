import {VotingSystem} from "./voting-system.model";
import {Player} from "./player.model";

export interface Session {
  id : string;
  name : string;
  votingSystem : VotingSystem;
  players : Player[];
}
