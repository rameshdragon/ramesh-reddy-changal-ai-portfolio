import Link from "next/link";

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-black sm:px-10">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-black/10 bg-white p-8 shadow-[0_24px_80px_rgba(0,0,0,0.08)] sm:p-10">
        <p className="text-[11px] font-black uppercase tracking-[0.34em] text-black/40">Resume</p>
        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">Download Ramesh's Resume</h1>
        <p className="mt-4 text-base leading-7 text-black/70 sm:text-lg">
          If the chatbot did not start the download automatically, use the button below.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="/resume/Ramesh-Reddy-Changal-Resume.pdf"
            download
            className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-85"
          >
            Download Resume
          </a>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full border border-black/10 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-black/70 transition-colors hover:bg-black/5"
          >
            Go To Contact
          </Link>
        </div>
      </div>
    </main>
  );
}
