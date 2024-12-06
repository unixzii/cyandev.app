import { type PropsWithChildren, Fragment } from "react";
import { Footer } from "@/components/footer";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <Fragment>
      <div id="safeAreaInsets" className="pt-14">
        {children}
      </div>
      <Footer />
    </Fragment>
  );
}
