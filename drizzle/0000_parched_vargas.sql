CREATE TABLE "lessons" (
	"id" serial PRIMARY KEY NOT NULL,
	"titre" text NOT NULL,
	"concept" text DEFAULT '',
	"preview" text DEFAULT '',
	"step1" text NOT NULL,
	"step2" text NOT NULL,
	"step3" text NOT NULL,
	"step4" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
