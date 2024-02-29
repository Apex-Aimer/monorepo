export enum UserRoles {
  Admin = 'admin',
}

export interface UsersTable {
  id: string
  githubId: string
  username?: string
  role: UserRoles
}

export interface UserSessionsTable {
  id: string
  userId: string
  activeExpires: number
  idleExpires: number
  createdOn?: number
  updatedOn?: number
}

export interface DB {
  users: UsersTable
  userSessions: UserSessionsTable
}
