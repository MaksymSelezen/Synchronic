import { winners } from "../data/winners.js";

const createWinnerCard = ({ title, amount, user, image, image2x }) => {
  return `
    <article class="winner-card">
      <img
        class="winner-card__image"
        src="${image}"
        srcset="${image2x} 2x"
        alt="${title}"
      />

      <div class="winner-card__content">
        <h3 class="winner-card__title">${title}</h3>
        <p class="winner-card__amount">${amount}</p>
        <p class="winner-card__user">${user}</p>
      </div>
    </article>
  `;
};

export const renderWinners = () => {
  const winnersList = document.querySelector(".js-winners-list");

  if (!winnersList) {
    return;
  }

  winnersList.innerHTML = winners.map(createWinnerCard).join("");
};
