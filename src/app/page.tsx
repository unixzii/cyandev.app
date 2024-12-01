import Link from "next/link";
import { ReadableArea } from "@/components/adaptive-containers";
import { client as sanityClient } from "@/sanity";
import { list as listNotes, Note } from "@/sanity/notes";
import { buildMetadata } from "@/utils";
import { formatTimestampToHumanReadableDate } from "@/utils/date-fns";

export const metadata = buildMetadata({
  description: "👋 Hi, I'm Cyandev. This is my personal website, welcome.",
  ogUrl: "https://cyandev.app",
  ogImage: "https://cyandev.app/twitter-cards/common.png",
});

interface NoteItemProps {
  note: Note;
}

function NoteItem(props: NoteItemProps) {
  const { note } = props;
  return (
    <div className="py-3">
      <div>
        <Link
          className="mr-2 text-lg underline decoration-transparent hover:decoration-accent transition-colors duration-200"
          href="/"
        >
          {note.title}
        </Link>
        <div className="inline-flex flex-wrap gap-2 text-sm text-foreground-tertiary">
          {note.tags?.map((tag) => <span key={tag}>#{tag}</span>)}
        </div>
      </div>
      <time className="block text-sm text-foreground-secondary">
        {formatTimestampToHumanReadableDate(note.publishedAt)}
      </time>
    </div>
  );
}

export default async function Page() {
  const notes = await listNotes(sanityClient);

  return (
    <ReadableArea hasVerticalMargins>
      <h1 className="font-serif text-4xl text-accent">All Notes</h1>
      <div className="mt-8">
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
      </div>
    </ReadableArea>
  );
}
