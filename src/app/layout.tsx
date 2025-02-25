import { type PropsWithChildren, Fragment } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return <Fragment>{children}</Fragment>;
}
