revoke delete on table "public"."bible_sections" from "anon";

revoke insert on table "public"."bible_sections" from "anon";

revoke references on table "public"."bible_sections" from "anon";

revoke select on table "public"."bible_sections" from "anon";

revoke trigger on table "public"."bible_sections" from "anon";

revoke truncate on table "public"."bible_sections" from "anon";

revoke update on table "public"."bible_sections" from "anon";

revoke delete on table "public"."bible_sections" from "authenticated";

revoke insert on table "public"."bible_sections" from "authenticated";

revoke references on table "public"."bible_sections" from "authenticated";

revoke select on table "public"."bible_sections" from "authenticated";

revoke trigger on table "public"."bible_sections" from "authenticated";

revoke truncate on table "public"."bible_sections" from "authenticated";

revoke update on table "public"."bible_sections" from "authenticated";

revoke delete on table "public"."bible_sections" from "service_role";

revoke insert on table "public"."bible_sections" from "service_role";

revoke references on table "public"."bible_sections" from "service_role";

revoke select on table "public"."bible_sections" from "service_role";

revoke trigger on table "public"."bible_sections" from "service_role";

revoke truncate on table "public"."bible_sections" from "service_role";

revoke update on table "public"."bible_sections" from "service_role";

alter table "public"."bible_sections" drop constraint "bible_sections_pkey";

drop index if exists "public"."bible_sections_pkey";

drop table "public"."bible_sections";

create table "public"."documents" (
    "id" bigint not null default nextval('bible_sections_id_seq'::regclass),
    "content" text,
    "metadata" jsonb,
    "embedding" vector(1536)
);


create table "public"."singleChoiceQuestions" (
    "id" uuid not null default gen_random_uuid(),
    "question" text not null,
    "choiceA" text not null,
    "choiceB" text not null,
    "choiceC" text,
    "choiceD" text,
    "correctAnswer" text not null
);


alter table "public"."singleChoiceQuestions" enable row level security;

alter sequence "public"."bible_sections_id_seq" owned by "public"."documents"."id";

CREATE UNIQUE INDEX "singleChoiceQuestions_pkey" ON public."singleChoiceQuestions" USING btree (id);

CREATE UNIQUE INDEX bible_sections_pkey ON public.documents USING btree (id);

alter table "public"."documents" add constraint "bible_sections_pkey" PRIMARY KEY using index "bible_sections_pkey";

alter table "public"."singleChoiceQuestions" add constraint "singleChoiceQuestions_pkey" PRIMARY KEY using index "singleChoiceQuestions_pkey";

grant delete on table "public"."documents" to "anon";

grant insert on table "public"."documents" to "anon";

grant references on table "public"."documents" to "anon";

grant select on table "public"."documents" to "anon";

grant trigger on table "public"."documents" to "anon";

grant truncate on table "public"."documents" to "anon";

grant update on table "public"."documents" to "anon";

grant delete on table "public"."documents" to "authenticated";

grant insert on table "public"."documents" to "authenticated";

grant references on table "public"."documents" to "authenticated";

grant select on table "public"."documents" to "authenticated";

grant trigger on table "public"."documents" to "authenticated";

grant truncate on table "public"."documents" to "authenticated";

grant update on table "public"."documents" to "authenticated";

grant delete on table "public"."documents" to "service_role";

grant insert on table "public"."documents" to "service_role";

grant references on table "public"."documents" to "service_role";

grant select on table "public"."documents" to "service_role";

grant trigger on table "public"."documents" to "service_role";

grant truncate on table "public"."documents" to "service_role";

grant update on table "public"."documents" to "service_role";

grant delete on table "public"."singleChoiceQuestions" to "anon";

grant insert on table "public"."singleChoiceQuestions" to "anon";

grant references on table "public"."singleChoiceQuestions" to "anon";

grant select on table "public"."singleChoiceQuestions" to "anon";

grant trigger on table "public"."singleChoiceQuestions" to "anon";

grant truncate on table "public"."singleChoiceQuestions" to "anon";

grant update on table "public"."singleChoiceQuestions" to "anon";

grant delete on table "public"."singleChoiceQuestions" to "authenticated";

grant insert on table "public"."singleChoiceQuestions" to "authenticated";

grant references on table "public"."singleChoiceQuestions" to "authenticated";

grant select on table "public"."singleChoiceQuestions" to "authenticated";

grant trigger on table "public"."singleChoiceQuestions" to "authenticated";

grant truncate on table "public"."singleChoiceQuestions" to "authenticated";

grant update on table "public"."singleChoiceQuestions" to "authenticated";

grant delete on table "public"."singleChoiceQuestions" to "service_role";

grant insert on table "public"."singleChoiceQuestions" to "service_role";

grant references on table "public"."singleChoiceQuestions" to "service_role";

grant select on table "public"."singleChoiceQuestions" to "service_role";

grant trigger on table "public"."singleChoiceQuestions" to "service_role";

grant truncate on table "public"."singleChoiceQuestions" to "service_role";

grant update on table "public"."singleChoiceQuestions" to "service_role";

create policy "Enable read access for all users"
on "public"."singleChoiceQuestions"
as permissive
for select
to authenticated
using (true);



