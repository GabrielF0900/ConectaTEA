//Algoritmo que cuidará das rotas dos cruds sobre cadastro de criança.


import { ReadCrianca } from "../../crudCriancaCadastrada/read";
import { DeleteCrianca } from "../../crudCriancaCadastrada/delete";
import { Router } from "express";

const router = Router();

router.get("/:id", ReadCrianca);
router.delete("/:id", DeleteCrianca);

export default router;