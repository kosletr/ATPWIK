export const genres = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Cars" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Phones" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Other" },
];

export function getCategories() {
  return genres.filter((g) => g);
}
