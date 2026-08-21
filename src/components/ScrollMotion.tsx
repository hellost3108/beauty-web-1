"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR = "[data-reveal]";
const PARALLAX_SELECTOR = "[data-parallax]";
const MOTION_PAGE_SELECTOR = "[data-motion-page]";
const MOTION_MEDIA_SELECTOR = [
  "figure > img",
  "article img",
  '[class~="overflow-hidden"] img',
  "[data-motion-media] img",
].join(",");

const isHTMLElement = (node: Element | Node): node is HTMLElement => node instanceof HTMLElement;

export default function ScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observed = new WeakSet<HTMLElement>();
    const parallaxElements = new Set<HTMLElement>();
    let frame = 0;
    let lastScrollY = window.scrollY;

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
        rootMargin: "0px 0px -4% 0px",
        threshold: 0.05,
      },
    );

    const canAnimate = (element: HTMLElement) =>
      !element.closest("nav, footer, [data-reveal-skip], [role='dialog'], [aria-hidden='true']");

    const setAutoReveal = (
      element: HTMLElement,
      mode: "up" | "left" | "right" | "scale" | "fade" | "clip" | "blur",
      delay = 0,
      allowNestedAuto = false,
    ) => {
      if (!canAnimate(element) || element.hasAttribute("data-reveal")) return;

      const revealAncestor = element.parentElement?.closest<HTMLElement>(REVEAL_SELECTOR);
      if (revealAncestor && (!allowNestedAuto || !revealAncestor.hasAttribute("data-reveal-auto"))) return;

      element.dataset.reveal = mode;
      element.dataset.revealAuto = "true";
      if (delay > 0) element.dataset.revealDelay = String(Math.min(delay, 480));
    };

    const decoratePage = (page: HTMLElement) => {
      page.querySelectorAll<HTMLElement>("section").forEach((section) => {
        section.dataset.motionSection = "true";
        if (
          !section.hasAttribute("data-reveal") &&
          !section.hasAttribute("data-reveal-skip") &&
          !section.querySelector(REVEAL_SELECTOR)
        ) {
          setAutoReveal(section, "up");
        }
      });

      const pageShell = page.firstElementChild;
      if (pageShell && isHTMLElement(pageShell)) {
        Array.from(pageShell.children)
          .filter(isHTMLElement)
          .filter((element) => !["NAV", "FOOTER", "SCRIPT", "STYLE"].includes(element.tagName))
          .forEach((content) => {
            const hasSections = Boolean(content.querySelector("section"));
            const hasExplicitMotion = Boolean(content.querySelector(REVEAL_SELECTOR));
            if (!hasSections && !hasExplicitMotion) setAutoReveal(content, "up");
          });
      }

      page.querySelectorAll<HTMLElement>("h1, h2").forEach((heading, index) => {
        heading.dataset.scrollHeading = "true";
        setAutoReveal(heading, "up", Math.min(index * 45, 180));
      });

      page.querySelectorAll<HTMLElement>("article, figure, main form").forEach((element, index) => {
        setAutoReveal(element, "scale", Math.min(index * 55, 220));
      });

      page.querySelectorAll<HTMLElement>('[class~="grid"], [data-motion-stagger]').forEach((group) => {
        if (!canAnimate(group)) return;
        group.dataset.motionStagger = "true";

        Array.from(group.children)
          .filter(isHTMLElement)
          .slice(0, 12)
          .forEach((child, index) => {
            if (["SCRIPT", "STYLE", "TEMPLATE"].includes(child.tagName)) return;
            setAutoReveal(child, "scale", (index % 6) * 70, true);
          });
      });

      page
        .querySelectorAll<HTMLElement>(
          '[data-state][data-orientation="vertical"], tbody > tr, [data-motion-item]',
        )
        .forEach((item, index) => setAutoReveal(item, "blur", (index % 6) * 60, true));

      page.querySelectorAll<HTMLImageElement>(MOTION_MEDIA_SELECTOR).forEach((image) => {
        if (canAnimate(image)) image.dataset.scrollMedia = "true";
      });
    };

    const motionPagesFor = (node: ParentNode) => {
      const pages = new Set<HTMLElement>();

      if (node instanceof HTMLElement) {
        if (node.matches(MOTION_PAGE_SELECTOR)) pages.add(node);
        const closestPage = node.closest<HTMLElement>(MOTION_PAGE_SELECTOR);
        if (closestPage) pages.add(closestPage);
      }

      node.querySelectorAll<HTMLElement>(MOTION_PAGE_SELECTOR).forEach((page) => pages.add(page));
      return pages;
    };

    const registerElement = (element: HTMLElement) => {
      if (element.matches(REVEAL_SELECTOR) && !observed.has(element)) {
        const delay = Number(element.dataset.revealDelay ?? 0);
        element.style.setProperty("--reveal-delay", `${Math.min(delay, 520)}ms`);
        observed.add(element);

        if (reduceMotion.matches) {
          element.dataset.revealState = "visible";
        } else {
          revealObserver.observe(element);
        }
      }

      if (element.matches(PARALLAX_SELECTOR)) parallaxElements.add(element);
    };

    const registerTree = (node: ParentNode) => {
      const pages = motionPagesFor(node);
      pages.forEach(decoratePage);

      if (node instanceof HTMLElement) registerElement(node);
      node.querySelectorAll<HTMLElement>(`${REVEAL_SELECTOR}, ${PARALLAX_SELECTOR}`).forEach(registerElement);
      pages.forEach((page) =>
        page.querySelectorAll<HTMLElement>(`${REVEAL_SELECTOR}, ${PARALLAX_SELECTOR}`).forEach(registerElement),
      );
    };

    const updateMotion = () => {
      frame = 0;
      const currentScrollY = window.scrollY;
      const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(currentScrollY / scrollable, 0), 1);

      root.style.setProperty("--scroll-progress", String(progress));
      root.dataset.scrollDirection = currentScrollY > lastScrollY + 3 ? "down" : currentScrollY < lastScrollY - 3 ? "up" : root.dataset.scrollDirection ?? "up";
      lastScrollY = currentScrollY;

      if (reduceMotion.matches) return;

      parallaxElements.forEach((element) => {
        if (!element.isConnected) {
          parallaxElements.delete(element);
          return;
        }

        const rect = element.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > window.innerHeight + 120) return;

        const rawStrength = Number(element.dataset.parallax ?? 0.045);
        const strength = rawStrength > 1 ? rawStrength / 240 : rawStrength;
        const distanceFromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
        const offset = Math.max(-32, Math.min(32, distanceFromCenter * -strength));
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

    root.dataset.motionRoute = pathname;
    registerTree(document);

    if (reduceMotion.matches) {
      root.classList.remove("scroll-motion-ready");
    } else {
      root.classList.add("scroll-motion-ready", "route-motion-enter");
    }

    const routeTimer = window.setTimeout(() => root.classList.remove("route-motion-enter"), 720);

    mutationObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    window.addEventListener("load", requestUpdate, { passive: true });
    document.fonts?.ready.then(requestUpdate).catch(() => undefined);
    updateMotion();

    return () => {
      window.clearTimeout(routeTimer);
      root.classList.remove("scroll-motion-ready", "route-motion-enter");
      root.style.removeProperty("--scroll-progress");
      delete root.dataset.motionRoute;
      delete root.dataset.scrollDirection;
      revealObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("load", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <div className="scroll-progress-2026" aria-hidden="true">
      <span className="scroll-progress-2026__bar" />
      <span className="scroll-progress-2026__glow" />
    </div>
  );
}
