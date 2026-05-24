import { games, gameSections } from "../data/games";
import { createGameCard } from "./createGameCard";

const gamesById = new Map(games.map((game) => [game.id, game]));

const getGamesByCategory = (category) => {
  const sectionIds = gameSections[category];
  if (!sectionIds) return [];

  return sectionIds.map((id) => gamesById.get(id)).filter(Boolean);
};

export const renderGamesSections = () => {
  document.querySelectorAll(".js-games-list").forEach((list) => {
    const sectionGames = getGamesByCategory(list.dataset.category);
    if (!sectionGames.length) return;

    list.innerHTML = sectionGames.map(createGameCard).join("");
  });
};
