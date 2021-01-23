module "chess.js" {
  export type Board = (Piece | null)[][];
  interface Piece {
    type: "q" | "r" | "n" | "b" | "k" | "p";
    color: "b" | "w";
  }

  type Col = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
  type Row = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
  export type Position = `${Col}${Row}`;

  interface Move {
    color: "w" | "b";
    from: Position;
    to: Position;
  }
  export class Chess {
    moves(options: { verbose: true }): Move[];
    move(move: { from: string; to: string; promotion?: "q" | "r" | "n" | "b" });
    board(): Board;
  }
}
