"use client";

import { useMemo, useState } from "react";
import { Eye, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { leadStatuses } from "@/lib/site-config";
import { auditTotal } from "@/lib/audit-scoring";

type Audit = { id: number; createdAt: string; name: string; businessName: string; email: string; phone: string; website: string; industry: string; city: string; goal: string; problem: string; budget: string; message: string; status: string; designScore: number | null; mobileScore: number | null; conversionScore: number | null; seoScore: number | null; googleScore: number | null; performanceScore: number | null; trustScore: number | null; notes: string; utmSource: string; utmMedium: string; utmCampaign: string; updatedAt: string };

export function AdminAuditsTable({ initialRows }: { initialRows: Audit[] }) {
  const [rows, setRows] = useState(initialRows);
  const [query, setQuery] = useState("");
  const visible = useMemo(() => rows.filter((row) => `${row.name} ${row.businessName} ${row.email} ${row.website}`.toLowerCase().includes(query.toLowerCase())), [rows, query]);
  return <section><div className="admin-filters"><div className="admin-search"><Search /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search audits" /></div></div><div className="admin-table-wrap"><Table><TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Business</TableHead><TableHead>Website</TableHead><TableHead>Industry</TableHead><TableHead>Goal</TableHead><TableHead>Budget</TableHead><TableHead>Status</TableHead><TableHead>Score</TableHead><TableHead /></TableRow></TableHeader><TableBody>{visible.map((row) => <TableRow key={row.id}><TableCell>{new Date(row.createdAt).toLocaleDateString("en-GB")}</TableCell><TableCell>{row.businessName}<small className="cell-sub">{row.name}</small></TableCell><TableCell><a href={row.website}>{row.website}</a></TableCell><TableCell>{row.industry}</TableCell><TableCell>{row.goal}</TableCell><TableCell>{row.budget}</TableCell><TableCell><span className={`status-pill status-${row.status.toLowerCase()}`}>{row.status.replaceAll("_", " ")}</span></TableCell><TableCell>{auditTotal(row) ?? "-"}</TableCell><TableCell><AuditSheet row={row} onUpdate={(updated) => setRows((current) => current.map((item) => item.id === updated.id ? updated : item))} /></TableCell></TableRow>)}</TableBody></Table></div></section>;
}

function AuditSheet({ row, onUpdate }: { row: Audit; onUpdate: (audit: Audit) => void }) {
  const [status, setStatus] = useState(row.status);
  const [notes, setNotes] = useState(row.notes);
  const [scores, setScores] = useState({ designScore: row.designScore, mobileScore: row.mobileScore, conversionScore: row.conversionScore, seoScore: row.seoScore, googleScore: row.googleScore, performanceScore: row.performanceScore, trustScore: row.trustScore });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  async function save() {
    setSaving(true); setError("");
    try {
      const response = await fetch(`/api/admin/audits/${row.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status, notes, ...scores }) });
      const result = await response.json() as { audit?: Audit };
      if (!response.ok || !result.audit) throw new Error("Audit could not be saved.");
      onUpdate(result.audit);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Audit could not be saved.");
    } finally { setSaving(false); }
  }
  return <Sheet><SheetTrigger asChild><Button variant="ghost" size="icon-sm" aria-label={`View ${row.businessName}`}><Eye /></Button></SheetTrigger><SheetContent className="admin-detail-sheet"><SheetHeader><SheetTitle>{row.businessName}</SheetTitle><SheetDescription>{row.website} · {row.email}</SheetDescription></SheetHeader><div className="admin-detail-body"><div className="detail-pairs"><div><span>Goal</span><strong>{row.goal}</strong></div><div><span>Budget</span><strong>{row.budget}</strong></div><div><span>Industry</span><strong>{row.industry}</strong></div><div><span>City</span><strong>{row.city}</strong></div></div><div className="detail-message"><span>Current problem</span><p>{row.problem}</p></div><div className="form-field"><Label htmlFor={`audit-status-${row.id}`}>Status</Label><select id={`audit-status-${row.id}`} className="found-select" value={status} onChange={(event) => setStatus(event.target.value)}>{leadStatuses.map((item) => <option key={item} value={item}>{item.replaceAll("_", " ")}</option>)}</select></div><div className="score-grid">{[["designScore", "Design", 20], ["mobileScore", "Mobile", 20], ["conversionScore", "Conversion", 20], ["seoScore", "SEO", 15], ["googleScore", "Google", 15], ["performanceScore", "Performance", 10], ["trustScore", "Trust", 10]].map(([key, label, max]) => <div className="form-field" key={String(key)}><Label>{label} /{max}</Label><Input type="number" min="0" max={Number(max)} value={scores[key as keyof typeof scores] ?? ""} onChange={(event) => setScores((current) => ({ ...current, [key]: event.target.value === "" ? null : Math.min(Number(max), Math.max(0, Number(event.target.value))) }))} /></div>)}</div><div className="audit-total"><span>Total score</span><strong>{auditTotal({ ...row, ...scores }) ?? 0}/110</strong></div><div className="form-field"><Label>Internal notes</Label><Textarea rows={5} value={notes} onChange={(event) => setNotes(event.target.value)} /></div>{error && <p className="form-error-banner" role="alert">{error}</p>}<Button onClick={save} disabled={saving}>{saving ? "Saving..." : "Save audit"}</Button></div></SheetContent></Sheet>;
}
