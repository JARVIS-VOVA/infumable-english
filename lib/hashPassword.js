import bcrypt from 'bcrypt'

const hashPassword = async (plaintextPassword) => {
  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)

  return await bcrypt.hash(plaintextPassword, salt)
}

export default hashPassword
