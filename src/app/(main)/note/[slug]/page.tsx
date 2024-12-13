import { notFound } from "next/navigation";
import { Reader, BlockVisibilityCollector } from "@/components/reader";
import { ReadableArea } from "@/components/adaptive-containers";
import { Toc } from "@/components/toc";
import { sanityClient } from "@/data";
import { get as getNote } from "@/data/notes";
import { formatTimestampToHumanReadableDate } from "@/utils/date-fns";
import { buildMetadata } from "@/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: PageProps) {
  const { slug } = await props.params;

  const note = await getNote(sanityClient, slug);
  if (!note) {
    return undefined;
  }

  return buildMetadata({
    title: note.title,
    description: note.subtitle ?? undefined,
    ogUrl: `https://cyandev.app/note/${slug}`,
  });
}

export default async function Page(props: PageProps) {
  const { slug } = await props.params;

  const note = await getNote(sanityClient, slug);
  if (!note) {
    notFound();
  }

  return (
    <BlockVisibilityCollector>
      <ReadableArea hasVerticalMargins>
        <main>
          <header>
            <time className="block font-light text-sm text-foreground-secondary">
              {formatTimestampToHumanReadableDate(note.publishedAt)}
            </time>
            <h1 className="font-serif text-4xl text-accent mt-3 mb-5">
              {note.title}
            </h1>
            <h2 className="text-xl font-light">{note.subtitle}</h2>
          </header>

          <Reader className="mt-12" body={note.body} />
        </main>
      </ReadableArea>
      <Toc body={note.body} />
    </BlockVisibilityCollector>
  );
}
