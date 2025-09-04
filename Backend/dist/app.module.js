"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const criancas_module_1 = require("./criancas/criancas.module");
const profissionais_module_1 = require("./profissionais/profissionais.module");
const conexoes_module_1 = require("./conexoes/conexoes.module");
const metas_module_1 = require("./metas/metas.module");
const private_module_1 = require("./private/private.module");
const prisma_module_1 = require("./prisma/prisma.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET || 'conectatea-secret-key',
                signOptions: { expiresIn: '7d' },
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            criancas_module_1.CriancasModule,
            profissionais_module_1.ProfissionaisModule,
            conexoes_module_1.ConexoesModule,
            metas_module_1.MetasModule,
            private_module_1.PrivateModule,
            conexoes_module_1.ConexoesModule,
            metas_module_1.MetasModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map