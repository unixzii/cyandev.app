import { redirect, RedirectType } from "next/navigation";
import { Reader } from "@/components/reader";
import { ReadableArea } from "@/components/adaptive-containers";
import { client as sanityClient } from "@/sanity";
import { get as getNote } from "@/sanity/notes";
import { formatTimestampToHumanReadableDate } from "@/utils/date-fns";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page(props: PageProps) {
  const { slug } = await props.params;

  const note = await getNote(sanityClient, slug);
  if (!note) {
    return redirect("/not-found", RedirectType.replace);
  }

  return (
    <ReadableArea hasVerticalMargins>
      <h1 className="font-serif text-4xl text-accent mb-3">{note.title}</h1>
      <time className="block font-light text-sm text-foreground-secondary">
        {formatTimestampToHumanReadableDate(note.publishedAt)}
      </time>
      <main className="mt-8">
        <Reader body={note.body} />
      </main>
    </ReadableArea>
  );
}
