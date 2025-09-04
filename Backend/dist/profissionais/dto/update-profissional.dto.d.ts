declare class LocalAtendimentoDto {
    nome?: string;
    cidade?: string;
}
declare class RedeSocialDto {
    tipo?: string;
    url?: string;
}
export declare class UpdateProfissionalDto {
    nome?: string;
    email?: string;
    telefone?: string;
    especialidade?: string;
    registroProfissional?: string;
    titulo?: string;
    formacaoAcademica?: string;
    sobre?: string;
    fotoPerfilUrl?: string;
    codigoIdentificacao?: string;
    locaisAtendimento?: LocalAtendimentoDto[];
    redesSociais?: RedeSocialDto[];
}
export {};
