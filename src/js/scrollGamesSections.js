const getScrollAmount = (list) => {
  const card = list.querySelector(".game-card");

  if (!card) {
    return list.clientWidth;
  }

  const listStyles = window.getComputedStyle(list);
  const gap = parseFloat(listStyles.columnGap || listStyles.gap) || 0;

  return card.offsetWidth + gap;
};

export const initGamesScroll = () => {
  const controls = document.querySelectorAll("[data-scroll-controls]");

  if (!controls.length) {
    return;
  }

  controls.forEach((control) => {
    const target = control.dataset.scrollControls;
    const list = document.querySelector(`[data-scroll-list="${target}"]`);

    if (!list) {
      return;
    }

    control.addEventListener("click", (event) => {
      const button = event.target.closest("[data-scroll-direction]");

      if (!button) {
        return;
      }

      const direction = button.dataset.scrollDirection;
      const scrollAmount = getScrollAmount(list);

      list.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    });
  });
};
