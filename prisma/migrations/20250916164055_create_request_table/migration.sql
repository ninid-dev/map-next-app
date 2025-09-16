-- CreateEnum
CREATE TYPE "public"."RequestStatus" AS ENUM ('PENDING', 'PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "public"."Requests" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "lat" INTEGER NOT NULL,
    "lng" INTEGER NOT NULL,
    "detail" TEXT,
    "img_path" TEXT NOT NULL,
    "status" "public"."RequestStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Requests_pkey" PRIMARY KEY ("id")
);
