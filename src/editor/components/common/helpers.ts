export const getCursorCoordinates = () => {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return { top: 0, left: 0 };

  const range = sel.getRangeAt(0).cloneRange();
  const tempEl = document.createElement("span");

  range.collapse(false);
  range.insertNode(tempEl);

  const { top, left } = tempEl.getBoundingClientRect();

  const position = {
    top: top + window.scrollY,
    left: left + window.scrollX,
  };

  tempEl.parentNode?.removeChild(tempEl);

  return position;
};
