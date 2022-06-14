interface Game {
  id: number;
  player_id: number;
  player_1_location: number;
  player_2_location: number;
  total_dice_rolls: number;
  current_player: 1 | 2;
  save_date: Date;
}

export default Game;
