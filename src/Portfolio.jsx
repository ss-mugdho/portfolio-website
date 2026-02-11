import React, { useMemo, useState, useEffect } from "react";

/**
 * Single‑file personal portfolio site for Sohan Salahuddin Mugdho
 * Stack: React + TailwindCSS (no external UI deps)
 * 
 * How to use:
 *  - Drop this component into a Vite/Next/CRA project and render <Portfolio />
 *  - Or export as a standalone page by wrapping in a minimal index.html that mounts this component.
 */

const TAGS = {
  hw: "Hardware/IMC",
  ml: "Machine Learning",
  dp: "Differential Privacy",
  sys: "Systems",
  hwdsgn: "HW/SW Co-Design",
  fairness: "Fair ML",
};

const HIGHLIGHTS = [
  {
    label: "Best Paper Awards",
    value: "CCMCC 2025, ICRC 2024",
    detail: "Area-efficient Hetero. MRAM, Spintronic synapses",
  },
  {
    label: "DATE 2025",
    value: "Accepted",
    detail: "FairXbar fairness on non-ideal IMC",
  },
  {
    label: "Publications",
    value: "5+",
    detail: "Conferences & journals",
  },
  {
    label: "Focus",
    value: "IMC + Fair ML",
    detail: "device → system → model",
  },
];

const SKILLS = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "MATLAB",
  "Hugging Face",
  "C/C++",
  "VHDL/Verilog",
  "Xilinx Vivado",
  "Cadence Virtuoso",
  "LaTeX",
  "Timeloop/Accelergy",
  "CiMLoop",
  "FastAPI",
  "Docker",
  "GitHub | CI/CD",
  "AWS | GCP",
];

const PUBLICATIONS = [
  {
    title:
      "FairXbar: Improving the Fairness of Deep Neural Networks with Non‑Ideal In‑Memory Computing Hardware",
    authors: "S. S. Mugdho, Y. Guo, E. G. Rogers, W. Zhao, Y. Shi, C. Wang",
    venue: "DATE 2025 (Lyon, France)",
    extra: "25% acceptance rate; DOI: 10.23919/DATE64628.2025.10993038",
    link: "https://doi.org/10.23919/DATE64628.2025.10993038",
    tags: [TAGS.fairness, TAGS.hw, TAGS.hwdsgn],
    year: 2025,
  },
  {
    title:
      "Scalable and robust multi-bit spintronic synapses for analog in-memory computing",
    authors: "K. K. Gupte*, S. S. Mugdho* , C. Huang, C. Wang (*equal contribution)",
    venue: "npj Unconventional Computing",
    extra: "DOI: 10.1038/s44335-026-00055-7",
    link: "",
    tags: [TAGS.hw, TAGS.hwdsgn],
    year: 2026,
  },
  {
    title:
      "Scalable Spintronic Synapses for Analog In‑Memory Computing Based on Exchange‑Coupled Nanostructures",
    authors: "K. K. Gupte*, S. S. Mugdho* , C. Wang (*equal contribution)",
    venue: "IEEE ICRC 2024 (San Diego, CA) — Best Paper",
    extra: "DOI: 10.1109/ICRC64395.2024.10937014",
    link: "https://doi.org/10.1109/ICRC64395.2024.10937014",
    tags: [TAGS.hw],
    year: 2024,
  },
  {
    title:
      "StoX‑Net: Stochastic Processing of Partial Sums for Efficient In‑Memory Computing DNN Accelerators",
    authors: "E. G. Rogers*, S. S. Mugdho*, K. K. Gupte, C. Wang (*equal contribution)",
    venue: "IEEE ICRC 2024",
    extra: "DOI: 10.1109/ICRC64395.2024.10937005",
    link: "https://doi.org/10.1109/ICRC64395.2024.10937005",
    tags: [TAGS.hw, TAGS.sys, TAGS.hwdsgn],
    year: 2024,
  },
  {
    title:
      "Area‑Efficient Heterogeneous MRAM for High‑Performing AI Acceleration",
    authors: "S. S. Mugdho, K. K. Gupte, Md. S. Hasan, C. Wang",
    venue: "IEEE CCMCC 2025 (Dresden, Germany) — Best Paper",
    extra: "",
    link: "#",
    tags: [TAGS.hw],
    year: 2025,
  },
  {
    title:
      "Privacy‑preserving matrix factorization for recommendation systems using Gaussian mechanism and functional mechanism",
    authors: "S. S. Mugdho, H. Imtiaz",
    venue: "International Journal of Machine Learning and Cybernetics, 2024",
    extra: "",
    link: "https://doi.org/10.1007/s13042-024-02276-3",
    tags: [TAGS.dp, TAGS.ml],
    year: 2024,
  },
];

const EXPERIENCE = [
  {
    company: "Iowa State University of Science and Technology",
    role: "Hardware/Software Co‑Designer — Ph.D. Research Assistant",
    location: "Ames, IA",
    time: "2023 – Present",
    bullets: [
      "Improved DNN fairness by 32% with <1% accuracy loss on medical imaging (FairXbar).",
      "Up to 130× EDP improvement via StoX‑Net, mitigating ADC bottlenecks with stochastic conversion.",
      "Designed scalable multi‑bit MRAM synapse; ~3.2× efficiency over binary MRAM.",
      "Created hardware‑aware training covering quantization, fairness, write error, variation, stochastic conversion.",
      "Validated device→system→ML stack with MATLAB, PyTorch, Timeloop/Accelergy; 3 accepted pubs.",
      "Evaluated on Tiny ImageNet, Fitzpatrick‑17k, ISIC‑2019.",
    ],
  },
  {
    company: "Anchorblock Technologies",
    role: "Machine Learning Engineer",
    location: "Dhaka, Bangladesh",
    time: "2022 – 2023",
    bullets: [
      "Built performance monitoring for mobile financial service across 4 features & 2 metrics feeding analytics dashboard.",
      "Deployed AI‑driven credit scoring (semi‑supervised + generative augmentation) demo on AWS.",
      "Containerized 5 NLP microservices (NER, grammar/punctuation, coreference) with PyTorch & HF.",
      "Researched automated crypto trading; improved Sharpe ratio 1.2 → 1.7 on 5‑year backtests.",
      "Led planning & GitHub release workflows across 3 projects.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "Ph.D., Computer Engineering",
    org: "Iowa State University of Science and Technology",
    where: "Ames, IA",
    time: "2023 – Present",
  },
  {
    degree: "B.Sc., Electrical & Electronic Engineering",
    org: "Bangladesh University of Engineering and Technology",
    where: "Dhaka, Bangladesh",
    time: "2017 – 2022",
  },
];

const PROJECTS = [
  {
    name: "FairXbar",
    summary:
      "Leverages non‑ideal IMC behavior to improve DNN fairness with minimal accuracy loss; device‑aware training pipeline.",
    tags: [TAGS.fairness, TAGS.hw, TAGS.ml],
  },
  {
    name: "StoX‑Net",
    summary:
      "Stochastic processing of partial sums for IMC accelerators; alleviates ADC bottleneck and improves EDP massively.",
    tags: [TAGS.hw, TAGS.sys],
  },
  {
    name: "Heterogeneous MRAM Synapse",
    summary:
      "Exchange‑coupled nanostructure based multi‑bit synapse; scalable & area‑efficient for analog IMC.",
    tags: [TAGS.hw],
  },
  {
    name: "Privacy‑Preserving MF",
    summary:
      "Gaussian‑mechanism DP for recommender systems with strong utility‑privacy trade‑offs.",
    tags: [TAGS.dp, TAGS.ml],
  },
  {
    name: "MFS Performance Monitor",
    summary:
      "Telemetry + analytics for balance check, transfer, payment, withdrawal; latency & success KPIs.",
    tags: [TAGS.sys, TAGS.ml],
  },
  {
    name: "Credit Scoring (Semi‑sup + GenAI)",
    summary:
      "Hybrid semi‑supervised pipeline with generative augmentation; demoed on AWS.",
    tags: [TAGS.ml, TAGS.sys],
  },
];

function Section({ id, title, children, subtitle }) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="w-full px-6 py-12">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">{subtitle}</p>
        )}
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-300 dark:border-slate-700 px-3 py-1 text-xs sm:text-sm">
      {children}
    </span>
  );
}

function Card({ children, hover = true }) {
  return (
    <div
      className={
        "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 shadow-sm " +
        (hover ? "transition hover:shadow-lg" : "")
      }
    >
      {children}
    </div>
  );
}

function Header() {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    // Set initial theme based on system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const nav = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Publications", href: "#publications" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];
  
  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/70">
      <div className="w-full px-6 h-16 flex items-center justify-between">
        <a href="#home" className="font-semibold tracking-tight">Sohan S. Mugdho</a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {nav.map((n) => (
            <a key={n.name} href={n.href} className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
              {n.name}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {/* <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="rounded-full border border-slate-300 dark:border-slate-700 p-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isDark ? "☀️" : "🌙"}
          </button> */}
          <a
            href="mailto:ssmugdho@iastate.edu"
            className="hidden sm:inline-flex rounded-full border border-slate-300 dark:border-slate-700 px-3 py-1 text-xs"
          >
            Email
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative">
      <div className="w-full px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              Sohan Salahuddin Mugdho
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-slate-700 dark:text-slate-300">
              Hardware/Software Co-Designer | Ph.D. Research Assistant at Iowa State University | Specializing in AI hardware & ML acceleration | Focused on fairness in AI and in-memory computing
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="https://www.linkedin.com/in/sohan-salahuddin-mugdho"
                className="rounded-full border border-slate-300 dark:border-slate-700 px-4 py-2 text-sm hover:shadow"
                target="_blank" rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="/portfolio-website/Resume_Sohan_Salahuddin_Mugdho.pdf" download="Resume_Sohan_Salahuddin_Mugdho.pdf"
                className="rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2 text-sm hover:shadow"
              >
                Download Resume
              </a>
              <a
                href="mailto:ssmugdho@iastate.edu"
                className="rounded-full border border-slate-300 dark:border-slate-700 px-4 py-2 text-sm hover:shadow"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="flex md:justify-end">
            <img
              src="/portfolio-website/sohan_salahuddin.jpg"
              alt="Sohan Salahuddin Mugdho"
              className="h-36 w-36 sm:h-44 sm:w-44 md:h-48 md:w-48 rounded-full object-cover shadow"
            />
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {HIGHLIGHTS.map((h) => (
            <Card key={h.label}>
              <div className="p-4">
                <div className="text-xs text-slate-500 dark:text-slate-400">{h.label}</div>
                <div className="text-lg font-semibold mt-0.5">{h.value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{h.detail}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" title="About">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold">Research Focus</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300 text-left">
              I build learning systems and hardware that meet in the middle: device‑aware training, IMC accelerator design,
              and fairness‑conscious models. I validate ideas across the stack — from MRAM device characteristics to
              accelerator PPA modeling to PyTorch‑level accuracy and fairness on real datasets.
            </p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold">Education</h3>
            <div className="mt-3 space-y-4  text-left">
              {EDUCATION.map((e) => (
                <div key={e.degree} className="flex items-start gap-3">
                  {/* <div className="mt-1 text-base">🎓</div> */}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{e.degree}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{e.org}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{e.where}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{e.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="grid gap-6">
        {EXPERIENCE.map((x) => (
          <Card key={x.company}>
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 text-left">
                <div className="flex-1 min-w-0">
                  <div className="text-lg font-semibold">{x.role}</div>
                  <div className="text-base text-slate-600 dark:text-slate-400">{x.company}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{x.location}</div>
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 lg:text-right whitespace-nowrap">{x.time}</div>
              </div>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-sm leading-6 text-left">
                {x.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function PubBadge({ tag }) {
  return <Pill>{tag}</Pill>;
}

function Publications() {
  const sorted = useMemo(
    () => [...PUBLICATIONS].sort((a, b) => b.year - a.year),
    []
  );
  return (
    <Section id="publications" title="Publications" subtitle="Selected peer‑reviewed work">
      <div className="grid gap-6">
        {sorted.map((p) => (
          <Card key={p.title}>
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <a href={p.link} target="_blank" rel="noreferrer" className="text-lg font-semibold hover:underline block">
                    {p.title}
                  </a>
                  <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">{p.authors}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">{p.venue}</div>
                  {p.extra && <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">{p.extra}</div>}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 lg:text-right whitespace-nowrap">{p.year}</div>
              </div>
              {/* <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <PubBadge key={t} tag={t} />
                ))}
              </div> */}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" title="Projects" subtitle="Device→System→Model co‑design across IMC & ML">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((p) => (
          <Card key={p.name}>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-base">{p.name}</div>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-6">{p.summary}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" title="Skills">
      <Card>
        <div className="p-6">
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((s) => (
              <Pill key={s}>{s}</Pill>
            ))}
          </div>
        </div>
      </Card>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" title="Contact">
      <Card>
        <div className="p-6 grid sm:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Email</div>
            <a className="font-medium hover:underline" href="mailto:ssmugdho@iastate.edu">ssmugdho@iastate.edu</a>
          </div>
          <div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Location</div>
            <div className="font-medium">Ames, IA, USA</div>
          </div>
          <div>
            <div className="text-sm text-slate-600 dark:text-slate-400">LinkedIn</div>
            <a
              className="font-medium hover:underline"
              href="https://www.linkedin.com/in/sohan-salahuddin-mugdho" target="_blank" rel="noreferrer"
            >
              linkedin.com/in/sohan-salahuddin-mugdho
            </a>
          </div>
          <div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Phone</div>
            <div className="font-medium">+1 (515) 441‑3848</div>
            </div>
        </div>
      </Card>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      <div className="w-full px-6 py-8">
        <div className="text-sm text-slate-500 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Sohan S. Mugdho</div>
          <div className="flex gap-4">
            <a className="hover:underline" href="/Resume_Sohan_Salahuddin_Mugdho.pdf" download="Resume_Sohan_Salahuddin_Mugdho.pdf">CV</a>
            <a className="hover:underline" href="mailto:ssmugdho@iastate.edu">Email</a>
            <a className="hover:underline" href="https://www.linkedin.com/in/sohan-salahuddin-mugdho" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Publications />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}