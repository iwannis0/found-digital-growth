import { z } from "zod";

const score = (max: number) => z.number().int().min(0).max(max).nullable();

export const auditScoreFields = {
  designScore: score(20),
  mobileScore: score(20),
  conversionScore: score(20),
  seoScore: score(15),
  googleScore: score(15),
  performanceScore: score(10),
  trustScore: score(10),
};

export type AuditScores = {
  [Key in keyof typeof auditScoreFields]: number | null;
};

export function auditTotal(scores: AuditScores) {
  const values = [
    scores.designScore,
    scores.mobileScore,
    scores.conversionScore,
    scores.seoScore,
    scores.googleScore,
    scores.performanceScore,
    scores.trustScore,
  ];
  return values.every((value) => value === null)
    ? null
    : values.reduce<number>((sum, value) => sum + (value ?? 0), 0);
}
