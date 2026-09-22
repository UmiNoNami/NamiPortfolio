export const CONTACT_EMAIL = "naransuvd57@gmail.com";
export const MAX_MESSAGES = 30;
export type ChatMessage = { role: "user" | "assistant"; content: string };
export type Brief = { project: string; goal: string; timeline: string; budget: string; name: string };
export const EMPTY_BRIEF: Brief = { project: "", goal: "", timeline: "", budget: "", name: "" };
export const BRIEF_LABELS: Record<keyof Brief,string> = {project:"Project / opportunity",goal:"What you want to achieve",timeline:"Timing",budget:"Budget / range (optional)",name:"Your name (optional)"};
export const PROJECT_IDS = ["knockknock", "pluto", "gear4music"] as const;
export type AssistantReply = { answer: string; suggestions: string[]; projects: string[]; brief: Brief; ready: boolean };
export const replySchema = {
 type: "object", additionalProperties: false,
 properties: {
  answer: {type:"string"}, suggestions:{type:"array",items:{type:"string"}},
  projects:{type:"array",items:{type:"string",enum:PROJECT_IDS}},
  brief:{type:"object",additionalProperties:false,properties:Object.fromEntries(Object.keys(EMPTY_BRIEF).map(key=>[key,{type:"string"}])),required:Object.keys(EMPTY_BRIEF)},
  ready:{type:"boolean"}
 }, required:["answer","suggestions","projects","brief","ready"]
};
export function parseReply(value: unknown): AssistantReply | null {
 if (!value || typeof value !== "object") return null;
 const r=value as AssistantReply;
 if (typeof r.answer!=="string" || !r.answer.trim() || r.answer.length>2500 || typeof r.ready!=="boolean") return null;
 if (!Array.isArray(r.suggestions) || r.suggestions.length>3 || r.suggestions.some(s=>typeof s!=="string" || s.length>120)) return null;
 if (!Array.isArray(r.projects) || r.projects.length>3 || r.projects.some(p=>!PROJECT_IDS.includes(p as typeof PROJECT_IDS[number]))) return null;
 if (!r.brief || Object.keys(EMPTY_BRIEF).some(k=>typeof r.brief[k as keyof Brief]!=="string" || r.brief[k as keyof Brief].length>700)) return null;
 return {answer:r.answer.trim(),suggestions:r.suggestions,projects:r.projects,brief:r.brief,ready:r.ready};
}
export function validMessages(value: unknown): value is ChatMessage[] {
 return Array.isArray(value) && value.length>0 && value.length<=MAX_MESSAGES && value.every(m=>m && ["user","assistant"].includes(m.role) && typeof m.content==="string" && m.content.trim() && m.content.length<=(m.role==="user"?1500:2500)) && value[value.length-1].role==="user";
}
export function buildEmail(brief: Brief, messages: ChatMessage[]) {
 const details=(Object.keys(BRIEF_LABELS) as (keyof Brief)[]).filter(k=>k!=="name" && brief[k].trim()).map(k=>BRIEF_LABELS[k].replace(" (optional)","")+": "+brief[k].trim()).join("\n\n");
 const fallback=messages.filter(m=>m.role==="user").map(m=>m.content).join("\n\n");
 return {subject: brief.project ? "Project enquiry — "+brief.project.replace(/[\r\n]/g," ").slice(0,90) : "Hello Nami — let's talk",body:"Hi Nami,\n\n"+(details || fallback || "I'd love to connect about a possible collaboration.")+"\n\nThanks"+(brief.name?",\n"+brief.name:"!")};
}
export function mailto(subject:string,body:string) {return "mailto:"+CONTACT_EMAIL+"?subject="+encodeURIComponent(subject.replace(/[\r\n]/g," "))+"&body="+encodeURIComponent(body);}
