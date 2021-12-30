-- CreateTable
CREATE TABLE "car_owners" (
    "bio" TEXT,
    "car_color" TEXT,
    "car_model" TEXT,
    "car_model_year" TEXT,
    "country" TEXT,
    "email" TEXT,
    "first_name" TEXT,
    "gender" TEXT,
    "id" TEXT NOT NULL,
    "job_title" TEXT,
    "last_name" TEXT,

    CONSTRAINT "car_owners_pkey" PRIMARY KEY ("id")
);
