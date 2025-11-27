import { Game } from "./game";

class GameSingleton {
  private static instance: Game;

  static getInstance(): Game {
    if (!GameSingleton.instance) {
      GameSingleton.instance = new Game(3, 6);
    }
    return GameSingleton.instance;
  }

  static resetGame() {
    GameSingleton.instance = new Game(3, 6);
    return GameSingleton.instance;
  }
}

export default GameSingleton;