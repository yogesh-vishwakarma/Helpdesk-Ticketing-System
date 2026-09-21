export function getInitial(name) {
  if (!name) return "?";
  return name.trim().charAt(0).toUpperCase();
}

