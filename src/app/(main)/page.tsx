import { Fragment } from "react";
import { buildMetadata } from "@/utils";

export const metadata = buildMetadata({
  description: "👋 Hi, I'm Cyandev. This is my personal website, welcome.",
  ogUrl: "https://cyandev.app",
  ogImage: "https://cyandev.app/twitter-cards/common.png",
});

export default async function Page() {
  return (
    <Fragment>
      <h1 className="page-title">All Notes</h1>
      <div className="mt-8"></div>
    </Fragment>
  );
}
