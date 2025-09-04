"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("../users/users.service");
const profissionais_service_1 = require("../profissionais/profissionais.service");
const update_user_dto_1 = require("../users/dto/update-user.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let PrivateController = class PrivateController {
    constructor(usersService, profissionaisService) {
        this.usersService = usersService;
        this.profissionaisService = profissionaisService;
    }
    async listarProfissionais(usuarioId) {
        if (usuarioId) {
            const userId = parseInt(usuarioId);
            if (isNaN(userId)) {
                throw new common_1.BadRequestException('usuarioId deve ser um número válido.');
            }
            const profissional = await this.profissionaisService.findByUserId(userId);
            return [profissional];
        }
        return await this.profissionaisService.findAll();
    }
    async atualizarPerfil(id, updateUserDto) {
        const userId = parseInt(id);
        if (isNaN(userId)) {
            throw new common_1.BadRequestException('ID deve ser um número válido.');
        }
        return await this.usersService.update(userId, updateUserDto);
    }
};
exports.PrivateController = PrivateController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listar profissionais (rota legada)' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profissionais'),
    __param(0, (0, common_1.Query)('usuarioId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PrivateController.prototype, "listarProfissionais", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar perfil do usuário (rota legada)' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('atualizar-perfil/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], PrivateController.prototype, "atualizarPerfil", null);
exports.PrivateController = PrivateController = __decorate([
    (0, swagger_1.ApiTags)('Rotas Privadas (Legado)'),
    (0, common_1.Controller)('private'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        profissionais_service_1.ProfissionaisService])
], PrivateController);
//# sourceMappingURL=private.controller.js.map