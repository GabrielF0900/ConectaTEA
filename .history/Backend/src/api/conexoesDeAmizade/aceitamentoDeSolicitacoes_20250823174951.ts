//Algoritmo que cuidara de aceitar as solicitações recebidas.


import {Request, Response} from "express";
import prisma from "../../lib/prisma";

export async function AceitarSolicitacao