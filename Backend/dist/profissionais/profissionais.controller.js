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
exports.ProfissionaisController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const profissionais_service_1 = require("./profissionais.service");
const update_profissional_dto_1 = require("./dto/update-profissional.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ProfissionaisController = class ProfissionaisController {
    constructor(profissionaisService) {
        this.profissionaisService = profissionaisService;
    }
    async findAll(usuarioId) {
        if (usuarioId) {
            const userId = parseInt(usuarioId);
            if (isNaN(userId)) {
                throw new common_1.BadRequestException('usuarioId deve ser um número válido.');
            }
            const profissional = await this.profissionaisService.findByUserId(userId);
            return profissional ? [profissional] : [];
        }
        return await this.profissionaisService.findAll();
    }
    async updateByUserId(usuarioId, updateProfissionalDto) {
        const userId = parseInt(usuarioId);
        if (isNaN(userId)) {
            throw new common_1.BadRequestException('usuarioId deve ser um número válido.');
        }
        return await this.profissionaisService.updateByUserId(userId, updateProfissionalDto);
    }
};
exports.ProfissionaisController = ProfissionaisController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os profissionais' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('usuarioId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfissionaisController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar perfil profissional por ID do usuário' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('usuario/:usuarioId'),
    __param(0, (0, common_1.Param)('usuarioId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_profissional_dto_1.UpdateProfissionalDto]),
    __metadata("design:returntype", Promise)
], ProfissionaisController.prototype, "updateByUserId", null);
exports.ProfissionaisController = ProfissionaisController = __decorate([
    (0, swagger_1.ApiTags)('Profissionais'),
    (0, common_1.Controller)('profissionais'),
    __metadata("design:paramtypes", [profissionais_service_1.ProfissionaisService])
], ProfissionaisController);
//# sourceMappingURL=profissionais.controller.js.map