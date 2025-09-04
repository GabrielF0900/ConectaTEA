import { ProfissionaisService } from './profissionais.service';
import { UpdateProfissionalDto } from './dto/update-profissional.dto';
export declare class ProfissionaisController {
    private readonly profissionaisService;
    constructor(profissionaisService: ProfissionaisService);
    findAll(usuarioId?: string): Promise<{
        id: number;
        usuarioId: number;
        nome: string;
        email: string;
        telefone: string;
        endereco: string;
        especialidade: string;
        registroProfissional: string;
        titulo: string;
        formacaoAcademica: string;
        sobre: string;
        fotoPerfilUrl: string;
        codigoIdentificacao: string;
        locais: {
            id: number;
            nome: string;
            cidade: string;
            profissional_id: number;
        }[];
        redesSociais: {
            id: number;
            tipo: string;
            url: string | null;
            profissional_id: number;
        }[];
        areasAtuacao: ({
            area: {
                id: number;
                nome: string;
            };
        } & {
            profissional_id: number;
            area_id: number;
        })[];
    }[]>;
    updateByUserId(usuarioId: string, updateProfissionalDto: UpdateProfissionalDto): Promise<{
        message: string;
        data: {
            id: number;
            usuarioId: number;
            nome: string;
            email: string;
            telefone: string;
            endereco: string;
            especialidade: string;
            registroProfissional: string;
            titulo: string;
            formacaoAcademica: string;
            sobre: string;
            fotoPerfilUrl: string;
            codigoIdentificacao: string;
            locais: {
                id: number;
                nome: string;
                cidade: string;
                profissional_id: number;
            }[];
            redesSociais: {
                id: number;
                tipo: string;
                url: string | null;
                profissional_id: number;
            }[];
            areasAtuacao: ({
                area: {
                    id: number;
                    nome: string;
                };
            } & {
                profissional_id: number;
                area_id: number;
            })[];
            redes: Record<string, string>;
        };
    }>;
}
