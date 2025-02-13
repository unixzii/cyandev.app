import { ReadableArea } from "@/components/adaptive-containers";
import { sanityClient } from "@/data";
import { list as listNotes, Note } from "@/data/notes";
import { Link } from "@/components/link";
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
    <div className="mb-8">
      <Link
        className="block mb-1.5 font-semibold text-xl underline decoration-transparent hover:decoration-accent transition-colors duration-200"
        href={`/note/${note.slug}`}
      >
        {note.title}
      </Link>
      <h2 className="mb-1.5 font-light text-sm">{note.subtitle}</h2>
      <div className="flex flex-wrap gap-2 text-sm">
        <time className="inline-block font-light text-foreground-secondary mr-1">
          {formatTimestampToHumanReadableDate(note.publishedAt)}
        </time>
        {note.tags?.map((tag) => (
          <span key={tag} className="text-foreground-tertiary">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default async function Page() {
  const notes = await listNotes(sanityClient);

  return (
    <ReadableArea hasVerticalMargins>
      <h1 className="page-title">All Notes</h1>
      <div className="mt-8">
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
      </div>
    </ReadableArea>
  );
}
