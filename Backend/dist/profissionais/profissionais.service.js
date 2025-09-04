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
exports.ProfissionaisService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProfissionaisService = class ProfissionaisService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByUserId(usuarioId) {
        const profissional = await this.prisma.profissional.findUnique({
            where: { usuario_id: usuarioId },
            include: {
                usuario: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        telefone: true,
                        endereco: true,
                        tipo: true,
                    },
                },
                locaisAtendimento: true,
                redesSociais: true,
                areasAtuacao: {
                    include: {
                        area: true,
                    },
                },
            },
        });
        if (!profissional) {
            return null;
        }
        return {
            id: profissional.id,
            usuarioId: profissional.usuario_id,
            nome: profissional.usuario.name,
            email: profissional.usuario.email,
            telefone: profissional.usuario.telefone,
            endereco: profissional.usuario.endereco,
            especialidade: profissional.especialidade,
            registroProfissional: profissional.registro_profissional,
            titulo: profissional.titulo,
            formacaoAcademica: profissional.formacaoAcademica,
            sobre: profissional.sobre,
            fotoPerfilUrl: profissional.fotoPerfilUrl,
            codigoIdentificacao: profissional.codigoIdentificacao,
            locais: profissional.locaisAtendimento || [],
            redesSociais: profissional.redesSociais || [],
            areasAtuacao: profissional.areasAtuacao || [],
            redes: profissional.redesSociais?.reduce((acc, rede) => {
                if (rede.tipo && rede.url) {
                    acc[rede.tipo.toLowerCase()] = rede.url;
                }
                return acc;
            }, {}) || {},
        };
    }
    async findAll() {
        const profissionais = await this.prisma.profissional.findMany({
            include: {
                usuario: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        telefone: true,
                        endereco: true,
                    },
                },
                locaisAtendimento: true,
                redesSociais: true,
                areasAtuacao: {
                    include: {
                        area: true,
                    },
                },
            },
        });
        return profissionais.map(profissional => ({
            id: profissional.id,
            usuarioId: profissional.usuario_id,
            nome: profissional.usuario.name,
            email: profissional.usuario.email,
            telefone: profissional.usuario.telefone,
            endereco: profissional.usuario.endereco,
            especialidade: profissional.especialidade,
            registroProfissional: profissional.registro_profissional,
            titulo: profissional.titulo,
            formacaoAcademica: profissional.formacaoAcademica,
            sobre: profissional.sobre,
            fotoPerfilUrl: profissional.fotoPerfilUrl,
            codigoIdentificacao: profissional.codigoIdentificacao,
            locais: profissional.locaisAtendimento,
            redesSociais: profissional.redesSociais,
            areasAtuacao: profissional.areasAtuacao,
        }));
    }
    async updateByUserId(usuarioId, updateData) {
        const user = await this.prisma.user.findUnique({
            where: { id: usuarioId },
        });
        if (!user) {
            throw new common_1.BadRequestException('Usuário não encontrado.');
        }
        const userUpdateData = {};
        if (updateData.nome)
            userUpdateData.name = updateData.nome;
        if (updateData.email)
            userUpdateData.email = updateData.email;
        if (updateData.telefone)
            userUpdateData.telefone = updateData.telefone;
        if (Object.keys(userUpdateData).length > 0) {
            await this.prisma.user.update({
                where: { id: usuarioId },
                data: userUpdateData,
            });
        }
        let profissional = await this.prisma.profissional.findUnique({
            where: { usuario_id: usuarioId },
        });
        const profissionalData = {};
        if (updateData.especialidade)
            profissionalData.especialidade = updateData.especialidade;
        if (updateData.registroProfissional)
            profissionalData.registro_profissional = updateData.registroProfissional;
        if (updateData.titulo)
            profissionalData.titulo = updateData.titulo;
        if (updateData.formacaoAcademica)
            profissionalData.formacaoAcademica = updateData.formacaoAcademica;
        if (updateData.sobre)
            profissionalData.sobre = updateData.sobre;
        if (updateData.fotoPerfilUrl)
            profissionalData.fotoPerfilUrl = updateData.fotoPerfilUrl;
        if (updateData.codigoIdentificacao)
            profissionalData.codigoIdentificacao = updateData.codigoIdentificacao;
        if (!profissional) {
            profissional = await this.prisma.profissional.create({
                data: {
                    usuario_id: usuarioId,
                    especialidade: updateData.especialidade || 'Não informado',
                    registro_profissional: updateData.registroProfissional || 'Não informado',
                    ...profissionalData,
                },
            });
        }
        else {
            if (Object.keys(profissionalData).length > 0) {
                profissional = await this.prisma.profissional.update({
                    where: { id: profissional.id },
                    data: profissionalData,
                });
            }
        }
        if (updateData.redesSociais && updateData.redesSociais.length > 0) {
            await this.prisma.redeSocial.deleteMany({
                where: { profissional_id: profissional.id },
            });
            for (const rede of updateData.redesSociais) {
                if (rede.tipo && rede.url) {
                    await this.prisma.redeSocial.create({
                        data: {
                            profissional_id: profissional.id,
                            tipo: rede.tipo.toUpperCase(),
                            url: rede.url,
                        },
                    });
                }
            }
        }
        if (updateData.locaisAtendimento && updateData.locaisAtendimento.length > 0) {
            await this.prisma.localAtendimento.deleteMany({
                where: { profissional_id: profissional.id },
            });
            for (const local of updateData.locaisAtendimento) {
                if (local.nome) {
                    await this.prisma.localAtendimento.create({
                        data: {
                            profissional_id: profissional.id,
                            nome: local.nome,
                            cidade: local.cidade || '',
                        },
                    });
                }
            }
        }
        const perfilAtualizado = await this.findByUserId(usuarioId);
        return {
            message: 'Perfil atualizado com sucesso!',
            data: perfilAtualizado,
        };
    }
};
exports.ProfissionaisService = ProfissionaisService;
exports.ProfissionaisService = ProfissionaisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfissionaisService);
//# sourceMappingURL=profissionais.service.js.map