const spritePath = `${import.meta.env.BASE_URL}icons/sprite.svg`;

export const createGameCard = ({ title, image, image2x }) => {
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
