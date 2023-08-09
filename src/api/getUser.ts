export async function getUser(username: string, password: string): Promise<User | null> {
  try {
    if (username === userAuth.username && password === userAuth.password) {
      const response = await fetch('http://localhost:3000/user')
      const user = response.json()
      return user
    } else {
      throw new Error()
    }
  } catch {
    return null
  }
}

export const userAuth = {
  username: 'admin',
  password: '1234'
}

export interface User {
  favoriteFilms: number[]
  watchLater: number[]
}
