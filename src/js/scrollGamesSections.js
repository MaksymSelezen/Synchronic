const getScrollAmount = (list) => {
  const card = list.querySelector(".game-card");
  if (!card) return list.clientWidth;

  const styles = window.getComputedStyle(list);
  const gap = parseFloat(styles.columnGap || styles.gap) || 0;
  return card.offsetWidth + gap;
};

export const initGamesScroll = () => {
  document.querySelectorAll("[data-scroll-controls]").forEach((controls) => {
    const list = document.querySelector(
      `[data-scroll-list="${controls.dataset.scrollControls}"]`,
    );
    if (!list) return;

    controls.addEventListener("click", (event) => {
      const button = event.target.closest("[data-scroll-direction]");
      if (!button) return;

      const offset =
        button.dataset.scrollDirection === "next"
          ? getScrollAmount(list)
          : -getScrollAmount(list);

      list.scrollBy({ left: offset, behavior: "smooth" });
    });
  });
};
