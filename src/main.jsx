import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { navItems, proposal } from './proposalData';
import './styles.css';

const makeIcon = (symbol) =>
  function Icon({ size = 20 }) {
    return (
      <span className="inlineIcon" style={{ width: size, height: size, fontSize: Math.max(12, size * 0.72) }}>
        {symbol}
      </span>
    );
  };

const Activity = makeIcon('A');
const ArrowUp = makeIcon('↑');
const BarChart3 = makeIcon('B');
const Brain = makeIcon('M');
const CalendarDays = makeIcon('C');
const Check = makeIcon('✓');
const ChevronRight = makeIcon('›');
const CircleDollarSign = makeIcon('$');
const Layers3 = makeIcon('L');
const Menu = makeIcon('☰');
const Phone = makeIcon('P');
const ShieldCheck = makeIcon('S');
const Sparkles = makeIcon('✦');
const Trophy = makeIcon('T');
const X = makeIcon('×');

const motionTags = ['div', 'section', 'article', 'h2', 'i'];
const motion = Object.fromEntries(
  motionTags.map((tag) => [
    tag,
    ({ variants, initial, animate, whileInView, viewport, transition, whileHover, ...props }) =>
      React.createElement(tag, props),
  ]),
);

const reveal = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <main>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />
      <header className="navBar">
        <button className="wordmark" onClick={() => goTo('top')} aria-label="Back to top">
          <span className="wellxMark">w</span>
          <span>Wellx</span>
          <small>for AIMS Gulf</small>
        </button>
        <nav className={menuOpen ? 'navLinks open' : 'navLinks'}>
          {navItems.map(([id, label]) => (
            <button key={id} onClick={() => goTo(id)}>
              {label}
            </button>
          ))}
        </nav>
        <button className="navIcon" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <Hero goTo={goTo} />
      <BrokerOpportunity />
      <ProblemToSolution />
      <OperatingSystemDiagram />
      <StakeholderTabs />
      <TrustMomentum />
      <ProductShowcase />
      <HRDashboardMockup />
      <AimsAdvantage />
      <PricingModel />
      <NextSteps />
      <FinalCTA />
      <button className="toTop" onClick={() => goTo('top')} aria-label="Back to top">
        <ArrowUp />
      </button>
    </main>
  );
}

function Hero({ goTo }) {
  return (
    <section className="hero" id="top">
      <div className="heroGlow" />
      <motion.div initial="hidden" animate="show" variants={stagger} className="heroContent">
        <motion.div variants={reveal} className="proposalTag">
          <span>Commercial proposal</span>
          <span>{proposal.client}</span>
        </motion.div>
        <motion.h1 variants={reveal}>{proposal.title}</motion.h1>
        <motion.div variants={stagger} className="heroPillars">
          {[
            'One platform for employee wellbeing',
            'One data layer for HR and insurers',
            'One commercial edge for brokers',
          ].map((line) => (
            <motion.div variants={reveal} key={line}>
              <Check size={18} />
              {line}
            </motion.div>
          ))}
        </motion.div>
        <motion.div variants={reveal} className="heroActions">
          <button className="primary" onClick={() => goTo('opportunity')}>
            Explore the proposal <ChevronRight size={18} />
          </button>
          <button className="secondary" onClick={() => goTo('commercial')}>
            View commercial options
          </button>
        </motion.div>
      </motion.div>
      <motion.div
        className="heroDevice"
        initial={{ opacity: 0, x: 70, rotate: 4 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <PhoneMockup />
        <DashboardMini />
      </motion.div>
    </section>
  );
}

function BrokerOpportunity() {
  return (
    <Section id="opportunity" eyebrow="The broker opportunity" title="Your clients are asking for more than insurance.">
      <div className="boardroom">
        {proposal.brokerShift.map(([from, to]) => (
          <motion.article variants={reveal} key={from}>
            <span>{from}</span>
            <ChevronRight />
            <strong>{to}</strong>
          </motion.article>
        ))}
      </div>
      <motion.p variants={reveal} className="lead">
        AIMS can move from placement partner to year-round value partner. Wellx gives each client a daily experience, and gives AIMS renewal evidence that price alone cannot create.
      </motion.p>
    </Section>
  );
}

function ProblemToSolution() {
  return (
    <Section id="model" eyebrow="The fragmented model" title="Scattered tools weaken the renewal story.">
      <div className="collapseStage">
        <div className="scatter">
          {proposal.fragmentedTools.map((tool, index) => (
            <motion.div
              variants={reveal}
              className={`vendor vendor${index + 1}`}
              key={tool}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              {tool}
            </motion.div>
          ))}
        </div>
        <motion.div className="wellxLayer" variants={reveal}>
          <span>Wellx layer</span>
          <strong>One connected experience</strong>
          <p>Engagement, rewards, health intelligence and insurance reporting in one measurable operating layer.</p>
        </motion.div>
      </div>
      <motion.h3 variants={reveal} className="closingLine">
        Fragmentation creates complexity. Wellx creates one measurable experience.
      </motion.h3>
    </Section>
  );
}

function OperatingSystemDiagram() {
  return (
    <Section id="os" eyebrow="The Wellx operating system" title="Three connected layers, built for daily action and renewal intelligence.">
      <div className="osDiagram">
        {proposal.layers.map((layer, index) => (
          <motion.article variants={reveal} className="osLayer" key={layer.name}>
            <span className="layerIndex">0{index + 1}</span>
            <h3>{layer.name}</h3>
            <p>{layer.detail}</p>
            <b>{layer.signal}</b>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function StakeholderTabs() {
  const [active, setActive] = useState('Broker');
  const current = proposal.stakeholders.find((item) => item.name === active);

  return (
    <Section id="stakeholders" eyebrow="Four stakeholders, one experience" title="The same system creates value for every participant.">
      <div className="stakeholderShell">
        <div className="stakeholderTabs">
          {proposal.stakeholders.map((item) => (
            <button
              key={item.name}
              className={active === item.name ? 'selected' : item.featured ? 'featured' : ''}
              onClick={() => setActive(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <motion.div
          key={active}
          className="stakeholderPanel"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Sparkles />
          <h3>{current.name}</h3>
          <p>{current.line}</p>
          {current.name === 'Broker' && <strong>Highlighted for AIMS Gulf</strong>}
        </motion.div>
      </div>
    </Section>
  );
}

function TrustMomentum() {
  return (
    <section className="trust">
      <MetricsStrip />
      <LogoWall />
    </section>
  );
}

function MetricsStrip() {
  return (
    <div className="metricsStrip">
      {proposal.proof.map((item) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <strong>{item.value}</strong>
          <span>{item.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

function LogoWall() {
  return (
    <Section id="momentum" eyebrow="Trust and momentum" title="Proof from leading employers across the Gulf and beyond.">
      <div className="logoWall">
        {proposal.logos.map((logo) => (
          <motion.div variants={reveal} whileHover={{ y: -5 }} key={logo}>
            {logo}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function ProductShowcase() {
  return (
    <Section id="experience" eyebrow="Product experience" title="The product becomes the daily reason clients feel Wellx.">
      <div className="productShowcase">
        <PhoneMockup />
        <div className="momentGrid">
          {proposal.productMoments.map((moment, index) => (
            <motion.div variants={reveal} key={moment} className="momentCard">
              {iconFor(index)}
              <span>{moment}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function HRDashboardMockup() {
  return (
    <Section id="hr" eyebrow="What HR gains" title="Executive visibility without the manual drag.">
      <div className="hrGrid">
        <div className="dashboardLarge">
          <div className="dashHeader">
            <span>HR Intelligence</span>
            <b>Live portfolio view</b>
          </div>
          <div className="chartBars">
            {[72, 48, 84, 61, 92, 56, 78].map((height, index) => (
              <motion.i
                key={index}
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.05 }}
              />
            ))}
          </div>
          <div className="signalRow">
            <span>Participation up 18%</span>
            <span>Fatigue risk down 9%</span>
            <span>Reward value visible</span>
          </div>
        </div>
        <div className="hrGains">
          {proposal.hrGains.map(([title, detail]) => (
            <motion.article variants={reveal} key={title}>
              <Check size={18} />
              <div>
                <strong>{title}</strong>
                <p>{detail}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function AimsAdvantage() {
  return (
    <Section id="aims" eyebrow="Why this matters to AIMS" title="AIMS can turn wellbeing into a portfolio advantage.">
      <div className="aimsPanel">
        <div>
          <h3>From policy placement to living client value.</h3>
          <p>
            The flagship 70,000-life account can become the case study. The outcome becomes a repeatable renewal story across the AIMS book.
          </p>
        </div>
        <div className="aimsList">
          {proposal.aimsValue.map((item) => (
            <motion.div variants={reveal} key={item}>
              <Check size={18} />
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function PricingModel() {
  const [mode, setMode] = useState('client');
  const data = proposal.pricing;
  const labels = {
    client: 'Per-client SaaS',
    portfolio: 'Portfolio model',
    tiers: 'Volume-based model',
  };

  const content = useMemo(() => {
    if (mode === 'client') return data.client;
    if (mode === 'portfolio') return data.portfolio;
    return data.tiers;
  }, [mode]);

  return (
    <Section id="commercial" eyebrow="Commercial model" title="Clear options for broker growth and CFO review.">
      <div className="pricingSwitch" role="tablist" aria-label="Pricing model">
        {Object.entries(labels).map(([key, label]) => (
          <button className={mode === key ? 'selected' : ''} onClick={() => setMode(key)} key={key}>
            {label}
          </button>
        ))}
      </div>
      <motion.div className="pricingGrid" key={mode} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        {content.map((row) => (
          <PricingCard key={row.join('-')} row={row} mode={mode} />
        ))}
      </motion.div>
    </Section>
  );
}

function PricingCard({ row, mode }) {
  if (mode === 'tiers') {
    return (
      <article className="pricingCard compact">
        <span>{row[0]}</span>
        <strong>{row[1]}</strong>
        <p>per member per year</p>
      </article>
    );
  }

  return (
    <article className="pricingCard">
      <span>{row[0]}</span>
      <h3>{row[1]}</h3>
      <p>{row[2]}</p>
      <strong>
        {row[3]} <small>{row[4]}</small>
      </strong>
    </article>
  );
}

function NextSteps() {
  return (
    <Section id="path" eyebrow="Recommended path" title="Start narrow, prove value, then scale with confidence.">
      <div className="stepLine">
        {proposal.nextSteps.map(([title, detail], index) => (
          <motion.article variants={reveal} key={title}>
            <span>{index + 1}</span>
            <h3>{title}</h3>
            <p>{detail}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function FinalCTA() {
  return (
    <section className="finalCta">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} variants={stagger}>
        <motion.h2 variants={reveal}>Let’s turn AIMS’ portfolio into a living wellness ecosystem.</motion.h2>
        <motion.div variants={reveal} className="contactCard">
          <strong>{proposal.contact.name}</strong>
          <span>{proposal.contact.role}</span>
          <a href={`mailto:${proposal.contact.email}`}>{proposal.contact.email}</a>
          <a href={`tel:${proposal.contact.phone.replaceAll(' ', '')}`}>{proposal.contact.phone}</a>
          <span>{proposal.contact.url}</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Section({ id, eyebrow, title, children }) {
  return (
    <motion.section
      id={id}
      className="section"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <motion.div variants={reveal} className="sectionHeader">
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </motion.div>
      {children}
    </motion.section>
  );
}

function PhoneMockup() {
  return (
    <div className="phoneMock">
      <div className="phoneTop" />
      <div className="appHero">
        <span>Today</span>
        <strong>Move, breathe, earn</strong>
      </div>
      <div className="rings">
        <i />
        <i />
        <i />
      </div>
      <div className="phoneCards">
        <div>
          <Trophy size={18} />
          <span>Team challenge</span>
          <b>2nd place</b>
        </div>
        <div>
          <CircleDollarSign size={18} />
          <span>xCoins</span>
          <b>8,450</b>
        </div>
        <div>
          <Brain size={18} />
          <span>Mood</span>
          <b>Calm</b>
        </div>
      </div>
    </div>
  );
}

function DashboardMini() {
  return (
    <div className="dashboardMini">
      <span>Renewal intelligence</span>
      <strong>70,000 lives</strong>
      <div>
        <i style={{ width: '82%' }} />
        <i style={{ width: '64%' }} />
        <i style={{ width: '91%' }} />
      </div>
      <p>Engagement, fatigue and reward signals ready for the client review.</p>
    </div>
  );
}

function iconFor(index) {
  const icons = [Trophy, BarChart3, CircleDollarSign, Brain, Activity, Check, Sparkles, ShieldCheck, Phone, Layers3, CalendarDays];
  const Icon = icons[index % icons.length];
  return <Icon size={20} />;
}

createRoot(document.getElementById('root')).render(<App />);
