// @ts-expect-error -- this is imported as a raw string.
import scriptContent from "./early-script.raw.js";

export default function ThemeEarlyInitializer() {
  return <script>{scriptContent}</script>;
}
