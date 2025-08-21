//Algoritmo para atualizar uma criança cadastrada

import {Request, Response} from "express";
import prisma from "../../lib/prisma";

export async function UpdateCrianca(req: Request, res: Response) {