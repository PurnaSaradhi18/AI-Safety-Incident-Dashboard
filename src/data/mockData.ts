import { Incident } from "../types/types";

export const mockIncidents: Incident[] = [
  {
    id: "1",
    title: "Biased Recommendation Algorithm",
    description: "Algorithm consistently favored certain demographics...",
    severity: "medium",
    reported_at: "2025-03-15T10:00:00Z",
  },
  {
    id: "2",
    title: "LLM Hallucination in Critical Info",
    description: "LLM provided incorrect safety procedure information...",
    severity: "high",
    reported_at: "2025-04-01T14:30:00Z",
  },
  {
    id: "3",
    title: "Minor Data Leak via Chatbot",
    description: "Chatbot inadvertently exposed non-sensitive user metadata...",
    severity: "low",
    reported_at: "2025-03-20T09:15:00Z",
  }
];

export const getIncidentStats = (incidents: Incident[]) => {
  return {
    total: incidents.length,
    open: incidents.filter(inc => !inc.resolved).length,
    resolved: incidents.filter(inc => inc.resolved).length,
    critical: incidents.filter(inc => inc.severity === "high").length,
  };
};