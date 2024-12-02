import { z } from "zod";
import { SanityClient } from "next-sanity";

export const NoteSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  tags: z.array(z.string()).nullable(),
  publishedAt: z.string().datetime(),
});
const NoteListSchema = z.array(NoteSchema);

export const FullNoteSchema = NoteSchema.extend({
  body: z.unknown(),
});

export type Note = z.infer<typeof NoteSchema>;
export type FullNote = z.infer<typeof FullNoteSchema>;

export async function list(client: SanityClient): Promise<Note[]> {
  const notes = await client.fetch(
    `*[_type=="note"]{_id, title, slug, tags, publishedAt}`
  );
  return NoteListSchema.parse(notes);
}

export async function get(
  client: SanityClient,
  slug: string
): Promise<FullNote | null> {
  const note = await client.fetch(
    `*[_type == "note" && slug == $slug]{_id, title, slug, tags, publishedAt, body}[0]`,
    { slug }
  );
  if (!note) {
    return null;
  }
  return FullNoteSchema.parse(note);
}
