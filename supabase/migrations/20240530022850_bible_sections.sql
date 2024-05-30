create extension if not exists "vector" with schema "public" version '0.6.2';

create sequence "public"."bible_sections_id_seq";

create table "public"."bible_sections" (
    "id" bigint not null default nextval('bible_sections_id_seq'::regclass),
    "content" text,
    "metadata" jsonb,
    "embedding" vector(1536)
);


alter sequence "public"."bible_sections_id_seq" owned by "public"."bible_sections"."id";

CREATE UNIQUE INDEX bible_sections_pkey ON public.bible_sections USING btree (id);

alter table "public"."bible_sections" add constraint "bible_sections_pkey" PRIMARY KEY using index "bible_sections_pkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.match_documents(query_embedding vector, match_count integer DEFAULT NULL::integer, filter jsonb DEFAULT '{}'::jsonb)
 RETURNS TABLE(id bigint, content text, metadata jsonb, similarity double precision)
 LANGUAGE plpgsql
AS $function$
#variable_conflict use_column
begin
  return query
  select
    id,
    content,
    metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where metadata @> filter
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$function$
;

grant delete on table "public"."bible_sections" to "anon";

grant insert on table "public"."bible_sections" to "anon";

grant references on table "public"."bible_sections" to "anon";

grant select on table "public"."bible_sections" to "anon";

grant trigger on table "public"."bible_sections" to "anon";

grant truncate on table "public"."bible_sections" to "anon";

grant update on table "public"."bible_sections" to "anon";

grant delete on table "public"."bible_sections" to "authenticated";

grant insert on table "public"."bible_sections" to "authenticated";

grant references on table "public"."bible_sections" to "authenticated";

grant select on table "public"."bible_sections" to "authenticated";

grant trigger on table "public"."bible_sections" to "authenticated";

grant truncate on table "public"."bible_sections" to "authenticated";

grant update on table "public"."bible_sections" to "authenticated";

grant delete on table "public"."bible_sections" to "service_role";

grant insert on table "public"."bible_sections" to "service_role";

grant references on table "public"."bible_sections" to "service_role";

grant select on table "public"."bible_sections" to "service_role";

grant trigger on table "public"."bible_sections" to "service_role";

grant truncate on table "public"."bible_sections" to "service_role";

grant update on table "public"."bible_sections" to "service_role";


