export function extractAuthorsFromArticle(article) {
  if (!article) return null;
  const authors = article.reduce((result, slot) => {
    if (slot.authors) {
      result.push(slot.authors.map(author => author.contentName).join());
    }
    return result;
  }, []);
  return authors.join();
}
