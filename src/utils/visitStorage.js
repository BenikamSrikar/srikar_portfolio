/**
 * Visit Storage Utility
 * Manages persistent visit state in localStorage
 */

const VISITED_KEY = "portfolio_visited";
const LAST_VISIT_KEY = "portfolio_lastVisit";
const DEBUG_PARAM = "debug";

/**
 * Check if this is the user's first visit
 * @returns {boolean} true if first visit, false if returning user
 */
export const getVisitState = () => {
  // Check for debug mode in URL
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get(DEBUG_PARAM) === "true") {
      console.log("[DEBUG MODE] Forcing loader to show");
      return true;
    }

    const visited = localStorage.getItem(VISITED_KEY);
    return !visited;
  }
  return true;
};

/**
 * Mark the user as visited
 */
export const markAsVisited = () => {
  if (typeof window !== "undefined") {
    localStorage.setItem(VISITED_KEY, "true");
    localStorage.setItem(LAST_VISIT_KEY, Date.now().toString());
    console.log("[VisitStorage] User marked as visited");
  }
};

/**
 * Get last visit timestamp
 * @returns {number|null} Last visit timestamp in milliseconds
 */
export const getLastVisitTime = () => {
  if (typeof window !== "undefined") {
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    return lastVisit ? parseInt(lastVisit) : null;
  }
  return null;
};

/**
 * Reset visit state (for development/settings)
 */
export const resetVisitState = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(VISITED_KEY);
    localStorage.removeItem(LAST_VISIT_KEY);
    console.log("[VisitStorage] Visit state reset");
  }
};

/**
 * Get visit stats for debugging
 */
export const getVisitStats = () => {
  if (typeof window !== "undefined") {
    const isFirstVisit = getVisitState();
    const lastVisit = getLastVisitTime();
    return {
      isFirstVisit,
      lastVisit: lastVisit ? new Date(lastVisit).toLocaleString() : "Never",
      visited: !isFirstVisit,
    };
  }
  return { isFirstVisit: true, lastVisit: "Never", visited: false };
};
