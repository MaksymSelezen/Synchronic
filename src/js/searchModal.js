import { games } from "../data/games";
import { createGameCard } from "./createGameCard";

const DEFAULT_GAMES_COUNT = 12;

export const initSearchModal = () => {
  const openButton = document.querySelector(".js-search-open");
  const modal = document.querySelector(".js-search-modal");
  const form = document.querySelector(".js-search-form");
  const input = document.querySelector(".js-search-input");
  const clearButton = document.querySelector(".js-search-clear");
  const results = document.querySelector(".js-search-results");
  const resultsTitle = document.querySelector(".search-modal__results-title");
  const closeElements = document.querySelectorAll(".js-search-close");

  if (
    !openButton ||
    !modal ||
    !form ||
    !input ||
    !results ||
    !resultsTitle ||
    !closeElements.length
  ) {
    return;
  }

  let previousActiveElement = null;

  const getDefaultGames = () => {
    return games.slice(0, DEFAULT_GAMES_COUNT);
  };

  const renderSearchResults = (items) => {
    if (!items.length) {
      results.innerHTML = `
        <p class="search-modal__empty">No games found</p>
      `;
      return;
    }

    results.innerHTML = items.map(createGameCard).join("");
  };

  const resetSearchResults = () => {
    resultsTitle.textContent = "Top games";
    renderSearchResults(getDefaultGames());
  };

  const filterGames = () => {
    const searchValue = input.value.trim().toLowerCase();

    if (!searchValue) {
      resetSearchResults();
      return;
    }

    const filteredGames = games.filter((game) =>
      game.title.toLowerCase().includes(searchValue),
    );

    resultsTitle.textContent = "Search results";
    renderSearchResults(filteredGames);
  };

  const openSearchModal = () => {
    previousActiveElement = document.activeElement;

    modal.classList.add("search-modal_is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-lock");

    input.value = "";
    resetSearchResults();

    setTimeout(() => {
      input.focus();
    }, 0);
  };

  const closeSearchModal = () => {
    modal.classList.remove("search-modal_is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-lock");

    if (previousActiveElement) {
      previousActiveElement.focus();
    }
  };

  const handleEscapeKey = (event) => {
    if (
      event.key === "Escape" &&
      modal.classList.contains("search-modal_is-open")
    ) {
      closeSearchModal();
    }
  };

  openButton.addEventListener("click", openSearchModal);

  closeElements.forEach((element) => {
    element.addEventListener("click", closeSearchModal);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    filterGames();
  });

  clearButton?.addEventListener("click", () => {
    input.value = "";
    resetSearchResults();
    input.focus();
  });

  document.addEventListener("keydown", handleEscapeKey);
};
