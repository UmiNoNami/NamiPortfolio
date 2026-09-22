import { projects } from "@/data/projects";
import { CONTACT_EMAIL, type AssistantReply, type Brief, EMPTY_BRIEF } from "./contracts";
export type GuidedStep = keyof Brief | null;
const sequence: (keyof Brief)[]=["project","goal","timeline","budget","name"];
const prompts:Record<keyof Brief,string>={project:"What would you like to create, improve, or discuss with Nami?",goal:"What should the project achieve, and who is it for?",timeline:"Do you have a rough timeline? It's fine if you're still exploring.",budget:"Is there a budget range you'd like to share? This is optional — you can skip it.",name:"What name should I use in your email draft? You can skip this too."};
export function guidedReply(text:string,brief:Brief,step:GuidedStep): {reply:AssistantReply;step:GuidedStep} {
 const lower=text.toLowerCase();
 const result=(answer:string,suggestions:string[]=[],ids:string[]=[],next:GuidedStep=null,b=brief,ready=false)=>({reply:{answer,suggestions,projects:ids,brief:b,ready},step:next});
 if (step) {
  const updated={...brief,[step]:/^skip$/i.test(text.trim())?"":text.slice(0,700)};
  const next=sequence[sequence.indexOf(step)+1] || null;
  return next ? result(prompts[next],["Skip"],[],next,updated) : result("Your brief is ready. Use the Send to Nami button above whenever you\u2019d like to email it \u2014 nothing is sent automatically.",[],[],null,updated,true);
 }
 if (/project in mind|start a brief|collaborat|hir\w*|recruit|opportunity|job offer/.test(lower)) return result(prompts.project,[],[],"project",{...EMPTY_BRIEF});
 const p=projects.find(p=>lower.includes(p.slug) || (p.slug==="knockknock"&&lower.includes("knok")) || (p.slug==="gear4music"&&lower.includes("gear")));
 if(p)return result(p.overview,["Start a brief","See her work"],[p.slug]);
 if(/work|skills|help|explore|portfolio|project(s)?\b/.test(lower))return result("Nami is a Dublin-based UI/UX designer and front-end developer working with Figma, React, React Native, Next.js and Firebase. Take a look at a case study below, or start a brief if you\u2019d like to work together.",["Start a brief","Tell me about KnockKnock"],["knockknock","pluto","gear4music"]);
 if(/price|cost|available|availability|rate/.test(lower))return result("Nami can confirm availability and pricing personally. I can help you put together an enquiry with your scope, timing and optional budget.",["Start a brief"]);
 // Someone who just wants her details, no brief needed.
 if(/email|contact|reach her|get in touch/.test(lower))return result("You can reach Nami directly at "+CONTACT_EMAIL+". Or hit Send to Nami above and I\u2019ll pass this conversation along for you.",["Start a brief","See her work"]);
 // Casual hello / small talk — just chat back, no funnel.
 if(/^(hi|hey|hello|yo|sup)\b|how are you|what\u2019s up|whats up|just (want(ed)? to |wanna )?(say hi|chat|talk)|small talk/.test(lower))return result("Hey, doing well \u2014 thanks for stopping by! Feel free to just chat, ask about Nami\u2019s work, or grab her contact info. No pressure to talk business.",["See her work","Get her contact info"]);
 return result("I can show you Nami\u2019s work, help you put together a quick project brief, or pass along her contact details \u2014 what sounds good?",["See her work","Start a brief"]);
}
