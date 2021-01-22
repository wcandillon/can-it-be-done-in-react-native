module "chess.js" {
  interface Move {
    color: "w" | "b";
    from: string;
    to: string;
  }
  export class Chess {
    moves(options: { verbose: true }): Move[];
    move(move: { from: string; to: string; promotion?: "q" | "r" | "n" | "b" });
  }
}
