import { useMemo, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from 'lucide-react';
import {
  Link,
  Route,
  Switch,
  Router as WouterRouter,
  useLocation,
  useParams,
} from 'wouter';

const queryClient = new QueryClient();
const portrait = '/static/kaviyadharshini-portrait.png';

type Project = {
  number: string;
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  featured?: boolean;
};

const projects: Project[] = [
  {
    number: '01',
    slug: 'kubernetes-calculator',
    title: 'Kubernetes Calculator',
    description: 'A three-tier calculator application deployed using Docker and Kubernetes.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'Docker', 'Kubernetes'],
    featured: true,
  },
  {
    number: '02',
    slug: 'aws-infrastructure',
    title: 'AWS Infrastructure',
    description: 'AWS infrastructure provisioned with Terraform across core cloud services.',
    technologies: ['AWS', 'Terraform', 'EC2', 'IAM', 'S3', 'VPC'],
    featured: true,
  },
  {
    number: '03',
    slug: 'fire-detection',
    title: 'Fire Detection',
    description: 'A real-time fire detection system with visual data analysis and IoT alerts.',
    technologies: ['Computer Vision', 'Image Processing', 'IoT'],
    featured: true,
  },
  {
    number: '04',
    slug: 'handwritten-digit-recognition',
    title: 'Handwritten Digit Recognition',
    description: 'A deep learning model with a real-time interface for handwritten digits.',
    technologies: ['Python', 'Deep Learning'],
    featured: true,
  },
  {
    number: '05',
    slug: 'jenkins-ci-cd',
    title: 'Jenkins CI/CD',
    description: 'An automated CI/CD pipeline integrating GitHub, Jenkins and Docker.',
    technologies: ['Jenkins', 'GitHub', 'Docker', 'CI/CD'],
  },
  {
    number: '06',
    slug: 'ai-smart-bank-assistant',
    title: 'AI Smart Bank Assistant',
    description: 'An assistant for banking queries through voice and text interaction.',
    technologies: ['AI', 'NLP'],
  },
  {
    number: '07',
    slug: 'dockerized-notes-application',
    title: 'Dockerized Notes Application',
    description: 'A React, Express.js and MySQL application containerized with Docker Compose.',
    technologies: ['React.js', 'Express.js', 'MySQL', 'Docker', 'Docker Compose'],
  },
];

const skillGroups = [
  ['Programming', 'Python · C · JavaScript · HTML · CSS'],
  ['Development', 'React.js · Node.js · Express.js · MySQL'],
  ['Cloud & DevOps', 'AWS · Docker · Kubernetes · Terraform · Jenkins · Linux'],
  ['ECE / IoT', 'IoT · Arduino · MATLAB · Circuit Simulation'],
  ['Tools', 'Git · GitHub · VS Code · Figma · Canva'],
  ['Concepts', 'CI/CD · Infrastructure as Code · Containerization · Cloud Computing'],
];

const socials = [
  { label: 'GitHub', href: 'https://github.com/Connectwithkavi', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/kaviyadharshinivenkat16', icon: Linkedin },
  { label: 'Email', href: 'mailto:kaviyadharshinivenkat16@gmail.com', icon: Mail },
];

function SectionHeading({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return (
    <div className="mb-12 grid gap-4 md:grid-cols-[180px_1fr] md:items-end">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet-300">/ {eyebrow}</p>
      <div>
        <h2 className="font-serif text-4xl leading-[0.95] tracking-[-0.04em] text-stone-100 sm:text-5xl">{title}</h2>
        {note && <p className="mt-4 max-w-md text-sm leading-6 text-stone-500">{note}</p>}
      </div>
    </div>
  );
}

function ResumeAction({ className = '' }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      data-testid="button-download-resume"
      className={`focus-ring group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-stone-300 transition-colors hover:text-violet-300 ${className}`}
      title="Print this portfolio as a resume"
    >
      Resume <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </button>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const navItems = [
    ['ABOUT', '#about'],
    ['WORK', '#work'],
    ['EXPERIENCE', '#experience'],
    ['LEADERSHIP', '#leadership'],
    ['CONTACT', '#contact'],
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-stone-800/60 bg-[#0e0c12]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="/" data-testid="link-brand" className="focus-ring font-mono text-[11px] font-medium tracking-[0.17em] text-stone-100">
          KAVIYADHARSHINI<span className="text-violet-300">.</span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a href={href} data-testid={`link-nav-${label.toLowerCase()}`} key={label} className="focus-ring font-mono text-[10px] tracking-[0.13em] text-stone-500 transition-colors hover:text-stone-100">
              {label}
            </a>
          ))}
          <span className="ml-2 h-4 w-px bg-stone-700" />
          <ResumeAction />
        </nav>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          data-testid="button-mobile-menu"
          className="focus-ring border border-stone-700 p-2 text-stone-200 lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-stone-800/70 bg-[#0e0c12] px-6 py-5 lg:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-5">
            {navItems.map(([label, href]) => (
              <a href={href} onClick={() => setOpen(false)} data-testid={`link-mobile-${label.toLowerCase()}`} key={label} className="font-mono text-[11px] tracking-[0.18em] text-stone-400 hover:text-violet-300">
                {label}
              </a>
            ))}
            <ResumeAction className="pt-1" />
          </div>
        </nav>
      )}
    </header>
  );
}

function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center ${compact ? 'gap-4' : 'gap-2'}`}>
      {socials.map(({ label, href, icon: Icon }) => (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer' : undefined}
          key={label}
          aria-label={label}
          data-testid={`link-social-${label.toLowerCase()}`}
          className={`focus-ring inline-flex items-center justify-center border border-stone-800 text-stone-500 transition-all hover:border-violet-400/70 hover:bg-violet-400/10 hover:text-violet-300 ${compact ? 'h-9 w-9' : 'h-10 w-10'}`}
        >
          <Icon size={compact ? 15 : 16} strokeWidth={1.5} />
        </a>
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[720px] items-center overflow-hidden border-b border-stone-800/70 pt-[72px]" aria-labelledby="hero-title">
      <div className="site-grid absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -right-40 top-24 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="mx-auto grid w-full max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1fr_390px] lg:items-center lg:px-10 lg:py-24">
        <div className="relative z-10">
          <p className="reveal font-mono text-[10px] tracking-[0.22em] text-violet-300">ECE ENGINEERING STUDENT · 2027</p>
          <h1 id="hero-title" className="reveal reveal-delay-1 mt-7 max-w-3xl font-serif text-[clamp(2.35rem,10vw,8.8rem)] leading-[0.83] tracking-[-0.075em] text-stone-100">
            <span className="block">Kaviyadharshini</span>
            <em className="block text-violet-300">V</em>
          </h1>
          <div className="reveal reveal-delay-2 mt-9 flex items-start gap-4">
            <span className="mt-2 h-px w-10 bg-violet-400" />
            <div>
              <p className="font-mono text-sm leading-7 tracking-[0.07em] text-stone-100 sm:text-base">I BUILD. I LEARN. I LEAD.</p>
              <p className="mt-4 max-w-lg text-sm leading-7 text-stone-500">Building practical solutions across software, cloud and IoT while creating impact beyond the classroom.</p>
            </div>
          </div>
          <div className="reveal reveal-delay-3 mt-10 flex flex-wrap items-center gap-5">
            <a href="#work" data-testid="link-explore-work" className="focus-ring group inline-flex items-center gap-3 border border-violet-400/70 bg-violet-400 px-5 py-3 font-mono text-[10px] tracking-[0.15em] text-[#18101f] transition-all hover:bg-violet-300">
              Explore my work <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
            <button type="button" onClick={() => window.print()} data-testid="button-hero-resume" className="focus-ring group inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] text-stone-400 transition-colors hover:text-stone-100">
              Download resume <Download size={14} className="transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>
          <div className="reveal reveal-delay-3 mt-14 flex items-center gap-3">
            <SocialLinks />
            <span className="ml-2 font-mono text-[9px] tracking-[0.16em] text-stone-600">CHENNAI, INDIA</span>
          </div>
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[340px] lg:justify-self-end">
          <div className="absolute -inset-5 border border-violet-400/20" />
          <div className="absolute -inset-2 border border-violet-400/35" />
          <div className="portrait-float relative aspect-[0.76] overflow-hidden border border-violet-300/60 bg-stone-900 shadow-[0_0_80px_rgba(139,92,246,.15)]">
            <img src={portrait} alt="Kaviyadharshini V" className="h-full w-full object-cover object-top grayscale-[15%]" data-testid="img-hero-portrait" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c12]/30 to-transparent" />
            <span className="absolute bottom-4 left-4 font-mono text-[9px] tracking-[0.2em] text-stone-200">K / 01</span>
          </div>
          <p className="mt-5 flex justify-between font-mono text-[9px] tracking-[0.16em] text-stone-600">
            <span>ECE · SOFTWARE · CLOUD · IoT · LEADERSHIP</span>
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute -bottom-20 right-[24%] hidden select-none font-serif text-[25rem] leading-none text-violet-300/[0.025] lg:block">K</div>
    </section>
  );
}

function About() {
  const blocks = [
    ['01', 'ENGINEERING', 'B.E. ECE', '2023–2027'],
    ['02', 'BUILDING', 'Software · Cloud · IoT', ''],
    ['03', 'LEADING', 'Life Skill Club', 'President'],
  ];
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-28 lg:px-10 lg:py-36">
      <SectionHeading eyebrow="About" title="A little about me." />
      <div className="grid gap-12 md:grid-cols-[1.15fr_1fr] md:gap-24">
        <p className="font-serif text-3xl leading-[1.15] tracking-[-0.035em] text-stone-200 sm:text-4xl">ECE student who likes to build, explore and lead — turning ideas into practical projects while taking on responsibilities beyond the classroom.</p>
        <div className="grid grid-cols-3 border-t border-stone-800 pt-5">
          {blocks.map(([number, label, value, detail]) => (
            <div key={number} className="border-r border-stone-800 px-3 first:pl-0 last:border-0 sm:px-5">
              <span className="font-mono text-[10px] text-violet-300">{number}</span>
              <p className="mt-8 font-mono text-[9px] tracking-[0.13em] text-stone-500">{label}</p>
              <p className="mt-2 text-xs leading-5 text-stone-200">{value}</p>
              {detail && <p className="text-xs leading-5 text-stone-500">{detail}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="border-y border-stone-800/70 bg-[#100d15]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Skills" title="What I work with." note="A practical toolkit shaped by building across software, systems and electronics." />
        <div className="grid border-t border-stone-800 md:grid-cols-2">
          {skillGroups.map(([label, value], index) => (
            <div key={label} className={`group border-b border-stone-800 py-6 md:px-5 ${index % 2 === 0 ? 'md:border-r md:pl-0' : 'md:pr-0'}`}>
              <div className="flex items-start justify-between gap-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-violet-300">{label}</span>
                <span className="text-right text-sm leading-6 text-stone-400 transition-colors group-hover:text-stone-100">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} data-testid={`link-project-${project.slug}`} className="project-card focus-ring group block border-t border-stone-800 py-7 transition-colors hover:border-violet-400/70">
      <div className="grid gap-5 md:grid-cols-[70px_1fr_1.1fr_150px] md:items-center">
        <span className="project-index font-mono text-sm text-stone-600">{project.number}</span>
        <h3 className="font-serif text-2xl tracking-[-0.03em] text-stone-100 sm:text-3xl">{project.title}</h3>
        <div>
          <p className="max-w-md text-sm leading-6 text-stone-500">{project.description}</p>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
            {project.technologies.map((technology) => <span key={technology} className="font-mono text-[9px] tracking-[0.08em] text-violet-300/80">{technology}</span>)}
          </div>
        </div>
        <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-stone-400 transition-colors group-hover:text-violet-300 md:justify-self-end">
          View project <ArrowUpRight size={14} className="project-arrow" />
        </span>
      </div>
    </Link>
  );
}

function Work() {
  return (
    <section id="work" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-28 lg:px-10 lg:py-36">
      <SectionHeading eyebrow="Selected work" title="Things I've built, explored and deployed." />
      <div className="border-b border-stone-800">
        {projects.map((project) => <ProjectCard project={project} key={project.slug} />)}
      </div>
      <p className="mt-5 font-mono text-[9px] tracking-[0.14em] text-stone-600">07 PROJECTS / CLICK TO EXPLORE</p>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="border-t border-stone-800/70 bg-[#100d15] scroll-mt-28">
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
        <SectionHeading eyebrow="Experience" title="Where I have learned by doing." />
        <div className="grid gap-0 border-t border-stone-800 md:grid-cols-2">
          <article className="border-b border-stone-800 py-8 md:border-r md:pr-12">
            <div className="flex items-start justify-between gap-4">
              <p className="font-mono text-[10px] tracking-[0.17em] text-violet-300">NSIC</p>
              <span className="font-mono text-[9px] text-stone-600">INTERNSHIP</span>
            </div>
            <h3 className="mt-8 font-serif text-3xl text-stone-100">IoT Intern</h3>
            <p className="mt-5 text-sm leading-7 text-stone-500">Worked with sensors, microcontrollers, circuit design, soldering and hardware integration while developing IoT prototypes.</p>
            <p className="mt-7 font-mono text-[9px] tracking-[0.12em] text-stone-400">IoT · Sensors · Embedded Systems</p>
          </article>
          <article className="border-b border-stone-800 py-8 md:pl-12">
            <div className="flex items-start justify-between gap-4">
              <p className="font-mono text-[10px] tracking-[0.17em] text-violet-300">BSNL</p>
              <span className="font-mono text-[9px] text-stone-600">INDUSTRIAL TRAINING</span>
            </div>
            <h3 className="mt-8 font-serif text-3xl text-stone-100">Telecom / Industrial Trainee</h3>
            <p className="mt-5 text-sm leading-7 text-stone-500">Gained exposure to telecommunication systems, optical fiber communication, switching systems and network operations.</p>
            <p className="mt-7 font-mono text-[9px] tracking-[0.12em] text-stone-400">Telecommunication · Optical Fiber · Networking</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  const domains = ['FINANCIAL LITERACY', 'CYBER AWARENESS', 'MENTAL WELLNESS', 'LANGUAGE'];
  return (
    <section id="leadership" className="relative overflow-hidden scroll-mt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(139,92,246,.16),transparent_35%)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
        <SectionHeading eyebrow="Leadership" title="Responsibility, with a wider lens." />
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-violet-300">PRESIDENT / LIFE SKILL CLUB</p>
            <h3 className="mt-8 max-w-2xl font-serif text-[clamp(3.8rem,8vw,7.5rem)] leading-[0.8] tracking-[-0.07em] text-stone-100">Leading<br /><em className="text-violet-300">beyond</em><br />the classroom.</h3>
            <p className="mt-10 max-w-md text-sm leading-7 text-stone-400">As President, I coordinate student initiatives, activities and teams focused on practical personal and professional development.</p>
          </div>
          <div className="lg:pt-4">
            <p className="mb-5 font-mono text-[9px] tracking-[0.18em] text-stone-600">FOUR DOMAINS / 01—04</p>
            <div className="border-t border-stone-800">
              {domains.map((domain, index) => (
                <div key={domain} className="flex items-center justify-between border-b border-stone-800 py-5">
                  <span className="font-mono text-[10px] text-violet-300">0{index + 1}</span>
                  <span className="text-right text-sm tracking-[0.05em] text-stone-300">{domain}</span>
                </div>
              ))}
            </div>
            <ul className="mt-10 grid gap-3 text-xs text-stone-500 sm:grid-cols-2">
              {['Planning club activities', 'Coordinating initiatives', 'Managing student teams', 'Delegating responsibilities', 'Working with students and faculty'].map((item) => (
                <li key={item} className="flex items-center gap-2"><span className="h-1 w-1 bg-violet-300" />{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  const achievements = [
    ['BEST STUDENT AWARD', 'Academic Excellence & Leadership'],
    ['NASSCOM BUILDATHON', 'Finale Shortlisted'],
    ['SYMPOSIUM COMPETITIONS', 'Winner of Multiple Competitions'],
    ['SMART INDIA HACKATHON', 'Participant'],
    ['NCC AIR WING', 'A Certificate'],
  ];
  const certifications = [
    ['Oracle Cloud Infrastructure', 'Foundations Associate'],
    ['AWS Educate', 'Introduction to Cloud 101'],
    ['NPTEL', 'Introduction to Internet of Things · Elite + Silver'],
    ['NPTEL', 'Data Structures and Algorithm Design'],
    ['freeCodeCamp', 'Responsive Web Design'],
  ];
  return (
    <section className="border-t border-stone-800/70 bg-[#100d15]">
      <div className="mx-auto grid max-w-7xl gap-24 px-6 py-28 lg:grid-cols-2 lg:px-10 lg:py-36">
        <div>
          <p className="mb-10 font-mono text-[10px] tracking-[0.2em] text-violet-300">/ A FEW THINGS I'M PROUD OF</p>
          <div className="border-t border-stone-800">
            {achievements.map(([title, detail]) => (
              <div key={title} className="flex items-center justify-between gap-4 border-b border-stone-800 py-5">
                <span className="text-sm text-stone-200">{title}</span>
                <span className="text-right text-xs text-stone-500">{detail}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-10 font-mono text-[10px] tracking-[0.2em] text-violet-300">/ SELECTED CERTIFICATIONS</p>
          <div className="border-t border-stone-800">
            {certifications.map(([title, detail]) => (
              <div key={`${title}-${detail}`} className="border-b border-stone-800 py-5">
                <p className="text-sm text-stone-200">{title}</p>
                <p className="mt-1 text-xs text-stone-500">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="grid gap-10 md:grid-cols-[180px_1fr_1fr]">
        <p className="font-mono text-[10px] tracking-[0.2em] text-violet-300">/ EDUCATION</p>
        <div>
          <h3 className="font-serif text-2xl text-stone-100">B.E. Electronics and Communication Engineering</h3>
          <p className="mt-2 text-sm text-stone-500">Dhaanish Chennai College of Engineering · 2023–2027</p>
          <p className="mt-4 font-mono text-[10px] tracking-[0.13em] text-stone-400">CGPA: 8.5+</p>
        </div>
        <div className="border-t border-stone-800 pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
          <h3 className="font-serif text-2xl text-stone-100">Higher Secondary</h3>
          <p className="mt-2 text-sm text-stone-500">Valluvar Gurukulam Higher Secondary School</p>
          <p className="mt-4 font-mono text-[10px] tracking-[0.13em] text-stone-400">84.3%</p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-28 border-t border-stone-800/70 bg-violet-300 px-6 py-24 text-[#17101d] lg:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:items-end">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#5b3975]">/ CONTACT</p>
            <h2 className="mt-8 font-serif text-[clamp(4rem,10vw,9rem)] leading-[0.8] tracking-[-0.075em]">Let's<br /><em>connect.</em></h2>
            <p className="mt-10 max-w-sm text-sm leading-7 text-[#5b3975]">Open to opportunities, collaboration and interesting things to build.</p>
          </div>
          <div className="flex flex-col items-start gap-5 lg:items-end">
            <a href="mailto:kaviyadharshinivenkat16@gmail.com" data-testid="link-contact-email" className="focus-ring group flex items-center gap-3 font-mono text-xs tracking-[0.13em] transition-transform hover:translate-x-1">EMAIL <ArrowUpRight size={17} /></a>
            <a href="https://linkedin.com/in/kaviyadharshinivenkat16" target="_blank" rel="noreferrer" data-testid="link-contact-linkedin" className="focus-ring group flex items-center gap-3 font-mono text-xs tracking-[0.13em] transition-transform hover:translate-x-1">LINKEDIN <ArrowUpRight size={17} /></a>
            <a href="https://github.com/Connectwithkavi" target="_blank" rel="noreferrer" data-testid="link-contact-github" className="focus-ring group flex items-center gap-3 font-mono text-xs tracking-[0.13em] transition-transform hover:translate-x-1">GITHUB <ArrowUpRight size={17} /></a>
            <div className="mt-7 border-t border-[#8f62ab]/50 pt-5 text-left text-xs leading-6 text-[#5b3975] lg:text-right">
              <p className="flex items-center gap-2 lg:justify-end"><Mail size={13} /> kaviyadharshinivenkat16@gmail.com</p>
              <p className="mt-1 flex items-center gap-2 lg:justify-end"><Phone size={13} /> +91 7305625213</p>
              <p className="mt-1 flex items-center gap-2 lg:justify-end"><MapPin size={13} /> Chennai, India</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-stone-800/70 px-6 py-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 text-[9px] tracking-[0.14em] text-stone-600 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono text-stone-300">KAVIYADHARSHINI V<span className="text-violet-300">.</span></span>
        <span className="font-mono">ECE ENGINEERING · SOFTWARE · CLOUD · IoT · LEADERSHIP</span>
        <span className="font-mono">© 2026 KAVIYADHARSHINI V</span>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="grain min-h-[100dvh] overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Leadership />
        <Highlights />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const project = useMemo(() => projects.find((item) => item.slug === slug), [slug]);
  if (!project) return <NotFound />;
  const index = projects.findIndex((item) => item.slug === slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return (
    <div className="grain min-h-[100dvh]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-36 lg:px-10 lg:pt-44">
        <Link href="/#work" data-testid="link-back-projects" className="focus-ring inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] text-stone-500 transition-colors hover:text-violet-300"><ChevronLeft size={15} /> Back to projects</Link>
        <div className="mt-12 grid gap-12 border-b border-stone-800 pb-16 lg:grid-cols-[1fr_280px]">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-violet-300">PROJECT {project.number} / SELECTED WORK</p>
            <h1 className="mt-7 max-w-4xl font-serif text-[clamp(3.6rem,8vw,8rem)] leading-[0.82] tracking-[-0.07em] text-stone-100">{project.title}</h1>
            <p className="mt-9 max-w-xl text-base leading-7 text-stone-400">{project.description}</p>
          </div>
          <div className="lg:pt-2">
            <p className="font-mono text-[9px] tracking-[0.16em] text-stone-600">TECHNOLOGIES</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((technology) => <span key={technology} className="border border-stone-800 px-3 py-2 font-mono text-[9px] text-stone-400">{technology}</span>)}
            </div>
          </div>
        </div>
        <div className="relative mt-14 flex min-h-[340px] items-center justify-center overflow-hidden border border-stone-800 bg-[#100d15] lg:min-h-[500px]">
          <div className="site-grid absolute inset-0 opacity-60" />
          <div className="relative text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center border border-violet-300/40 text-violet-300"><ExternalLink size={20} strokeWidth={1.3} /></div>
            <p className="font-mono text-xs tracking-[0.15em] text-stone-300">PROJECT SCREENSHOT</p>
            <p className="mt-3 text-sm text-stone-600">Add project screenshot here</p>
          </div>
          <span className="absolute left-5 top-5 font-mono text-[9px] text-stone-600">VISUAL / {project.number}</span>
          <span className="absolute bottom-5 right-5 font-mono text-[9px] text-stone-600">DETAILS TO BE ADDED</span>
        </div>
        <div className="mt-20 grid gap-12 lg:grid-cols-[180px_1fr]">
          <p className="font-mono text-[10px] tracking-[0.18em] text-violet-300">/ PROJECT NOTES</p>
          <div className="grid gap-12 md:grid-cols-2">
            {['Overview', 'Architecture / Workflow', 'My contribution', 'Challenges', 'What I learned'].map((heading) => (
              <article key={heading} className="border-t border-stone-800 pt-5">
                <h2 className="font-serif text-2xl text-stone-100">{heading}</h2>
                <p className="mt-5 text-sm leading-7 text-stone-500">Details to be added.</p>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-20 flex flex-col gap-5 border-y border-stone-800 py-6 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" onClick={() => setLocation(`/work/${previous.slug}`)} data-testid="button-previous-project" className="focus-ring group flex items-center gap-3 text-left">
            <ChevronLeft size={18} className="text-violet-300 transition-transform group-hover:-translate-x-1" />
            <span><span className="block font-mono text-[9px] tracking-[0.15em] text-stone-600">PREVIOUS</span><span className="mt-1 block font-serif text-lg text-stone-200">{previous.title}</span></span>
          </button>
          <button type="button" onClick={() => setLocation(`/work/${next.slug}`)} data-testid="button-next-project" className="group flex items-center gap-3 text-right">
            <span><span className="block font-mono text-[9px] tracking-[0.15em] text-stone-600">NEXT</span><span className="mt-1 block font-serif text-lg text-stone-200">{next.title}</span></span>
            <ChevronRight size={18} className="text-violet-300 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/work/:slug" component={ProjectDetail} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;