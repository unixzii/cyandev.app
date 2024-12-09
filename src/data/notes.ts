import { z } from "zod";
import { SanityClient } from "next-sanity";

export const NoteSchema = z.object({
  _id: z.string(),
  title: z.string(),
  subtitle: z.string().nullable(),
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

function delay() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}

export async function list(client: SanityClient): Promise<Note[]> {
  const notes = await client.fetch(
    `*[_type=="note"]{_id, title, subtitle, slug, tags, publishedAt} | order(publishedAt desc)`,
    {},
    { next: { revalidate: 60 } }
  );
  return NoteListSchema.parse(notes);
}

export async function get(
  client: SanityClient,
  slug: string
): Promise<FullNote | null> {
  await delay();

  const note = await client.fetch(
    `*[_type == "note" && slug == $slug][0]`,
    { slug },
    { next: { revalidate: 300 } }
  );
  if (!note) {
    return null;
  }
  return FullNoteSchema.parse(note);
}
