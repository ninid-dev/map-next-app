export const config = {
  isProduction: process.env.NODE_ENV === 'production',
  apiRoute: process.env.NODE_ENV === 'production' ? '/app/api/v1/' : '/api/v1',
}
