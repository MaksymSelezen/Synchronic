import { games, gameSections } from "../data/games";

const baseUrl = import.meta.env.BASE_URL;
const spritePath = `${baseUrl}images/sprite.svg`;

const getGamesByCategory = (category) => {
  const gameIds = gameSections[category];

  if (!gameIds) {
    return [];
  }

  return gameIds
    .map((gameId) => games.find((game) => game.id === gameId))
    .filter(Boolean);
};

const createGameCard = ({ title, image, image2x }) => {
  return `
    <article class="game-card">
      <div class="game-card__media">
        <img
          class="game-card__image"
          src="${image}"
          srcset="${image} 1x, ${image2x} 2x"
          alt="${title}"
          loading="lazy"
        />

        <div class="game-card__overlay">
          <button class="game-card__button game-card__button_play" type="button">
            Play
          </button>

          <button class="game-card__button game-card__button_demo" type="button">
            Demo
          </button>
        </div>
      </div>

      <div class="game-card__info">
        <svg class="game-card__icon" width="16" height="16" aria-hidden="true">
          <use href="${spritePath}#icon-game"></use>
        </svg>

        <span class="game-card__title">${title}</span>
      </div>
    </article>
  `;
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
