"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriancasModule = void 0;
const common_1 = require("@nestjs/common");
const criancas_service_1 = require("./criancas.service");
const criancas_controller_1 = require("./criancas.controller");
const prisma_module_1 = require("../prisma/prisma.module");
let CriancasModule = class CriancasModule {
};
exports.CriancasModule = CriancasModule;
exports.CriancasModule = CriancasModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [criancas_controller_1.CriancasController],
        providers: [criancas_service_1.CriancasService],
        exports: [criancas_service_1.CriancasService],
    })
], CriancasModule);
//# sourceMappingURL=criancas.module.js.map