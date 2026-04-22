export interface BookResult {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

export async function searchBooks(query: string): Promise<BookResult[]> {
  if (!query.trim()) return [];

  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(
      query
    )}&limit=10`
  );

  const data = await response.json();

  return data.docs || [];
}

export function getCoverUrl(
  coverId: number | undefined,
  size: "S" | "M" | "L" = "M"
): string | null {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}
