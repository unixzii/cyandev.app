import { type PropsWithChildren, Fragment } from "react";
import { ReadableArea } from "@/components/adaptive-containers";
import { Footer } from "./_components/footer";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <Fragment>
      <ReadableArea className="pt-32 pb-12">{children}</ReadableArea>
      <Footer />
    </Fragment>
  );
}
