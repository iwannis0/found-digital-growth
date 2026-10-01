"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { HeroSearch } from "./search";

const SOURCE_FRAME_COUNT = 182;
const DESKTOP_FRAME_COUNT = 120;
const TABLET_FRAME_COUNT = 48;
const MOBILE_FRAME_COUNT = 32;
const frameSource = (index: number, frameCount: number) => {
  const sourceIndex = frameCount === SOURCE_FRAME_COUNT
    ? index
    : Math.round(index * (SOURCE_FRAME_COUNT - 1) / (frameCount - 1));
  return `/work/nova-estates/hero-sequence/frame-${String(sourceIndex + 1).padStart(3, "0")}.webp`;
};

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const rangeProgress = (value: number, start: number, end: number) =>
  clamp((value - start) / (end - start));

export function NovaScrollHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const canvas = canvasRef.current;
    if (!section || !sticky || !canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactViewport = window.matchMedia("(max-width: 600px)").matches;
    const tabletViewport = !compactViewport && window.matchMedia("(max-width: 900px)").matches;
    const frameCount = compactViewport
      ? MOBILE_FRAME_COUNT
      : tabletViewport
        ? TABLET_FRAME_COUNT
        : DESKTOP_FRAME_COUNT;
    const frameCacheSize = compactViewport ? 14 : tabletViewport ? 14 : 26;
    const frameLookAhead = compactViewport ? 4 : tabletViewport ? 6 : 14;
    const frameLookBehind = compactViewport ? 2 : tabletViewport ? 3 : 6;
    const decodeWorkers = compactViewport ? 1 : tabletViewport ? 2 : 3;
    let animationFrame = 0;
    let activeFrame = 0;
    let previousFrame = 0;
    let scrollDirection: 1 | -1 = 1;
    let disposed = false;
    let runningDecodes = 0;
    const frameBlobs = new Map<number, Blob>();
    const frameRequests = new Map<number, Promise<Blob>>();
    const decodedFrames = new Map<number, ImageBitmap>();
    const decodeRequests = new Map<number, Promise<ImageBitmap>>();
    const decodeQueue: number[] = [];
    const queuedFrames = new Set<number>();

    const getFrameBlob = (index: number) => {
      const existing = frameBlobs.get(index);
      if (existing) return Promise.resolve(existing);
      const pending = frameRequests.get(index);
      if (pending) return pending;

      const request = fetch(frameSource(index, frameCount))
        .then((response) => {
          if (!response.ok) throw new Error(`Unable to load NOVA frame ${index}`);
          return response.blob();
        })
        .then((blob) => {
          frameBlobs.set(index, blob);
          frameRequests.delete(index);
          return blob;
        });
      frameRequests.set(index, request);
      return request;
    };

    const decodeFrame = (index: number) => {
      const existing = decodedFrames.get(index);
      if (existing) return Promise.resolve(existing);
      const pending = decodeRequests.get(index);
      if (pending) return pending;

      const request = getFrameBlob(index).then(async (blob) => {
        // The opening portrait frame fills a tall mobile viewport, so keep it at
        // source resolution. Every subsequent frame stays lightweight for scroll.
        const image = compactViewport && (index === 0 || index === frameCount - 1)
          ? await createImageBitmap(blob)
          : compactViewport
          ? await createImageBitmap(blob, {
              resizeWidth: 640,
              resizeHeight: 360,
              resizeQuality: "high",
            })
          : tabletViewport
          ? await createImageBitmap(blob, {
              resizeWidth: 800,
              resizeHeight: 450,
              resizeQuality: "high",
            })
          : await createImageBitmap(blob);
        if (!disposed) decodedFrames.set(index, image);
        else image.close();
        decodeRequests.delete(index);
        return image;
      });
      decodeRequests.set(index, request);
      return request;
    };

    const trimDecodedFrames = () => {
      if (decodedFrames.size <= frameCacheSize) return;
      const removable = [...decodedFrames.keys()]
        .filter((index) => index !== activeFrame)
        .sort((a, b) => Math.abs(b - activeFrame) - Math.abs(a - activeFrame));
      while (decodedFrames.size > frameCacheSize && removable.length) {
        const index = removable.shift();
        if (index === undefined) break;
        decodedFrames.get(index)?.close();
        decodedFrames.delete(index);
      }
    };

    const drawFrame = (image: ImageBitmap) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;

      const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        compactViewport ? 1 : tabletViewport ? 1.25 : 1.5,
      );
      const renderWidth = Math.round(width * pixelRatio);
      const renderHeight = Math.round(height * pixelRatio);
      if (canvas.width !== renderWidth || canvas.height !== renderHeight) {
        canvas.width = renderWidth;
        canvas.height = renderHeight;
      }

      const context = canvas.getContext("2d", { alpha: false });
      if (!context) return;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      const scale = Math.max(width / image.width, height / image.height);
      const drawWidth = image.width * scale;
      const drawHeight = image.height * scale;
      context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
    };

    const drawNearestFrame = () => {
      const exact = decodedFrames.get(activeFrame);
      if (exact) return drawFrame(exact);
      for (let distance = 1; distance < frameCount; distance += 1) {
        const forward = decodedFrames.get(activeFrame + distance * scrollDirection);
        const backward = decodedFrames.get(activeFrame - distance * scrollDirection);
        if (forward || backward) return drawFrame(forward ?? backward!);
      }
    };

    const drainDecodeQueue = () => {
      while (!disposed && runningDecodes < decodeWorkers && decodeQueue.length) {
        const index = decodeQueue.shift();
        if (index === undefined) break;
        queuedFrames.delete(index);
        if (decodedFrames.has(index)) continue;
        runningDecodes += 1;
        void decodeFrame(index).catch(() => undefined).finally(() => {
          runningDecodes -= 1;
          if (!disposed) {
            drawNearestFrame();
            trimDecodedFrames();
            drainDecodeQueue();
          }
        });
      }
    };

    const queueNearbyFrames = (index: number) => {
      decodeQueue.length = 0;
      queuedFrames.clear();
      const candidates = [index];
      for (let distance = 1; distance <= frameLookAhead; distance += 1) {
        candidates.push(index + distance * scrollDirection);
        if (distance <= frameLookBehind) candidates.push(index - distance * scrollDirection);
      }
      for (const candidate of candidates) {
        if (candidate < 0 || candidate >= frameCount) continue;
        if (decodedFrames.has(candidate) || decodeRequests.has(candidate) || queuedFrames.has(candidate)) continue;
        decodeQueue.push(candidate);
        queuedFrames.add(candidate);
      }
      drainDecodeQueue();
    };

    const requestFrame = (index: number) => {
      if (index !== previousFrame) scrollDirection = index > previousFrame ? 1 : -1;
      previousFrame = index;
      activeFrame = index;
      canvas.dataset.frame = String(index);
      drawNearestFrame();
      queueNearbyFrames(index);
    };

    const syncToScroll = () => {
      animationFrame = 0;
      const rect = section.getBoundingClientRect();
      const scrollDistance = Math.max(1, section.offsetHeight - sticky.offsetHeight);
      const progress = clamp(-rect.top / scrollDistance);
      const contentFade = 1 - rangeProgress(progress, 0.2, 0.42);
      const searchFade = 1 - rangeProgress(progress, 0.16, 0.36);

      sticky.style.setProperty("--nova-copy-opacity", contentFade.toFixed(3));
      sticky.style.setProperty("--nova-copy-shift", `${(-24 * (1 - contentFade)).toFixed(2)}px`);
      sticky.style.setProperty("--nova-search-opacity", searchFade.toFixed(3));
      sticky.style.setProperty("--nova-search-shift", `${(22 * (1 - searchFade)).toFixed(2)}px`);
      const search = sticky.querySelector<HTMLElement>(".nova-search");
      if (search) search.style.pointerEvents = searchFade > 0.1 ? "auto" : "none";

      requestFrame(reducedMotion.matches ? 0 : Math.round(progress * (frameCount - 1)));
    };

    const requestSync = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(syncToScroll);
    };

    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync, { passive: true });
    reducedMotion.addEventListener("change", requestSync);

    void decodeFrame(0).then(() => {
      if (!disposed) requestSync();
    });
    let preloadIndex = 1;
    const preloadWorker = async () => {
      while (!disposed && preloadIndex < frameCount) {
        const index = preloadIndex;
        preloadIndex += 1;
        await getFrameBlob(index);
      }
    };
    const beginPreload = () => {
      const workerCount = compactViewport ? 1 : tabletViewport ? 2 : 3;
      void Promise.allSettled(Array.from({ length: workerCount }, preloadWorker));
    };
    if ("requestIdleCallback" in window) {
      const idle = window as Window & { requestIdleCallback: (callback: () => void, options?: { timeout: number }) => number };
      idle.requestIdleCallback(beginPreload, { timeout: 1200 });
    } else {
      globalThis.setTimeout(beginPreload, 350);
    }
    requestSync();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
      reducedMotion.removeEventListener("change", requestSync);
      decodedFrames.forEach((image) => image.close());
    };
  }, []);

  return (
    <section ref={sectionRef} className="nova-scroll-hero" aria-label="NOVA Estates property walkthrough">
      <div ref={stickyRef} className="nova-scroll-hero__sticky nova-hero">
        <div className="nova-hero-media nova-hero-media--sequence" aria-hidden="true">
          <canvas ref={canvasRef} className="nova-hero-canvas" />
        </div>
        <div className="nova-hero-shade" />
        <div className="nova-hero-copy">
          <p className="nova-eyebrow">Private property · Cyprus</p>
          <h1>Homes of<br /><em>quiet distinction.</em></h1>
          <p>A considered collection of coastal homes, city residences and new developments across Cyprus.</p>
          <Link href="/work/nova-estates/demo/properties" className="nova-button nova-button-light">
            Explore properties <ArrowUpRight />
          </Link>
        </div>
        <HeroSearch />
        <a className="nova-scroll" href="#collections">Discover <ArrowDown /></a>
      </div>
    </section>
  );
}
