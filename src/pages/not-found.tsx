import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ReadableArea } from "@/components/ReadableArea";

export default function NotFound() {
  return (
    <>
      <main className="relative flex min-h-[720px] h-screen flex-col items-center justify-center">
        <div className="relative text-4xl md:text-6xl font-bold dark:text-white select-none">
          <div className="dark:opacity-20">Oops, it&apos;s 404</div>
          <div className="hidden dark:block absolute top-0 animate-glitch-blink">
            Oops, it&apos;s 404
          </div>
        </div>
      </main>
      <div className="absolute top-0 w-full h-full flex flex-col justify-between">
        <ReadableArea className="w-full">
          <NavBar />
        </ReadableArea>
        <ReadableArea className="w-full">
          <Footer />
        </ReadableArea>
      </div>
    </>
  );
}
