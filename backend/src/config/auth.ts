export default {
   jwt: {
      secret: process.env.APP_TOKEN_SECRET || 'default',
      expiresIn: process.env.APP_TOKEN_EXPIRES
   }
}
