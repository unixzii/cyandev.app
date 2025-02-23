// @ts-expect-error -- this is imported as a raw string.
import earlyScript from "./early-script?raw";

export default function ThemeEarlyInitializer() {
  return <script>{earlyScript}</script>;
}
