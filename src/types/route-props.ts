// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type PageProps<Params extends Record<string, string> = {}> = {
  params: Promise<{ locale: string } & Params>;
};
