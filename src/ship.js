export default (length) => {
  let timesHit = 0;

  const hit = () => {
    timesHit += 1;
  };

  const isSunk = () => timesHit >= length;

  return { hit, isSunk };
};
