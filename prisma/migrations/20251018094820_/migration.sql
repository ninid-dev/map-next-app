-- CreateTable
CREATE TABLE "public"."Layers" (
    "id" TEXT NOT NULL,
    "titleTh" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "layerTypeTh" TEXT NOT NULL,
    "layerTypeEn" TEXT NOT NULL,
    "layerName" TEXT NOT NULL,
    "nameTh" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Layers_pkey" PRIMARY KEY ("id")
);
