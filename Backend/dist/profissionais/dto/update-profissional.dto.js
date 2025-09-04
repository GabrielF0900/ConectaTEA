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
exports.UpdateProfissionalDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class LocalAtendimentoDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome do local', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocalAtendimentoDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cidade do local', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocalAtendimentoDto.prototype, "cidade", void 0);
class RedeSocialDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tipo da rede social', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RedeSocialDto.prototype, "tipo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL da rede social', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RedeSocialDto.prototype, "url", void 0);
class UpdateProfissionalDto {
}
exports.UpdateProfissionalDto = UpdateProfissionalDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome do profissional', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateProfissionalDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email do profissional', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfissionalDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Telefone do profissional', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfissionalDto.prototype, "telefone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Especialidade do profissional', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfissionalDto.prototype, "especialidade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Registro profissional', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfissionalDto.prototype, "registroProfissional", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Título do profissional', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfissionalDto.prototype, "titulo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Formação acadêmica', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfissionalDto.prototype, "formacaoAcademica", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sobre o profissional', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfissionalDto.prototype, "sobre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL da foto de perfil', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfissionalDto.prototype, "fotoPerfilUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Código de identificação', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfissionalDto.prototype, "codigoIdentificacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Locais de atendimento', required: false, type: [LocalAtendimentoDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => LocalAtendimentoDto),
    __metadata("design:type", Array)
], UpdateProfissionalDto.prototype, "locaisAtendimento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Redes sociais', required: false, type: [RedeSocialDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => RedeSocialDto),
    __metadata("design:type", Array)
], UpdateProfissionalDto.prototype, "redesSociais", void 0);
//# sourceMappingURL=update-profissional.dto.js.map