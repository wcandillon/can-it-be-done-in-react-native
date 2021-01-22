module "chess.js" {
  export type Board = (Piece | null)[][];
  interface Piece {
    type: "q" | "r" | "n" | "b" | "k" | "p";
    color: "b" | "w";
  }

  interface Move {
    color: "w" | "b";
    from: string;
    to: string;
  }
  export class Chess {
    moves(options: { verbose: true }): Move[];
    move(move: { from: string; to: string; promotion?: "q" | "r" | "n" | "b" });
    board(): Board;
  }
}
