import { z } from "zod";
import { SanityClient } from "next-sanity";

export const NoteSchema = z.object({
  _id: z.string(),
  title: z.string(),
  tags: z.array(z.string()).nullable(),
  publishedAt: z.string().datetime(),
});
const NoteListSchema = z.array(NoteSchema);

export type Note = z.infer<typeof NoteSchema>;

export async function list(client: SanityClient): Promise<Note[]> {
  const notes = await client.fetch(
    `*[_type=="note"]{_id, title, tags, publishedAt}`
  );
  return NoteListSchema.parse(notes);
}
