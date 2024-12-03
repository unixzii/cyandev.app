import { buildMetadata } from "@/utils";

export const metadata = buildMetadata({
  title: "404 Not Found",
});

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="relative">
        <div className="mt-12 md:mt-24 text-4xl md:text-6xl font-bold">
          <span className="text-foreground">Oops, it&apos;s 404</span>
        </div>
        <div className="absolute top-0 mt-12 md:mt-24 text-4xl md:text-6xl font-bold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground animate-glitch-blink-passive">
            Oops, it&apos;s
          </span>
          <span className="animate-glitch-blink"> 404</span>
        </div>
      </div>
    </main>
  );
}
