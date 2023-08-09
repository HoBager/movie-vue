export interface Film {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export async function getFilms(): Promise<Film[]> {
  try {
    const response = await fetch('http://localhost:3000/films')
    const films = await response.json()

    return films
  } catch {
    return []
  }
}

export async function getFilm(id: number): Promise<Film | null> {
  try {
    const response = await fetch(`http://localhost:3000/films/${id}`)
    const film = await response.json()

    return film
  } catch {
    return null
  }
}
