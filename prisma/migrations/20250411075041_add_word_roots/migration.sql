-- CreateTable
CREATE TABLE "WordRoot" (
    "id" STRING NOT NULL,
    "prefix" STRING NOT NULL,
    "meaning" STRING NOT NULL,
    "description" STRING,
    "origin" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WordRoot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Word" (
    "id" STRING NOT NULL,
    "term" STRING NOT NULL,
    "definition" STRING NOT NULL,
    "pronunciation" STRING,
    "partOfSpeech" STRING,
    "example" STRING,
    "rootId" STRING NOT NULL,
    "notes" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Example" (
    "id" STRING NOT NULL,
    "text" STRING NOT NULL,
    "translation" STRING,
    "rootId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Progress" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "wordId" STRING NOT NULL,
    "familiarity" INT4 NOT NULL DEFAULT 0,
    "lastReviewed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nextReview" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WordRoot_prefix_key" ON "WordRoot"("prefix");

-- CreateIndex
CREATE UNIQUE INDEX "Word_term_key" ON "Word"("term");

-- CreateIndex
CREATE UNIQUE INDEX "Progress_userId_wordId_key" ON "Progress"("userId", "wordId");

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "WordRoot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "WordRoot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;
