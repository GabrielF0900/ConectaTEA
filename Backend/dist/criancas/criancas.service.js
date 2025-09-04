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
exports.CriancasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CriancasService = class CriancasService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCriancaDto, userId) {
        const { fullName, birthDate, gender, diagnosis, parentesco, notes, responsible } = createCriancaDto;
        const { name, phone, email, address } = responsible;
        console.log("=== CADASTRO DE CRIANÇA ===");
        let birthDateObj;
        try {
            if (birthDate.includes('/')) {
                const [day, month, year] = birthDate.split('/');
                birthDateObj = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
            }
            else {
                birthDateObj = new Date(birthDate);
            }
            if (isNaN(birthDateObj.getTime())) {
                throw new Error('Data inválida');
            }
        }
        catch (error) {
            throw new common_1.BadRequestException('Data de nascimento inválida. Use o formato dd/mm/aaaa.');
        }
        const now = new Date();
        let calculatedAge = now.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = now.getMonth() - birthDateObj.getMonth();
        const dayDiff = now.getDate() - birthDateObj.getDate();
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            calculatedAge--;
        }
        if (birthDateObj > now) {
            throw new common_1.BadRequestException('Data de nascimento não pode ser futura.');
        }
        if (calculatedAge < 0 || calculatedAge > 18) {
            throw new common_1.BadRequestException('Idade deve estar entre 0 e 18 anos para cadastro.');
        }
        const phoneFormats = [
            /^\(\d{2}\)\s?\d{4,5}-?\d{4}$/,
            /^\d{2}\s?\d{4,5}-?\d{4}$/,
            /^\d{10,11}$/
        ];
        const isValidPhone = phoneFormats.some(regex => regex.test(phone));
        if (!isValidPhone) {
            throw new common_1.BadRequestException('Telefone deve estar em um dos formatos: (71) 99720-9361, 71 99720-9361, ou 71997209361.');
        }
        try {
            const userData = {
                name,
                telefone: phone,
                password: "senha-temporaria",
                tipo: "RESPONSAVEL",
            };
            if (email)
                userData.email = email;
            if (address)
                userData.endereco = address;
            const responsavel = await this.prisma.user.create({
                data: userData,
            });
            const novaCrianca = await this.prisma.crianca.create({
                data: {
                    nome: fullName,
                    data_nascimento: birthDateObj,
                    genero: gender,
                    diagnostico: diagnosis,
                    diagnosticoDetalhes: '',
                    parentesco,
                    observacoes: notes || "",
                    responsavel_id: responsavel.id,
                },
                include: {
                    responsavel: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            telefone: true,
                            endereco: true,
                        },
                    },
                },
            });
            return {
                message: "Criança cadastrada com sucesso!",
                crianca: {
                    id: novaCrianca.id,
                    nome: novaCrianca.nome,
                    idade: calculatedAge,
                    dataDeNascimento: novaCrianca.data_nascimento,
                    genero: novaCrianca.genero,
                    diagnostico: novaCrianca.diagnostico,
                    parentesco: novaCrianca.parentesco,
                    observacoes: novaCrianca.observacoes,
                    responsavel: novaCrianca.responsavel,
                },
            };
        }
        catch (error) {
            console.error("Erro ao cadastrar criança:", error);
            throw new common_1.BadRequestException('Erro ao cadastrar criança no banco de dados.');
        }
    }
    async findAll() {
        const criancasRaw = await this.prisma.crianca.findMany({
            include: {
                responsavel: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        telefone: true,
                        endereco: true,
                    },
                },
            },
            orderBy: {
                id: 'desc',
            },
        });
        const criancas = criancasRaw.map(crianca => ({
            id: crianca.id,
            nome: crianca.nome,
            idade: Math.floor((new Date().getTime() - new Date(crianca.data_nascimento).getTime()) / (1000 * 60 * 60 * 24 * 365)),
            dataNascimento: crianca.data_nascimento.toISOString().split('T')[0],
            genero: crianca.genero,
            diagnostico: crianca.diagnostico,
            parentesco: crianca.parentesco,
            observacoes: crianca.observacoes,
            responsavel: {
                id: crianca.responsavel.id,
                nome: crianca.responsavel.name,
                email: crianca.responsavel.email,
                telefone: crianca.responsavel.telefone,
                endereco: crianca.responsavel.endereco,
            },
        }));
        return {
            message: "Crianças listadas com sucesso!",
            criancas,
            total: criancas.length,
        };
    }
    async findOne(id) {
        const crianca = await this.prisma.crianca.findFirst({
            where: { id },
            include: {
                responsavel: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        telefone: true,
                        endereco: true,
                    },
                },
            },
        });
        if (!crianca) {
            throw new common_1.BadRequestException('Criança não encontrada.');
        }
        const hoje = new Date();
        const nascimento = new Date(crianca.data_nascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mesAtual = hoje.getMonth();
        const mesNascimento = nascimento.getMonth();
        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return {
            message: "Criança encontrada com sucesso!",
            data: {
                id: crianca.id,
                nome: crianca.nome,
                idade,
                dataNascimento: crianca.data_nascimento.toISOString().split('T')[0],
                genero: crianca.genero,
                diagnostico: crianca.diagnostico,
                observacoes: crianca.observacoes,
                parentesco: crianca.parentesco,
                responsavel: {
                    id: crianca.responsavel.id,
                    nome: crianca.responsavel.name,
                    email: crianca.responsavel.email,
                    telefone: crianca.responsavel.telefone,
                    endereco: crianca.responsavel.endereco,
                },
            },
        };
    }
    async update(id, updateCriancaDto) {
        const criancaExistente = await this.prisma.crianca.findFirst({
            where: { id },
            include: {
                responsavel: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        telefone: true,
                        endereco: true,
                    },
                },
            },
        });
        if (!criancaExistente) {
            throw new common_1.BadRequestException('Criança não encontrada.');
        }
        try {
            const dadosAtualizarCrianca = {};
            if (updateCriancaDto.nome)
                dadosAtualizarCrianca.nome = updateCriancaDto.nome;
            if (updateCriancaDto.dataNascimento) {
                dadosAtualizarCrianca.data_nascimento = new Date(updateCriancaDto.dataNascimento);
            }
            if (updateCriancaDto.genero)
                dadosAtualizarCrianca.genero = updateCriancaDto.genero;
            if (updateCriancaDto.diagnostico)
                dadosAtualizarCrianca.diagnostico = updateCriancaDto.diagnostico;
            if (updateCriancaDto.observacoes)
                dadosAtualizarCrianca.observacoes = updateCriancaDto.observacoes;
            if (updateCriancaDto.parentesco)
                dadosAtualizarCrianca.parentesco = updateCriancaDto.parentesco;
            const dadosAtualizarResponsavel = {};
            if (updateCriancaDto.nomeResponsavel)
                dadosAtualizarResponsavel.name = updateCriancaDto.nomeResponsavel;
            if (updateCriancaDto.telefoneResponsavel)
                dadosAtualizarResponsavel.telefone = updateCriancaDto.telefoneResponsavel;
            if (updateCriancaDto.emailResponsavel)
                dadosAtualizarResponsavel.email = updateCriancaDto.emailResponsavel;
            if (updateCriancaDto.enderecoResponsavel)
                dadosAtualizarResponsavel.endereco = updateCriancaDto.enderecoResponsavel;
            if (Object.keys(dadosAtualizarResponsavel).length > 0) {
                await this.prisma.user.update({
                    where: { id: criancaExistente.responsavel_id },
                    data: dadosAtualizarResponsavel,
                });
            }
            const criancaAtualizada = await this.prisma.crianca.update({
                where: { id },
                data: dadosAtualizarCrianca,
                include: {
                    responsavel: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            telefone: true,
                            endereco: true,
                        },
                    },
                },
            });
            const hoje = new Date();
            const nascimento = new Date(criancaAtualizada.data_nascimento);
            let idade = hoje.getFullYear() - nascimento.getFullYear();
            const mesAtual = hoje.getMonth();
            const mesNascimento = nascimento.getMonth();
            if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
                idade--;
            }
            return {
                message: "Criança atualizada com sucesso!",
                crianca: {
                    id: criancaAtualizada.id,
                    nome: criancaAtualizada.nome,
                    idade,
                    dataNascimento: criancaAtualizada.data_nascimento.toISOString().split('T')[0],
                    genero: criancaAtualizada.genero,
                    diagnostico: criancaAtualizada.diagnostico,
                    observacoes: criancaAtualizada.observacoes,
                    parentesco: criancaAtualizada.parentesco,
                    responsavel: {
                        id: criancaAtualizada.responsavel.id,
                        nome: criancaAtualizada.responsavel.name,
                        email: criancaAtualizada.responsavel.email,
                        telefone: criancaAtualizada.responsavel.telefone,
                        endereco: criancaAtualizada.responsavel.endereco,
                    },
                },
            };
        }
        catch (error) {
            console.error('Erro ao atualizar criança:', error);
            throw new common_1.BadRequestException('Erro ao atualizar criança.');
        }
    }
    async remove(id) {
        const crianca = await this.prisma.crianca.findFirst({
            where: { id },
        });
        if (!crianca) {
            throw new common_1.BadRequestException('Criança não encontrada.');
        }
        await this.prisma.crianca.delete({
            where: { id },
        });
        return {
            message: "Criança removida com sucesso!",
        };
    }
};
exports.CriancasService = CriancasService;
exports.CriancasService = CriancasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CriancasService);
//# sourceMappingURL=criancas.service.js.map