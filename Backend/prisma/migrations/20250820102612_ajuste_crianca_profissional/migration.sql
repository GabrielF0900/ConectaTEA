-- CreateEnum
CREATE TYPE "public"."UserType" AS ENUM ('PROFISSIONAL', 'RESPONSAVEL');

-- CreateEnum
CREATE TYPE "public"."Parentesco" AS ENUM ('PAI', 'MAE', 'AVO', 'AVOA', 'TIO', 'TIA', 'TUTOR', 'OUTRO');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telefone" TEXT,
    "endereco" TEXT,
    "tipo" "public"."UserType" NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Crianca" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "genero" TEXT NOT NULL,
    "diagnostico" TEXT NOT NULL,
    "diagnosticoDetalhes" TEXT,
    "observacoes" TEXT,
    "parentesco" "public"."Parentesco" NOT NULL,
    "responsavel_id" INTEGER NOT NULL,

    CONSTRAINT "Crianca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Profissional" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "especialidade" TEXT NOT NULL,
    "registro_profissional" TEXT NOT NULL,

    CONSTRAINT "Profissional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProfissionalCriança" (
    "profissional_id" INTEGER NOT NULL,
    "crianca_id" INTEGER NOT NULL,

    CONSTRAINT "ProfissionalCriança_pkey" PRIMARY KEY ("profissional_id","crianca_id")
);

-- CreateTable
CREATE TABLE "public"."Sessoes" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "crianca_id" INTEGER NOT NULL,
    "profissional_id" INTEGER NOT NULL,

    CONSTRAINT "Sessoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Meta" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "crianca_id" INTEGER NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Meta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Progresso" (
    "id" SERIAL NOT NULL,
    "meta_id" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Progresso_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profissional_usuario_id_key" ON "public"."Profissional"("usuario_id");

-- AddForeignKey
ALTER TABLE "public"."Crianca" ADD CONSTRAINT "Crianca_responsavel_id_fkey" FOREIGN KEY ("responsavel_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Profissional" ADD CONSTRAINT "Profissional_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProfissionalCriança" ADD CONSTRAINT "ProfissionalCriança_profissional_id_fkey" FOREIGN KEY ("profissional_id") REFERENCES "public"."Profissional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProfissionalCriança" ADD CONSTRAINT "ProfissionalCriança_crianca_id_fkey" FOREIGN KEY ("crianca_id") REFERENCES "public"."Crianca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sessoes" ADD CONSTRAINT "Sessoes_crianca_id_fkey" FOREIGN KEY ("crianca_id") REFERENCES "public"."Crianca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sessoes" ADD CONSTRAINT "Sessoes_profissional_id_fkey" FOREIGN KEY ("profissional_id") REFERENCES "public"."Profissional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Meta" ADD CONSTRAINT "Meta_crianca_id_fkey" FOREIGN KEY ("crianca_id") REFERENCES "public"."Crianca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Progresso" ADD CONSTRAINT "Progresso_meta_id_fkey" FOREIGN KEY ("meta_id") REFERENCES "public"."Meta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
