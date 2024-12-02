import grainTexture from "../../public/grain-texture.png";

export function GrainTextureBackground() {
  return (
    <div
      className="absolute left-0 top-0 w-full h-full -z-50 opacity-25 dark:opacity-10"
      style={{
        backgroundImage: `url(${grainTexture.src})`,
        backgroundSize: "160px",
      }}
    />
  );
}
