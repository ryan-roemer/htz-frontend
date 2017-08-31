/* globals fetch */

export async function fetchArticle(section, id) {
  const res = await fetch(`http://localhost:3000/mock-api/article/${id}.json`);
  return res.json();
}

export async function fetchTopStories() {
  const res = await fetch('http://localhost:3000/mock-api/stories.json');
  return res.json();
}
