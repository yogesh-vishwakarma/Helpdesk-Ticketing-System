function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      
      <p className="inline-flex items-center rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300 backdrop-blur-sm">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
        {title}
      </h2>

      <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
        {description}
      </p>

    </div>
  );
}

export default SectionHeading;