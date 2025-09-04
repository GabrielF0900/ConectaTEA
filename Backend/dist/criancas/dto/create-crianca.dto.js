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
exports.CreateCriancaDto = exports.ResponsibleDto = exports.Parentesco = exports.Gender = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
var Gender;
(function (Gender) {
    Gender["MASCULINO"] = "Masculino";
    Gender["FEMININO"] = "Feminino";
    Gender["OUTRO"] = "Outro";
})(Gender || (exports.Gender = Gender = {}));
var Parentesco;
(function (Parentesco) {
    Parentesco["PAI"] = "PAI";
    Parentesco["MAE"] = "MAE";
    Parentesco["AVO"] = "AVO";
    Parentesco["AVOA"] = "AVOA";
    Parentesco["TIO"] = "TIO";
    Parentesco["TIA"] = "TIA";
    Parentesco["TUTOR"] = "TUTOR";
    Parentesco["OUTRO"] = "OUTRO";
})(Parentesco || (exports.Parentesco = Parentesco = {}));
class ResponsibleDto {
}
exports.ResponsibleDto = ResponsibleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Maria Silva' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResponsibleDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '(11) 99999-9999' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResponsibleDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'maria@email.com', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ResponsibleDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Rua das Flores, 123', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResponsibleDto.prototype, "address", void 0);
class CreateCriancaDto {
}
exports.CreateCriancaDto = CreateCriancaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'João da Silva' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCriancaDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCriancaDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '15/05/2018' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCriancaDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Masculino', enum: Gender }),
    (0, class_validator_1.IsEnum)(Gender),
    __metadata("design:type", String)
], CreateCriancaDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TEA Leve' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCriancaDto.prototype, "diagnosis", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PAI', enum: Parentesco }),
    (0, class_validator_1.IsEnum)(Parentesco),
    __metadata("design:type", String)
], CreateCriancaDto.prototype, "parentesco", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ResponsibleDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ResponsibleDto),
    __metadata("design:type", ResponsibleDto)
], CreateCriancaDto.prototype, "responsible", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Observações importantes...', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCriancaDto.prototype, "notes", void 0);
//# sourceMappingURL=create-crianca.dto.js.map