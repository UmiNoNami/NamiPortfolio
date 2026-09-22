"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { BRIEF_LABELS, CONTACT_EMAIL, EMPTY_BRIEF, MAX_MESSAGES, buildEmail, parseReply, type AssistantReply, type Brief, type ChatMessage } from "@/lib/assistant/contracts";
import { guidedReply, type GuidedStep } from "@/lib/assistant/guided";
import styles from "./ContactAssistant.module.css";

const STORAGE="nami-contact-conversation-v2";
const GREETING:ChatMessage={role:"assistant",content:"Hi, I'm Nami's assistant. Happy to show you her work, talk through a job or project, just chat, or pass along her contact info — whatever you're after."};
const STARTERS=["See her work","A job opportunity","Just want to chat","Get her contact info"];
// Formspree form endpoint (https://formspree.io/forms/xgobylny) — delivers straight to Nami's inbox, no server key needed.
const FORMSPREE_ENDPOINT="https://formspree.io/f/xgobylny";

export default function ContactPanel(){
 const [messages,setMessages]=useState<ChatMessage[]>([GREETING]);
 const [brief,setBrief]=useState<Brief>({...EMPTY_BRIEF});
 const [suggestions,setSuggestions]=useState(STARTERS);
 const [recommended,setRecommended]=useState<string[]>([]);
 const [step,setStep]=useState<GuidedStep>(null);
 const [draft,setDraft]=useState("");
 const [available,setAvailable]=useState<boolean|null>(null);
 const [guided,setGuided]=useState(false);
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState("");
 const [notice,setNotice]=useState("");
 const [restored,setRestored]=useState(false);
 const [sendState,setSendState]=useState<"idle"|"sending"|"sent"|"error">("idle");
 const feed=useRef<HTMLDivElement>(null);
 const input=useRef<HTMLTextAreaElement>(null);
 const active=useRef<AbortController|null>(null);
 const sending=useRef(false);
 const mode=guided || available===false;
 const limit=messages.length>=MAX_MESSAGES-1;
 const canSend=messages.some(m=>m.role==="user");
 useEffect(()=>{
  try{
   const saved=JSON.parse(sessionStorage.getItem(STORAGE)||"null");
   if(saved && Array.isArray(saved.messages) && saved.messages.length<=MAX_MESSAGES && saved.messages.every((m:ChatMessage)=>m && ["user","assistant"].includes(m.role) && typeof m.content==="string" && m.content.length<=2500)){
    setMessages(saved.messages.length?saved.messages:[GREETING]);
    const result=parseReply(saved.result);if(result){setBrief(result.brief);setSuggestions(result.suggestions);setRecommended(result.projects);}
    if(Object.keys(EMPTY_BRIEF).includes(saved.step))setStep(saved.step);
    setGuided(saved.guided===true);
   }
  }catch{/* Storage may be unavailable; the conversation still works in memory. */}
  setRestored(true);
  const probe=new AbortController();
  // If the availability check ever hangs (slow network, no .env.local yet,
  // etc.) don't leave the chat box disabled forever — fall back to guided
  // mode after a few seconds so typing always works.
  let timedOut=false;
  const timeout=setTimeout(()=>{timedOut=true;probe.abort();},4000);
  fetch("/api/assistant",{signal:probe.signal,cache:"no-store"}).then(r=>r.ok?r.json():Promise.reject()).then(data=>setAvailable(data.available===true)).catch(()=>{if(timedOut || !probe.signal.aborted)setAvailable(false);}).finally(()=>clearTimeout(timeout));
  return()=>{clearTimeout(timeout);probe.abort();active.current?.abort();};
 },[]);
 useEffect(()=>{
  if(!restored)return;
  try{sessionStorage.setItem(STORAGE,JSON.stringify({messages,result:{answer:"Saved conversation",brief,suggestions,projects:recommended,ready:false},step,guided}));}catch{/* Optional tab persistence. */}
 },[restored,messages,brief,suggestions,recommended,step,guided]);
 useEffect(()=>{if(feed.current)feed.current.scrollTop=feed.current.scrollHeight;},[messages,busy,error]);
 function apply(result:AssistantReply,next:ChatMessage[]){setMessages([...next,{role:"assistant",content:result.answer}]);setBrief(result.brief);setSuggestions(result.suggestions);setRecommended(result.projects);}
 async function send(text:string){
  const content=text.trim();if(!content || sending.current || available===null || limit)return;
  setError("");setDraft("");
  if(sendState!=="idle")setSendState("idle");
  const next:ChatMessage[]=[...messages,{role:"user",content}];
  if(mode){const local=guidedReply(content,brief,step);apply(local.reply,next);setStep(local.step);input.current?.focus();return;}
  sending.current=true;setBusy(true);setMessages(next);
  const controller=new AbortController();active.current=controller;const timer=setTimeout(()=>controller.abort(),40000);
  try{
   const response=await fetch("/api/assistant",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:next}),signal:controller.signal});
   const data=await response.json();const parsed=parseReply(data);
   if(!response.ok || !parsed)throw new Error(data.error||"That reply could not be completed. Please retry.");
   apply(parsed,next);
  }catch(e){
   setMessages(messages);setDraft(content);
   setError(controller.signal.aborted?"Reply stopped. Your message is ready to retry.":e instanceof Error?e.message:"Connection interrupted. Please retry.");
  }finally{clearTimeout(timer);active.current=null;sending.current=false;setBusy(false);requestAnimationFrame(()=>input.current?.focus({preventScroll:true}));}
 }
 function submit(event:FormEvent){event.preventDefault();void send(draft);}
 function reset(){if(sending.current)return;setMessages([GREETING]);setBrief({...EMPTY_BRIEF});setSuggestions(STARTERS);setRecommended([]);setStep(null);setDraft("");setError("");setNotice("");setSendState("idle");try{sessionStorage.removeItem(STORAGE);}catch{}}
 async function sendToNami(){
  if(sendState==="sending" || !canSend)return;
  setSendState("sending");setNotice("");
  const built=buildEmail(brief,messages);
  try{
   const response=await fetch(FORMSPREE_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({subject:built.subject,message:built.body,name:brief.name||"Portfolio visitor"})});
   if(!response.ok)throw new Error();
   setSendState("sent");setNotice("Sent! Nami will reply by email soon.");
  }catch{
   setSendState("error");setNotice("Couldn’t send automatically — email Nami directly at "+CONTACT_EMAIL+".");
  }
 }
 return <div className={styles.layout}>
  <section className={styles.chat} aria-label="Contact assistant">
   <header className={styles.chatHeader}>
    <div className={styles.identity}><span aria-hidden="true" className={styles.avatar}>✳</span><div><h3>Nami’s assistant</h3><p><i data-online={available!==null}/>{available===null?"Connecting…":"Online"}</p></div></div>
    <div className={styles.headerActions}>
     <button type="button" className={styles.sendButton} disabled={sendState==="sending"||!canSend} onClick={()=>void sendToNami()}>{sendState==="sending"?"Sending…":sendState==="sent"?"Sent ✓":"Send to Nami"}</button>
     <button type="button" onClick={reset} disabled={busy} aria-label="Clear conversation">Start over</button>
    </div>
   </header>
   <div ref={feed} className={styles.feed} role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions text" aria-busy={busy} tabIndex={0}>
    {messages.map((message,index)=><article className={styles.message} data-role={message.role} key={index}><span>{message.role==="user"?"YOU":"NAMI’S ASSISTANT"}</span><p>{message.content}</p></article>)}
    {busy&&<p className={styles.thinking}>Putting a thoughtful reply together… <button type="button" onClick={()=>active.current?.abort()}>Stop</button></p>}
   </div>
   {recommended.length>0&&<div className={styles.projectLinks} aria-label="Related work">{recommended.map(slug=>{const p=projects.find(p=>p.slug===slug);return p?<Link key={slug} href={"/work/"+slug}>{p.title} <span>Case study ↗</span></Link>:null;})}</div>}
   {error&&<div className={styles.error} role="alert"><p>{error}</p><button type="button" disabled={busy} onClick={()=>void send(draft)}>Retry message</button></div>}
   {limit?<p className={styles.modeNotice}>You’ve reached the conversation limit. Send this to Nami or start a new conversation.</p>:<div className={styles.suggestions}>{suggestions.map(text=><button type="button" disabled={busy||available===null} key={text} onClick={()=>void send(text)}>{text} <span>↗</span></button>)}</div>}
   <form className={styles.composer} onSubmit={submit}><label htmlFor="nami-message">{step&&mode?BRIEF_LABELS[step]:"Your message"}</label><div><textarea ref={input} id="nami-message" rows={2} maxLength={1500} value={draft} disabled={busy||available===null||limit} onChange={e=>setDraft(e.target.value)} placeholder={step?"A few words is plenty…":"Tell me what you have in mind…"} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey&&!e.nativeEvent.isComposing){e.preventDefault();void send(draft);}}}/><button type="submit" disabled={busy||available===null||limit||!draft.trim()} aria-label="Send message">↑</button></div><p>{draft.length}/1500 · Enter to send · Shift + Enter for a new line</p></form>
   <p className={styles.privacy}>Your conversation stays in this tab. “Send to Nami” emails it to her — nothing sends automatically.</p>
   {notice&&<p className={styles.notice} role="status">{notice}</p>}
  </section>
 </div>;
}
