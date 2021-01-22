module "chess.js" {
  interface Move {
    color: "w" | "b";
    from: string;
    to: string;
  }
  export class Chess {
    moves(options: { verbose: true }): Move[];
    move(to: string);
  }
}
