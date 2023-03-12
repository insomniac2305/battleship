export default (() => {
  const fieldOne = document.querySelector(".field-one");
  const fieldTwo = document.querySelector(".field-two");

  const createElement = (tag, className, innerText) => {
    const newElement = document.createElement(tag);
    className && typeof className === "string" && newElement.classList.add(className);
    className && Array.isArray(className) && newElement.classList.add(...className);
    innerText && (newElement.innerText = innerText);
    return newElement;
  };

  const clearGameBoards = () => {
    const list = Array.from(fieldOne.childNodes);
    list.push(...Array.from(fieldTwo.childNodes));
    list.forEach((node) => node.remove());
  };

  const createGameboard = (board, active) => {
    const newGameboard = createElement("div", "gameboard");
    newGameboard.classList.add(active ? "active" : "inactive");

    let rowHeaderCharCode = 65;

    for (let colNum = -1; colNum < 10; colNum += 1) {
      const col = createElement("div", "col");

      if (colNum === -1) {
        col.classList.add("header");
      } else {
        col.dataset.col = colNum;
      }

      for (let rowNum = -1; rowNum < 10; rowNum += 1) {
        const row = createElement("div", "row");
        if (colNum === -1) {
          row.classList.add("header");
          rowNum === -1 || (row.innerText = rowNum + 1);
        } else if (rowNum === -1) {
          row.classList.add("header");
          row.innerText = String.fromCharCode(rowHeaderCharCode);
          rowHeaderCharCode += 1;
        } else {
          row.dataset.row = rowNum;
          const boardData = board[colNum][rowNum];
          boardData.ship && active && row.classList.add("ship");
          boardData.hit && row.classList.add("hit");
          boardData.missed && row.classList.add("missed");
        }
        col.appendChild(row);
      }
      newGameboard.appendChild(col);
    }

    return newGameboard;
  };

  const showField = (field, player, active) => {
    const playerName = createElement("div", "player-name");
    playerName.classList.add(active ? "active" : "inactive");
    const nameTag = createElement("h2", undefined, player.name);
    playerName.appendChild(nameTag);
    field.appendChild(playerName);
    const gameboard = createGameboard(player.board.getBoard(), active);
    field.appendChild(gameboard);
  };

  const showBoards = (activePlayer, inactivePlayer) => {
    clearGameBoards();
    showField(fieldOne, activePlayer, true);
    showField(fieldTwo, inactivePlayer, false);
  };

  const invalidMove = () => {
    alert("Wrong move!");
  };
  const gameOver = (winner) => {
    alert(`Winner is ${winner.name}`);
  };

  return { showBoards, invalidMove, gameOver };
})();
