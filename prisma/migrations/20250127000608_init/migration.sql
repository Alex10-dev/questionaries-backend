-- CreateTable
CREATE TABLE "Questionary" (
    "id" UUID NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "description" TEXT,
    "instructions" TEXT,
    "image" VARCHAR(50),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Questionary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionaryVersion" (
    "id" UUID NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "title" VARCHAR(40) NOT NULL,
    "start_active_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_active_date" TIMESTAMP,
    "questionary_id" UUID NOT NULL,

    CONSTRAINT "QuestionaryVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" UUID NOT NULL,
    "question" TEXT NOT NULL,
    "type" VARCHAR(20) NOT NULL DEFAULT 'TEXT',
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "correct_answer" VARCHAR(30),
    "value" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Option" (
    "id" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL DEFAULT false,
    "question_id" UUID NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionaryVersionToQuestion" (
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "question_id" UUID NOT NULL,
    "version_id" UUID NOT NULL,

    CONSTRAINT "QuestionaryVersionToQuestion_pkey" PRIMARY KEY ("version_id","question_id")
);

-- CreateTable
CREATE TABLE "Solution" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMP,
    "ended" BOOLEAN NOT NULL DEFAULT false,
    "questionary_version_id" UUID NOT NULL,

    CONSTRAINT "Solution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text_answer" TEXT,
    "solution_id" UUID NOT NULL,
    "question_id" UUID NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Option_question_id_idx" ON "Option"("question_id");

-- CreateIndex
CREATE INDEX "QuestionaryVersionToQuestion_question_id_idx" ON "QuestionaryVersionToQuestion"("question_id");

-- CreateIndex
CREATE INDEX "QuestionaryVersionToQuestion_version_id_idx" ON "QuestionaryVersionToQuestion"("version_id");

-- CreateIndex
CREATE INDEX "Solution_questionary_version_id_idx" ON "Solution"("questionary_version_id");

-- CreateIndex
CREATE INDEX "Answer_solution_id_idx" ON "Answer"("solution_id");

-- CreateIndex
CREATE INDEX "Answer_question_id_idx" ON "Answer"("question_id");

-- AddForeignKey
ALTER TABLE "QuestionaryVersion" ADD CONSTRAINT "QuestionaryVersion_questionary_id_fkey" FOREIGN KEY ("questionary_id") REFERENCES "Questionary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionaryVersionToQuestion" ADD CONSTRAINT "QuestionaryVersionToQuestion_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionaryVersionToQuestion" ADD CONSTRAINT "QuestionaryVersionToQuestion_version_id_fkey" FOREIGN KEY ("version_id") REFERENCES "QuestionaryVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_questionary_version_id_fkey" FOREIGN KEY ("questionary_version_id") REFERENCES "QuestionaryVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_solution_id_fkey" FOREIGN KEY ("solution_id") REFERENCES "Solution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
