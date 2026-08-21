"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-reveal]";
const PARALLAX_SELECTOR = "[data-parallax]";

export default function ScrollMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((element) => {
        element.dataset.revealState = "visible";
      });
      return;
    }

    const observed = new WeakSet<HTMLElement>();
    const parallaxElements = new Set<HTMLElement>();
    let frame = 0;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          element.dataset.revealState = "visible";
          revealObserver.unobserve(element);
        });
      },
      {
        rootMargin: "0px 0px -9% 0px",
        threshold: 0.12,
      },
    );

    const registerElement = (element: HTMLElement) => {
      if (element.matches(REVEAL_SELECTOR) && !observed.has(element)) {
        const delay = Number(element.dataset.revealDelay ?? 0);
        element.style.setProperty("--reveal-delay", `${Math.min(delay, 520)}ms`);
        observed.add(element);
        revealObserver.observe(element);
      }

      if (element.matches(PARALLAX_SELECTOR)) {
        parallaxElements.add(element);
      }
    };

    const registerTree = (node: ParentNode) => {
      if (node instanceof HTMLElement) registerElement(node);

      node.querySelectorAll<HTMLElement>("main section").forEach((section) => {
        if (
          !section.hasAttribute("data-reveal") &&
          !section.hasAttribute("data-reveal-skip") &&
          !section.querySelector(REVEAL_SELECTOR)
        ) {
          section.dataset.reveal = "up";
        }
      });

      node.querySelectorAll<HTMLElement>(`${REVEAL_SELECTOR}, ${PARALLAX_SELECTOR}`).forEach(registerElement);
    };

    const updateMotion = () => {
      frame = 0;
      const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      root.style.setProperty("--scroll-progress", String(Math.min(window.scrollY / scrollable, 1)));

      parallaxElements.forEach((element) => {
        if (!element.isConnected) {
          parallaxElements.delete(element);
          return;
        }

        const rect = element.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > window.innerHeight + 120) return;

        const strength = Number(element.dataset.parallax ?? 0.045);
        const distanceFromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
        const offset = Math.max(-28, Math.min(28, distanceFromCenter * -strength));
        element.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateMotion);
    };

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) registerTree(node);
        });
      });
      requestUpdate();
    });

    registerTree(document);
    root.classList.add("scroll-motion-ready");
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    updateMotion();

    return () => {
      root.classList.remove("scroll-motion-ready");
      root.style.removeProperty("--scroll-progress");
      revealObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="scroll-progress-2026" aria-hidden="true">
      <span className="scroll-progress-2026__bar" />
    </div>
  );
}
