import { z } from "zod";

export const CONTACT_SCHEMA = z.object({
  name: z.string().min(2, "Please enter your name").max(80),
  company: z.string().min(1, "Company is required").max(120),
  email: z.string().email("Enter a valid work email"),
  projectType: z.string().min(1, "Pick a project type"),
  timeline: z.string().min(1, "Pick a timeline"),
  budget: z.string().max(80).optional().or(z.literal("")),
  brief: z
    .string()
    .min(20, "Give us at least a sentence or two about the project")
    .max(2000),
});

export type ContactInput = z.infer<typeof CONTACT_SCHEMA>;

export const PROJECT_TYPES = [
  "AI Commercial Production",
  "AI Product Film",
  "Hybrid & Live-Action Production",
  "AI Post-Production & Editing",
  "AI UGC Video",
  "AI Content Creation",
  "Other",
] as const;

export const TIMELINES = [
  "Same Day",
  "3–7 Days",
  "1–2 Weeks",
  "2–4 Weeks",
  "More Than 30 Days",
  "Not Sure Yet",
] as const;
