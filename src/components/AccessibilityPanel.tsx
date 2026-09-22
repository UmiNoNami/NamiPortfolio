"use client";
import { useId, useRef } from "react";
import { useAccessibility, type ColorTheme, type TextSize } from "@/lib/accessibility";
import { EyeIcon } from "./ModernIcons";
import styles from "./AccessibilityPanel.module.css";
const themes: [ColorTheme,string][] = [["light","Light"],["soft","Soft light"],["dark","Dark"],["high-contrast","High contrast"]];
const sizes: [TextSize,string][] = [["small","Smaller"],["default","Default"],["large","Larger"]];
export default function AccessibilityPanel() {
 const {settings,setColorTheme,setTextSize,toggleReduceMotion,toggleHighlightLinks,toggleReadableFont,toggleReduceTransparency,reset,announcement}=useAccessibility();
 const dialog=useRef<HTMLDialogElement>(null); const trigger=useRef<HTMLButtonElement>(null); const id=useId();
 const close=()=>{dialog.current?.close();trigger.current?.focus();};
 return <>
 <button ref={trigger} type="button" className={styles.trigger} aria-label="Open accessibility settings" aria-haspopup="dialog" onClick={()=>dialog.current?.showModal()}><EyeIcon className="h-5 w-5"/><span className={styles.label}>Display</span></button>
 <dialog ref={dialog} className={styles.dialog} aria-labelledby={id} onCancel={e=>{e.preventDefault();e.stopPropagation();close();}} onClick={e=>{if(e.target===e.currentTarget)close();}} onKeyDown={e=>e.stopPropagation()}>
 <div className={styles.top}><div><p className={styles.eyebrow}>MAKE YOURSELF COMFORTABLE</p><h2 id={id}>Display & accessibility</h2></div><button type="button" aria-label="Close accessibility settings" onClick={close}>×</button></div>
 <p className={styles.description}>Choose what feels comfortable. Your preferences stay saved on this device.</p>
 <fieldset><legend>Colour & light</legend><div className={styles.options}>{themes.map(([value,label])=><label key={value}><input type="radio" name={id+"theme"} checked={settings.colorTheme===value} onChange={()=>setColorTheme(value)}/><span>{label}</span></label>)}</div><p className={styles.hint}>Soft light uses warm, muted surfaces. Dark reduces bright backgrounds.</p></fieldset>
 <fieldset><legend>Text size</legend><div className={styles.options}>{sizes.map(([value,label])=><label key={value}><input type="radio" name={id+"size"} checked={settings.textSize===value} onChange={()=>setTextSize(value)}/><span>{label}</span></label>)}</div></fieldset>
 <div className={styles.switches}>{([
 ["Reduce motion",settings.reduceMotion,toggleReduceMotion],
 ["Solid surfaces — less visual distraction",settings.reduceTransparency,toggleReduceTransparency],
 ["Readable font",settings.readableFont,toggleReadableFont],
 ["Underline links",settings.highlightLinks,toggleHighlightLinks]
 ] as [string,boolean,(value:boolean)=>void][]).map(([label,checked,change])=><label key={label}><span>{label}</span><input type="checkbox" checked={checked} onChange={e=>change(e.target.checked)}/></label>)}</div>
 <button type="button" className={styles.reset} onClick={reset}>Reset accessibility settings</button><p role="status" className="sr-only">{announcement}</p>
 </dialog></>;
}
