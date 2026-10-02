export const ATTRIBUTION_QUERY_PARAMS = {
  utmSource: "utm_source",
  utmMedium: "utm_medium",
  utmCampaign: "utm_campaign",
  utmContent: "utm_content",
  utmTerm: "utm_term",
  fbclid: "fbclid",
} as const;

type CampaignKey = keyof typeof ATTRIBUTION_QUERY_PARAMS;

export type Attribution = Record<CampaignKey, string | null> & {
  landingPath: string | null;
  referrer: string | null;
};

const STORAGE_KEY = "ep:attribution";

function fromCurrentPage(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const campaign = Object.fromEntries(
    Object.entries(ATTRIBUTION_QUERY_PARAMS).map(([key, param]) => [key, params.get(param) || null]),
  ) as Record<CampaignKey, string | null>;

  return { ...campaign, landingPath: window.location.pathname, referrer: document.referrer || null };
}

function hasCampaignData(attribution: Attribution) {
  return (Object.keys(ATTRIBUTION_QUERY_PARAMS) as CampaignKey[]).some((key) => attribution[key]);
}

function readStored(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

/**
 * Stores first-touch attribution for this browsing session. A later page view only
 * replaces it when the stored entry had no campaign data and the new one does.
 */
export function captureAttribution() {
  const current = fromCurrentPage();
  const stored = readStored();
  if (stored && (hasCampaignData(stored) || !hasCampaignData(current))) return;

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // Storage can be unavailable (private mode, blocked site data); getAttribution falls back to the URL.
  }
}

export function getAttribution(): Attribution {
  return readStored() ?? fromCurrentPage();
}
