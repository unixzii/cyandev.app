import type { WorkerMessage } from "./messages";
import { Renderer } from "../renderer";

async function acquireGPUDevice() {
  if (!navigator.gpu) {
    return undefined;
  }

  const adapter = await navigator.gpu.requestAdapter({
    featureLevel: "compatibility",
  });
  return await adapter?.requestDevice();
}

type AttachedCanvas = {
  renderer: Renderer;
  canvas: OffscreenCanvas;
};

acquireGPUDevice().then((maybeDevice) => {
  if (!maybeDevice) {
    return;
  }

  const device = maybeDevice;

  let attachedCanvas: AttachedCanvas | null = null;
  function attachCanvas(canvas: OffscreenCanvas) {
    if (attachedCanvas) {
      throw new Error("A canvas has already been attached");
    }

    const context = canvas.getContext("webgpu");
    if (!context) {
      throw new Error("Cannot create WebGPU context");
    }
    const renderer = new Renderer(context, device);
    attachedCanvas = { renderer, canvas };
    renderer.start();
  }

  function detachCanvas() {
    if (!attachedCanvas) {
      throw new Error("No canvas has been attached");
    }
    attachedCanvas.renderer.stop();
    attachedCanvas = null;
  }

  function resizeCanvas(width: number, height: number) {
    if (!attachedCanvas) {
      throw new Error("No canvas has been attached");
    }
    attachedCanvas.canvas.width = width;
    attachedCanvas.canvas.height = height;
    attachedCanvas.renderer.resize();
  }

  self.addEventListener("message", (event: MessageEvent) => {
    const msg = event.data as WorkerMessage;
    if (msg.type === "attach") {
      attachCanvas(msg.canvas);
    } else if (msg.type === "detach") {
      detachCanvas();
    } else if (msg.type === "resize") {
      resizeCanvas(msg.width, msg.height);
    }
  });
  self.postMessage({ type: "ready" });
});
