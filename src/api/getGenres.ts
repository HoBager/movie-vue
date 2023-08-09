export type Genre = {
  id: number
  name: string
}

export async function getGenres(): Promise<Genre[]> {
  try {
    const response = await fetch('http://localhost:3000/genres')
    const genres = await response.json()
    return genres
  } catch {
    return []
  }
}
