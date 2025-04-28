/*
  Warnings:

  - You are about to drop the column `videoUrl` on the `AnimeEpisode` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Episode` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `movieVidieo` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `movieVidieo` on the `PopularMovie` table. All the data in the column will be lost.
  - Added the required column `descriptionPelicula` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typePelicula` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionPelicula` to the `PopularMovie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typePelicula` to the `PopularMovie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Anime" ADD COLUMN     "actores" TEXT,
ADD COLUMN     "anio" INTEGER,
ADD COLUMN     "audio" TEXT,
ADD COLUMN     "sliderUrl" TEXT;

-- AlterTable
ALTER TABLE "AnimeEpisode" DROP COLUMN "videoUrl",
ADD COLUMN     "servers" JSONB;

-- AlterTable
ALTER TABLE "Episode" DROP COLUMN "videoUrl",
ADD COLUMN     "servers" JSONB;

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "description",
DROP COLUMN "movieVidieo",
DROP COLUMN "type",
ADD COLUMN     "actores" TEXT,
ADD COLUMN     "anio" INTEGER,
ADD COLUMN     "audio" TEXT,
ADD COLUMN     "descriptionPelicula" TEXT NOT NULL,
ADD COLUMN     "servers" JSONB,
ADD COLUMN     "sliderUrl" TEXT,
ADD COLUMN     "typePelicula" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PopularMovie" DROP COLUMN "movieVidieo",
ADD COLUMN     "actores" TEXT,
ADD COLUMN     "anio" INTEGER,
ADD COLUMN     "audio" TEXT,
ADD COLUMN     "descriptionPelicula" TEXT NOT NULL,
ADD COLUMN     "servers" JSONB,
ADD COLUMN     "sliderUrl" TEXT,
ADD COLUMN     "typePelicula" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Serie" ADD COLUMN     "actores" TEXT,
ADD COLUMN     "anio" INTEGER,
ADD COLUMN     "audio" TEXT,
ADD COLUMN     "sliderUrl" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordResetExpires" TIMESTAMP(3),
ADD COLUMN     "passwordResetToken" TEXT;

-- CreateTable
CREATE TABLE "UserAdmin" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatarUri" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lista" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "creadaEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "perfilId" TEXT NOT NULL,

    CONSTRAINT "Lista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListaContenido" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "contenidoId" TEXT NOT NULL,
    "listaId" TEXT NOT NULL,
    "agregadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ListaContenido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAdmin_correo_key" ON "UserAdmin"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "ListaContenido_contenidoId_listaId_key" ON "ListaContenido"("contenidoId", "listaId");

-- AddForeignKey
ALTER TABLE "Lista" ADD CONSTRAINT "Lista_perfilId_fkey" FOREIGN KEY ("perfilId") REFERENCES "UserNetflix"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListaContenido" ADD CONSTRAINT "ListaContenido_listaId_fkey" FOREIGN KEY ("listaId") REFERENCES "Lista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
