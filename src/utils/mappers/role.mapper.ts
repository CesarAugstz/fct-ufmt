import { Role } from '@prisma/client'

const roleMap: { [key in Role]: string } = {
  ADMIN: 'Administrador',
  PROFESSOR: 'Professor',
  ADMIN_PROFESSOR: 'Administrador e Professor',
  USER: 'Usuário',
} as const

const roleOptions = Object.entries(roleMap).map(([value, label]) => ({
  value,
  label,
}))

function getRoleLabel(role: Role) {
  switch (role) {
    case 'ADMIN':
      return 'Administrador'
    case 'PROFESSOR':
      return 'Professor'
    case 'ADMIN_PROFESSOR':
      return 'Administrador e Professor'
    case 'USER':
      return 'Usuário'
    default:
      return 'Outro'
  }
}

export const RoleMapper = {
  getRoleLabel,
  roleMap,
  roleOptions,
}
