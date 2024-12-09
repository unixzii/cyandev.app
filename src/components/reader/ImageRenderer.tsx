import createImageUrlBuilder from "@sanity/image-url";
import { ImageObject } from "@/data/block-types";

const imageUrlBuilder = createImageUrlBuilder({
  projectId: process.env.SANITY_PROJECT_ID!!,
  dataset: process.env.SANITY_DATASET!!,
});

export interface ImageRendererProps {
  block: ImageObject;
}

export function ImageRenderer(props: ImageRendererProps) {
  const { asset } = props.block;
  const imageUrl = imageUrlBuilder.image(asset).maxWidth(1024).url();
  return (
    <div className="w-full">
      <img className="mx-auto" src={imageUrl} />
    </div>
  );
}
