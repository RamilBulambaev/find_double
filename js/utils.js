const icons = [
  "gem",
  "crown",
  "eye",
  "heart",
  "chess",
  "key",
  "clock",
  "star",
  "moon",
  "sun",
  "shield",
  "anchor",
  "leaf",
  "tree",
  "mountain",
  "fire",
];

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const duplicateArray = (array) => array.flatMap((item) => [item, item]);

export const createIconArray = (count) => icons.slice(0, count / 2);
