import dotenv from 'dotenv'

const configDotenv = dotenv.config(({ path: './config/.env' }))

if (configDotenv.error) {
  throw configDotenv.error
}

console.log(configDotenv.parsed)
