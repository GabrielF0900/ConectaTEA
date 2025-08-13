//Algoritmo para extração de token

import {Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';


export function extracaoToken(req: Request, res: Response, next: NextFunction) {