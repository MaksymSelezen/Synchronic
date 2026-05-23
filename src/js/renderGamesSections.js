import { games, gameSections } from "../data/games";
import { createGameCard } from "./createGameCard";

const getGamesByCategory = (category) => {
  const gameIds = gameSections[category];

  if (!gameIds) {
    return [];
  }

  return gameIds
    .map((gameId) => games.find((game) => game.id === gameId))
    .filter(Boolean);
};

export const renderGamesSections = () => {
  const lists = document.querySelectorAll(".js-games-list");

  if (!lists.length) {
    return;
  }

  lists.forEach((list) => {
    const category = list.dataset.category;
    const sectionGames = getGamesByCategory(category);

    if (!sectionGames.length) {
      return;
    }

    list.innerHTML = sectionGames.map(createGameCard).join("");
  });
};
