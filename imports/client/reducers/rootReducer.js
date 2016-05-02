export default function openMenu(state = false, action) {
  switch (action.type) {
    case "TOGGLE_MENU":
      return action.data || false;
    default:
      return state;
  }
}

