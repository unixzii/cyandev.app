import { RootLayout } from "@/components/root-layout";
import { buildMetadata } from "@/utils";

export const dynamic = "force-static";
export const metadata = buildMetadata({
  title: "404 Not Found",
});

export default function NotFound() {
  return (
    <RootLayout locale="en">
      <main className="flex h-screen flex-col items-center justify-center">
        <div className="relative text-4xl md:text-6xl font-bold dark:text-white select-none">
          <div className="dark:opacity-20">Oops, it&apos;s 404</div>
          <div className="hidden dark:block absolute top-0 animate-glitch-blink">
            Oops, it&apos;s 404
          </div>
        </div>
      </main>
    </RootLayout>
  );
}
