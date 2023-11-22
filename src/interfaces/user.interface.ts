interface IUser {
  name: string
  age: number
  email: string
  photo: string
  role: 'user' | 'admin'
  userStatus: 'active' | 'inactive'
}

export { IUser }
