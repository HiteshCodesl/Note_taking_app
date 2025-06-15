/*
  Warnings:

  - The primary key for the `Notes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Notes" DROP CONSTRAINT "Notes_pkey",
ALTER COLUMN "noteId" DROP DEFAULT,
ALTER COLUMN "noteId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Notes_pkey" PRIMARY KEY ("noteId");
DROP SEQUENCE "Notes_noteId_seq";
