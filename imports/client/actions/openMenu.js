export function openMenu() {
  return {
    type: "TOGGLE_MENU",
    data: true
  };
}

export function closeMenu() {
  return {
    type: "TOGGLE_MENU",
    data: false
  };
}
