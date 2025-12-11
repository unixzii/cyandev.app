import {
  type CSSProperties,
  useLayoutEffect,
  useEffect,
  useState,
  useRef,
} from "react";
import { Renderer } from "./renderer";

export async function acquireGPUDevice() {
  if (!navigator.gpu) {
    return undefined;
  }

  const adapter = await navigator.gpu.requestAdapter({
    featureLevel: "compatibility",
  });
  return await adapter?.requestDevice();
}

interface WinterBoardProps {
  className?: string;
  style?: CSSProperties;
}

export function WinterBoard(props: WinterBoardProps) {
  const { className, style } = props;
  const [device, setDevice] = useState<GPUDevice | undefined>();

  useEffect(() => {
    acquireGPUDevice().then((device) => {
      setDevice(device);
    });
  }, [setDevice]);

  if (!device) {
    return null;
  }

  return (
    <WinterBoardCanvas className={className} style={style} device={device} />
  );
}

function WinterBoardCanvas(props: WinterBoardProps & { device: GPUDevice }) {
  const { className, style, device } = props;
  const ref = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return () => {};

    const canvas = ref.current;
    const context = canvas.getContext("webgpu");
    if (!context) {
      return () => {};
    }

    const renderer = new Renderer(context, device);
    renderer.start();

    const resizeObserver = new ResizeObserver(() => {
      // FIXME: our renderer is DPI-dependent currently.
      const scaleFactor = 2; /* window.devicePixelRatio */
      canvas.width = canvas.clientWidth * scaleFactor;
      canvas.height = canvas.clientHeight * scaleFactor;
      renderer.resize();
    });
    resizeObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
      renderer.stop();
    };
  }, [ref, device]);

  return <canvas ref={ref} className={className} style={style} />;
}
