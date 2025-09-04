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
exports.ConexoesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const conexoes_service_1 = require("./conexoes.service");
const create_conexao_dto_1 = require("./dto/create-conexao.dto");
const update_conexao_dto_1 = require("./dto/update-conexao.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ConexoesController = class ConexoesController {
    constructor(conexoesService) {
        this.conexoesService = conexoesService;
    }
    async enviarSolicitacao(createConexaoDto, req) {
        return await this.conexoesService.enviarSolicitacao(req.user?.id, createConexaoDto);
    }
    async listarSolicitacoesRecebidas(req) {
        return await this.conexoesService.listarSolicitacoesRecebidas(req.user?.id);
    }
    async listarSolicitacoesEnviadas(req) {
        return await this.conexoesService.listarSolicitacoesEnviadas(req.user?.id);
    }
    async listarConexoes(req) {
        return await this.conexoesService.listarConexoes(req.user?.id);
    }
    async responderSolicitacao(id, updateConexaoDto, req) {
        const conexaoId = parseInt(id);
        if (isNaN(conexaoId)) {
            throw new common_1.BadRequestException('ID da conexão deve ser um número válido.');
        }
        return await this.conexoesService.responderSolicitacao(req.user?.id, conexaoId, updateConexaoDto);
    }
    async listarConexoesPorProfissional(profissionalId) {
        const id = parseInt(profissionalId);
        if (isNaN(id)) {
            throw new common_1.BadRequestException('ID do profissional deve ser um número válido.');
        }
        return await this.conexoesService.listarConexoesPorProfissional(id);
    }
    async filtrarConexoes(solicitanteProfId, solicitadoProfId, req) {
        const params = {};
        if (solicitanteProfId) {
            const id = parseInt(solicitanteProfId);
            if (isNaN(id)) {
                throw new common_1.BadRequestException('ID do solicitante deve ser um número válido.');
            }
            params.solicitanteProfId = id;
        }
        if (solicitadoProfId) {
            const id = parseInt(solicitadoProfId);
            if (isNaN(id)) {
                throw new common_1.BadRequestException('ID do solicitado deve ser um número válido.');
            }
            params.solicitadoProfId = id;
        }
        return await this.conexoesService.filtrarConexoes(params);
    }
    async removerConexao(id, req) {
        const conexaoId = parseInt(id);
        if (isNaN(conexaoId)) {
            throw new common_1.BadRequestException('ID da conexão deve ser um número válido.');
        }
        return await this.conexoesService.removerConexao(req.user?.id, conexaoId);
    }
};
exports.ConexoesController = ConexoesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Enviar solicitação de conexão' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Solicitação enviada com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados inválidos.' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('enviar'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_conexao_dto_1.CreateConexaoDto, Object]),
    __metadata("design:returntype", Promise)
], ConexoesController.prototype, "enviarSolicitacao", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listar solicitações recebidas' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('recebidas'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConexoesController.prototype, "listarSolicitacoesRecebidas", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listar solicitações enviadas' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('enviadas'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConexoesController.prototype, "listarSolicitacoesEnviadas", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listar conexões aceitas' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConexoesController.prototype, "listarConexoes", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Responder solicitação de conexão (aceitar/recusar)' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id/responder'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_conexao_dto_1.UpdateConexaoDto, Object]),
    __metadata("design:returntype", Promise)
], ConexoesController.prototype, "responderSolicitacao", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listar conexões de um profissional específico' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profissional/:profissionalId'),
    __param(0, (0, common_1.Param)('profissionalId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConexoesController.prototype, "listarConexoesPorProfissional", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Filtrar conexões por parâmetros' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('filtrar'),
    __param(0, (0, common_1.Query)('solicitanteProfId')),
    __param(1, (0, common_1.Query)('solicitadoProfId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ConexoesController.prototype, "filtrarConexoes", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Remover/excluir conexão' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ConexoesController.prototype, "removerConexao", null);
exports.ConexoesController = ConexoesController = __decorate([
    (0, swagger_1.ApiTags)('Conexões'),
    (0, common_1.Controller)('conexoes'),
    __metadata("design:paramtypes", [conexoes_service_1.ConexoesService])
], ConexoesController);
//# sourceMappingURL=conexoes.controller.js.map