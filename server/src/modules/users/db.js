import { prisma } from '../../services/Prisma.js'

const { user } = prisma

export const getAllUsersDB = async (query) => {
  console.log(query)
  try {
    const users = await user.findMany({
      take: +query.limit || undefined,
      skip: +query.offset || undefined,
      include: {
        company: true,
        role: true,
      },
    })

    const count = await user.count()

    return {
      data: users,
      dataCount: count,
      error: null,
    }
  } catch (error) {
    console.log(error.message)
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
