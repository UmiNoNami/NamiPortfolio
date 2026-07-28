// A tiny pub/sub so scattered elements across the page (the hero's orange
// card, each project row in the Works list) can tell the global CursorBadge
// "the mouse is over one of my target areas" without needing React context
// threaded through the tree. A counter (rather than a plain boolean) means
// hovering a nested element inside a target — e.g. a social icon inside the
// orange card — doesn't cause the badge to flicker off when the mouse
// crosses from the parent onto the child.
export const CURSOR_BADGE_EVENT = "cursor-badge-hover-change";

let hoverCount = 0;

function emit() {
  window.dispatchEvent(new CustomEvent(CURSOR_BADGE_EVENT, { detail: hoverCount > 0 }));
}

export function enterCursorBadgeTarget() {
  hoverCount += 1;
  emit();
}

export function leaveCursorBadgeTarget() {
  hoverCount = Math.max(0, hoverCount - 1);
  emit();
}
