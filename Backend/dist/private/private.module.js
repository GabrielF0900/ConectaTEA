"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateModule = void 0;
const common_1 = require("@nestjs/common");
const private_controller_1 = require("./private.controller");
const users_module_1 = require("../users/users.module");
const profissionais_module_1 = require("../profissionais/profissionais.module");
let PrivateModule = class PrivateModule {
};
exports.PrivateModule = PrivateModule;
exports.PrivateModule = PrivateModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule, profissionais_module_1.ProfissionaisModule],
        controllers: [private_controller_1.PrivateController],
    })
], PrivateModule);
//# sourceMappingURL=private.module.js.map