//Configurando o JWT para autenticação

export const jwtConfig = {
    secret: process.env.JWT_SECRET || 'default_secret',
    exp: process.env.JWT_EXPIRATION || '1h'
}