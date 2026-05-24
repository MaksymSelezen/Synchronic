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

  if (!openButton || !modal || !form || !input || !results || !resultsTitle) {
    return;
  }

  const closeElements = modal.querySelectorAll(".js-search-close");
  if (!closeElements.length) {
    return;
  }

  let previousActiveElement = null;
  const defaultGames = games.slice(0, DEFAULT_GAMES_COUNT);

  const renderSearchResults = (items) => {
    results.innerHTML = items.length
      ? items.map(createGameCard).join("")
      : '<p class="search-modal__empty">No games found</p>';
  };

  const resetSearchResults = () => {
    resultsTitle.textContent = "Top games";
    renderSearchResults(defaultGames);
  };

  const isOpen = () => modal.classList.contains("search-modal_is-open");

  const openSearchModal = () => {
    previousActiveElement = document.activeElement;
    modal.classList.add("search-modal_is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-lock");
    input.value = "";
    resetSearchResults();
    requestAnimationFrame(() => input.focus());
  };

  const closeSearchModal = () => {
    modal.classList.remove("search-modal_is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-lock");
    previousActiveElement?.focus();
  };

  const filterGames = () => {
    const searchValue = input.value.trim().toLowerCase();

    if (!searchValue) {
      resetSearchResults();
      return;
    }

    resultsTitle.textContent = "Search results";
    renderSearchResults(
      games.filter((game) => game.title.toLowerCase().includes(searchValue)),
    );
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

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      closeSearchModal();
    }
  });
};
