/*
  Warnings:

  - A unique constraint covering the columns `[codigoIdentificacao]` on the table `Profissional` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telefone]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "public"."StatusConexao" AS ENUM ('PENDENTE', 'ACEITO', 'RECUSADO');

-- CreateEnum
CREATE TYPE "public"."AuditAction" AS ENUM ('CONEXAO_ENVIADA', 'CONEXAO_ACEITA', 'CONEXAO_RECUSADA', 'CONEXAO_REMOVIDA', 'PERFIL_ATUALIZADO', 'LOGIN', 'LOGOUT');

-- CreateEnum
CREATE TYPE "public"."RedeSocialTipo" AS ENUM ('LINKEDIN', 'INSTAGRAM', 'FACEBOOK', 'SITE', 'OUTRO');

-- DropIndex
DROP INDEX "public"."User_email_telefone_name_key";

-- AlterTable
ALTER TABLE "public"."Profissional" ADD COLUMN     "codigoIdentificacao" TEXT,
ADD COLUMN     "formacaoAcademica" TEXT,
ADD COLUMN     "fotoPerfilUrl" TEXT,
ADD COLUMN     "sobre" TEXT,
ADD COLUMN     "titulo" TEXT;

-- CreateTable
CREATE TABLE "public"."LocalAtendimento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "profissional_id" INTEGER NOT NULL,

    CONSTRAINT "LocalAtendimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RedeSocial" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "url" TEXT,
    "profissional_id" INTEGER NOT NULL,

    CONSTRAINT "RedeSocial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AreaAtuacao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "AreaAtuacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AreaAtuacaoProfissional" (
    "profissional_id" INTEGER NOT NULL,
    "area_id" INTEGER NOT NULL,

    CONSTRAINT "AreaAtuacaoProfissional_pkey" PRIMARY KEY ("profissional_id","area_id")
);

-- CreateTable
CREATE TABLE "public"."ConexaoProfissional" (
    "id" SERIAL NOT NULL,
    "solicitante_id" INTEGER NOT NULL,
    "solicitado_id" INTEGER NOT NULL,
    "status" "public"."StatusConexao" NOT NULL DEFAULT 'PENDENTE',
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConexaoProfissional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AuditLog" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "action" "public"."AuditAction" NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AreaAtuacao_nome_key" ON "public"."AreaAtuacao"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "ConexaoProfissional_solicitante_id_solicitado_id_key" ON "public"."ConexaoProfissional"("solicitante_id", "solicitado_id");

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "public"."AuditLog"("action");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "public"."AuditLog"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Profissional_codigoIdentificacao_key" ON "public"."Profissional"("codigoIdentificacao");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_telefone_key" ON "public"."User"("telefone");

-- AddForeignKey
ALTER TABLE "public"."LocalAtendimento" ADD CONSTRAINT "LocalAtendimento_profissional_id_fkey" FOREIGN KEY ("profissional_id") REFERENCES "public"."Profissional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RedeSocial" ADD CONSTRAINT "RedeSocial_profissional_id_fkey" FOREIGN KEY ("profissional_id") REFERENCES "public"."Profissional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AreaAtuacaoProfissional" ADD CONSTRAINT "AreaAtuacaoProfissional_profissional_id_fkey" FOREIGN KEY ("profissional_id") REFERENCES "public"."Profissional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AreaAtuacaoProfissional" ADD CONSTRAINT "AreaAtuacaoProfissional_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "public"."AreaAtuacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ConexaoProfissional" ADD CONSTRAINT "ConexaoProfissional_solicitante_id_fkey" FOREIGN KEY ("solicitante_id") REFERENCES "public"."Profissional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ConexaoProfissional" ADD CONSTRAINT "ConexaoProfissional_solicitado_id_fkey" FOREIGN KEY ("solicitado_id") REFERENCES "public"."Profissional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
