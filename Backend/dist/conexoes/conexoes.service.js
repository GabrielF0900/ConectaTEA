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
exports.ConexoesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const update_conexao_dto_1 = require("./dto/update-conexao.dto");
const client_1 = require("@prisma/client");
let ConexoesService = class ConexoesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async enviarSolicitacao(usuarioId, createConexaoDto) {
        const profissionalOrigem = await this.prisma.profissional.findUnique({
            where: { usuario_id: usuarioId },
        });
        if (!profissionalOrigem) {
            throw new common_1.BadRequestException('Perfil profissional não encontrado.');
        }
        const profissionalDestino = await this.prisma.profissional.findUnique({
            where: { id: createConexaoDto.profissionalDestinoId },
        });
        if (!profissionalDestino) {
            throw new common_1.BadRequestException('Profissional destino não encontrado.');
        }
        if (profissionalOrigem.id === profissionalDestino.id) {
            throw new common_1.BadRequestException('Você não pode enviar solicitação para si mesmo.');
        }
        const conexaoExistente = await this.prisma.conexaoProfissional.findFirst({
            where: {
                OR: [
                    {
                        solicitante_id: profissionalOrigem.id,
                        solicitado_id: profissionalDestino.id,
                    },
                    {
                        solicitante_id: profissionalDestino.id,
                        solicitado_id: profissionalOrigem.id,
                    },
                ],
            },
        });
        if (conexaoExistente) {
            throw new common_1.ConflictException('Já existe uma conexão entre estes profissionais.');
        }
        const novaConexao = await this.prisma.conexaoProfissional.create({
            data: {
                solicitante_id: profissionalOrigem.id,
                solicitado_id: profissionalDestino.id,
                status: client_1.StatusConexao.PENDENTE,
            },
            include: {
                solicitante: {
                    include: {
                        usuario: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                telefone: true,
                            },
                        },
                    },
                },
                solicitado: {
                    include: {
                        usuario: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                telefone: true,
                            },
                        },
                    },
                },
            },
        });
        return {
            message: 'Solicitação de conexão enviada com sucesso!',
            data: novaConexao,
        };
    }
    async listarSolicitacoesRecebidas(usuarioId) {
        const profissional = await this.prisma.profissional.findUnique({
            where: { usuario_id: usuarioId },
        });
        if (!profissional) {
            throw new common_1.BadRequestException('Perfil profissional não encontrado.');
        }
        const solicitacoes = await this.prisma.conexaoProfissional.findMany({
            where: {
                solicitado_id: profissional.id,
                status: client_1.StatusConexao.PENDENTE,
            },
            include: {
                solicitante: {
                    include: {
                        usuario: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                telefone: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                criado_em: 'desc',
            },
        });
        return {
            message: 'Solicitações recebidas listadas com sucesso!',
            data: solicitacoes,
        };
    }
    async listarSolicitacoesEnviadas(usuarioId) {
        const profissional = await this.prisma.profissional.findUnique({
            where: { usuario_id: usuarioId },
        });
        if (!profissional) {
            throw new common_1.BadRequestException('Perfil profissional não encontrado.');
        }
        const solicitacoes = await this.prisma.conexaoProfissional.findMany({
            where: {
                solicitante_id: profissional.id,
                status: client_1.StatusConexao.PENDENTE,
            },
            include: {
                solicitado: {
                    include: {
                        usuario: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                telefone: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                criado_em: 'desc',
            },
        });
        return {
            message: 'Solicitações enviadas listadas com sucesso!',
            data: solicitacoes,
        };
    }
    async listarConexoes(usuarioId) {
        const profissional = await this.prisma.profissional.findUnique({
            where: { usuario_id: usuarioId },
        });
        if (!profissional) {
            throw new common_1.BadRequestException('Perfil profissional não encontrado.');
        }
        const conexoes = await this.prisma.conexaoProfissional.findMany({
            where: {
                OR: [
                    {
                        solicitante_id: profissional.id,
                        status: client_1.StatusConexao.ACEITO,
                    },
                    {
                        solicitado_id: profissional.id,
                        status: client_1.StatusConexao.ACEITO,
                    },
                ],
            },
            include: {
                solicitante: {
                    include: {
                        usuario: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                telefone: true,
                            },
                        },
                    },
                },
                solicitado: {
                    include: {
                        usuario: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                telefone: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                criado_em: 'desc',
            },
        });
        return {
            message: 'Conexões listadas com sucesso!',
            data: conexoes,
        };
    }
    async responderSolicitacao(usuarioId, conexaoId, updateConexaoDto) {
        const profissional = await this.prisma.profissional.findUnique({
            where: { usuario_id: usuarioId },
        });
        if (!profissional) {
            throw new common_1.BadRequestException('Perfil profissional não encontrado.');
        }
        const conexao = await this.prisma.conexaoProfissional.findUnique({
            where: { id: conexaoId },
        });
        if (!conexao) {
            throw new common_1.BadRequestException('Solicitação não encontrada.');
        }
        if (conexao.solicitado_id !== profissional.id) {
            throw new common_1.ForbiddenException('Você não tem permissão para responder esta solicitação.');
        }
        if (conexao.status !== client_1.StatusConexao.PENDENTE) {
            throw new common_1.BadRequestException('Esta solicitação já foi respondida.');
        }
        const novoStatus = updateConexaoDto.acao === update_conexao_dto_1.AcaoConexao.ACEITAR
            ? client_1.StatusConexao.ACEITO
            : client_1.StatusConexao.RECUSADO;
        const updateData = {
            status: novoStatus,
        };
        const conexaoAtualizada = await this.prisma.conexaoProfissional.update({
            where: { id: conexaoId },
            data: updateData,
            include: {
                solicitante: {
                    include: {
                        usuario: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                telefone: true,
                            },
                        },
                    },
                },
                solicitado: {
                    include: {
                        usuario: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                telefone: true,
                            },
                        },
                    },
                },
            },
        });
        const mensagem = updateConexaoDto.acao === update_conexao_dto_1.AcaoConexao.ACEITAR
            ? 'Solicitação aceita com sucesso!'
            : 'Solicitação recusada com sucesso!';
        return {
            message: mensagem,
            data: conexaoAtualizada,
        };
    }
    async removerConexao(usuarioId, conexaoId) {
        const profissional = await this.prisma.profissional.findUnique({
            where: { usuario_id: usuarioId },
        });
        if (!profissional) {
            throw new common_1.BadRequestException('Perfil profissional não encontrado.');
        }
        const conexao = await this.prisma.conexaoProfissional.findUnique({
            where: { id: conexaoId },
        });
        if (!conexao) {
            throw new common_1.BadRequestException('Conexão não encontrada.');
        }
        if (conexao.solicitante_id !== profissional.id &&
            conexao.solicitado_id !== profissional.id) {
            throw new common_1.ForbiddenException('Você não tem permissão para remover esta conexão.');
        }
        await this.prisma.conexaoProfissional.delete({
            where: { id: conexaoId },
        });
        return {
            message: 'Conexão removida com sucesso!',
        };
    }
    async listarConexoesPorProfissional(profissionalId) {
        const conexoes = await this.prisma.conexaoProfissional.findMany({
            where: {
                OR: [
                    {
                        solicitante_id: profissionalId,
                        status: client_1.StatusConexao.ACEITO,
                    },
                    {
                        solicitado_id: profissionalId,
                        status: client_1.StatusConexao.ACEITO,
                    },
                ],
            },
            include: {
                solicitante: {
                    include: {
                        usuario: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                telefone: true,
                            },
                        },
                    },
                },
                solicitado: {
                    include: {
                        usuario: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                telefone: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                criado_em: 'desc',
            },
        });
        return {
            message: 'Conexões listadas com sucesso!',
            data: conexoes,
        };
    }
    async filtrarConexoes(params) {
        const whereClause = {};
        if (params.solicitanteProfId) {
            whereClause.solicitante_id = params.solicitanteProfId;
        }
        if (params.solicitadoProfId) {
            whereClause.solicitado_id = params.solicitadoProfId;
        }
        const conexoes = await this.prisma.conexaoProfissional.findMany({
            where: whereClause,
            include: {
                solicitante: {
                    include: {
                        usuario: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                telefone: true,
                            },
                        },
                    },
                },
                solicitado: {
                    include: {
                        usuario: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                telefone: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                criado_em: 'desc',
            },
        });
        return {
            message: 'Conexões filtradas com sucesso!',
            data: conexoes,
        };
    }
};
exports.ConexoesService = ConexoesService;
exports.ConexoesService = ConexoesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ConexoesService);
//# sourceMappingURL=conexoes.service.js.map