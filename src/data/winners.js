const BASE_URL = import.meta.env.BASE_URL;

const winnerCard = {
  title: "Game name",
  amount: "$ 400",
  user: "User****",
  image: `${BASE_URL}images/winners/winner-1.webp`,
  image2x: `${BASE_URL}images/winners/winner-1@2x.webp`,
};

export const winners = Array.from({ length: 14 }, () => ({ ...winnerCard }));
