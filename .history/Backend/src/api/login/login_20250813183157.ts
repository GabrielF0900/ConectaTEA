//Algoritmo de login e criação de token jwt.


import {Response, Request} from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../../lib/prisma';

export 