-- CreateTable
CREATE TABLE "Auth0ManagementApiToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Auth0ManagementApiToken_pkey" PRIMARY KEY ("id")
);
