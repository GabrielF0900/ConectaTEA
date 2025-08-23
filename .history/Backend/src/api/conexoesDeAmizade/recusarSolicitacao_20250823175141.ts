//Algoritmo que cuidará de recusar solicitações

import {Request, Response} from "express";
import prisma from "../../lib/prisma";

export async function RecusarSolicitacao(req: Request, res: Response) {