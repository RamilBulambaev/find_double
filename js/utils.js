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
  "hippo",
  "dragon",
  "feather",
  "flask",
  "globe",
  "hat-wizard",
  "medal",
  "rocket",
  "snowflake",
  "trophy",
  "umbrella",
  "yin-yang",
  "bug",
  "car",
  "dove",
  "fish",
  "frog",
  "guitar",
  "mask",
  "paw",
  "plane",
  "robot",
  "ship",
  "space-shuttle",
  "train",
  "wine-glass",
  "apple",
  "bell",
  "bowling-ball",
  "cookie",
  "dice",
  "gavel",
  "mug-hot",
  "spider",
  "tshirt",
  "utensils",
  "wheelchair",
].sort(() => Math.random() - 0.5);

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const duplicateArray = (array) => array.flatMap((item) => [item, item]);

export const createIconArray = (count) => icons.slice(0, count / 2);
