//Algoritmo que faz ligação do frontend e backend do cadastro de criança.


import axios from "axios";
import { api } from "../httpClient";

type CriarCrianca = {
    nome: string;
    data_nascimento: Date;
    idade: number;
    diagnostico: string;
    genero: string;
    
}