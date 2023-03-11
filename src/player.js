export default (name, board) => {
  const attack = (player, col, row) => player.board.receiveAttack(col, row);

  const possibleRandomMoves = [];

  // Populate possible moves
  for (let col = 0; col < 10; col += 1) {
    for (let row = 0; row < 10; row += 1) {
      possibleRandomMoves.push([col, row]);
    }
  }

  // Shuffle possible moves
  for (let i = possibleRandomMoves.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [possibleRandomMoves[i], possibleRandomMoves[j]] = [possibleRandomMoves[j], possibleRandomMoves[i]];
  }

  const randomAttack = (player) => {    
    const moves = possibleRandomMoves.pop();
    const col = moves[0];
    const row = moves[1];
    player.board.receiveAttack(col, row);
  };

  return { name, board, attack, randomAttack };
};
