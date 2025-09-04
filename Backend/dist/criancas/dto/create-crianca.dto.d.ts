export declare enum Gender {
    MASCULINO = "Masculino",
    FEMININO = "Feminino",
    OUTRO = "Outro"
}
export declare enum Parentesco {
    PAI = "PAI",
    MAE = "MAE",
    AVO = "AVO",
    AVOA = "AVOA",
    TIO = "TIO",
    TIA = "TIA",
    TUTOR = "TUTOR",
    OUTRO = "OUTRO"
}
export declare class ResponsibleDto {
    name: string;
    phone: string;
    email?: string;
    address?: string;
}
export declare class CreateCriancaDto {
    fullName: string;
    age?: number;
    birthDate: string;
    gender: Gender;
    diagnosis: string;
    parentesco: Parentesco;
    responsible: ResponsibleDto;
    notes?: string;
}
