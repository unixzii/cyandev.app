import { FunctionComponent } from "react";
import { useRouter } from "next/router";
import { RevealHighlightPlatter } from "@/components/reveal-highlight";
import { Button } from "@/components/button";
import { Icon } from "@/components/icon";

const NotFound: FunctionComponent = () => {
  const router = useRouter();
  return (
    <main className="flex min-h-apple-compat-screen flex-col items-center justify-center">
      <div className="relative">
        <div className="mt-12 md:mt-24 text-4xl md:text-6xl font-bold">
          <span className="text-foreground/10">Oops, it&apos;s 404</span>
        </div>
        <div className="absolute top-0 mt-12 md:mt-24 text-4xl md:text-6xl font-bold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/20 to-foreground/80 animate-glitch-blink-passive">
            Oops, it&apos;s
          </span>
          <span className="animate-glitch-blink"> 404</span>
        </div>
      </div>
      <div className="pt-16 md:px-24 md:py-16 md:opacity-60 md:hover:opacity-100 md:transition-opacity md:duration-500">
        <RevealHighlightPlatter innerClassName="flex items-center animate-glitch-blink-passive">
          <Button
            extraClassName="!py-2"
            title="Back"
            aria-label="Back"
            onClick={() => history.back()}
          >
            <Icon icon="arrowLeft" size="lg" />
          </Button>
          <div className="inline-block w-0.5 h-3 mx-2 bg-border" />
          <Button
            extraClassName="!py-2"
            title="Home"
            aria-label="Home"
            onClick={() => router.push("/")}
          >
            <Icon icon="house" className="text-base" />
          </Button>
        </RevealHighlightPlatter>
      </div>
    </main>
  );
};
export default NotFound;

NotFound.staticMetadata = {
  title: "404 Not Found",
  hidesNavBar: true,
};
