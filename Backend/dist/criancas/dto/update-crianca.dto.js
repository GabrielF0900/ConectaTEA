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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCriancaDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdateCriancaDto {
}
exports.UpdateCriancaDto = UpdateCriancaDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nome completo da criança' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCriancaDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Data de nascimento da criança' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateCriancaDto.prototype, "dataNascimento", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Gênero da criança' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['Masculino', 'Feminino', 'Outro']),
    __metadata("design:type", String)
], UpdateCriancaDto.prototype, "genero", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Diagnóstico da criança' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCriancaDto.prototype, "diagnostico", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Observações sobre a criança' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCriancaDto.prototype, "observacoes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Parentesco com a criança' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCriancaDto.prototype, "parentesco", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nome do responsável' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCriancaDto.prototype, "nomeResponsavel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Telefone do responsável' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCriancaDto.prototype, "telefoneResponsavel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Email do responsável' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCriancaDto.prototype, "emailResponsavel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Endereço do responsável' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCriancaDto.prototype, "enderecoResponsavel", void 0);
//# sourceMappingURL=update-crianca.dto.js.map