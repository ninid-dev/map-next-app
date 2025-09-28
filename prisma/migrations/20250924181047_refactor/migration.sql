/*
  Warnings:

  - You are about to alter the column `lat` on the `Requests` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(9,6)`.
  - You are about to alter the column `lng` on the `Requests` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(9,6)`.

*/
-- AlterTable
ALTER TABLE "public"."Requests" ALTER COLUMN "lat" SET DATA TYPE DECIMAL(9,6),
ALTER COLUMN "lng" SET DATA TYPE DECIMAL(9,6);
