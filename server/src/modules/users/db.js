import { prisma } from '../../services/Prisma.js'

const { user } = prisma

export const getAllUsersDB = async () => {
  try {
    const users = await user.findMany()
    return {
      data: users,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}

export const getUserById = async (id) => {
  try {
    const userbyId = await user.findUnique({
      where: {
        id,
      },
    })
    return {
      data: userbyId,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}

export const createUsersDb = async (usersData) => {
  try {
    const createdUsers = await user.createMany({
      data: usersData,
    })
    return {
      data: createdUsers,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}
// export const createUser() {

// }
