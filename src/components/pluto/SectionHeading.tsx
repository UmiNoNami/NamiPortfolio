export default function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy font-jakarta text-[11px] font-bold text-cream dark:bg-cream dark:text-navy">
        {index}
      </span>
      <h3 className="font-jakarta text-xl font-extrabold text-navy dark:text-cream">{title}</h3>
    </div>
  );
}
