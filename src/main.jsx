import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Layers3,
  LineChart,
  Menu,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  X,
} from 'lucide-react';
import './styles.css';

const sections = [
  { id: 'opening', label: 'Opening' },
  { id: 'fit', label: 'Strategic fit' },
  { id: 'context', label: 'Market shift' },
  { id: 'platform', label: 'Platform' },
  { id: 'hr', label: 'HR gains' },
  { id: 'commercial', label: 'Commercials' },
  { id: 'rollout', label: 'Rollout' },
  { id: 'appendix', label: 'Source deck' },
];

const proposalPages = Array.from({ length: 12 }, (_, index) => {
  const page = String(index + 1).padStart(2, '0');
  return `/proposal/proposal-page-${page}.jpg`;
});

const clientOptions = [
  {
    id: 'option1',
    name: 'Option 1',
    title: 'Standard SaaS',
    detail: 'Wellx experience excluding cash rewards',
    rate: 15,
    suffix: '/ member / year',
  },
  {
    id: 'option2',
    name: 'Option 2',
    title: 'Full Wellx experience',
    detail: 'Complete employee wellbeing, rewards, and reporting layer',
    rate: 30,
    suffix: '/ member / year',
  },
  {
    id: 'option3',
    name: 'Option 3',
    title: 'Reseller',
    detail: 'AIMS Gulf-led commercial model with Wellx as platform layer',
    rate: 50,
    suffix: '/ member / year',
  },
];

const portfolioOptions = [
  ['Wellx Light', 'Up to 1 million licenses', '$100,000 / year'],
  ['X Upgrade', 'AI Face Scan, Care Concierge, Telemedicine, Social Challenges, unlimited mental health sessions, cash rewards', '$30 / member / year'],
  ['Broker White-label App', 'AIMS Gulf-branded broker app', '$50,000 / one-time'],
  ['Client Sub-Whitelabel', 'Dedicated client-level branded experience', '$3,000 / one-time'],
  ['Ring-Fenced Cloud', 'Dedicated cloud environment', '$100,000 / year'],
];

const tierBands = [
  { label: 'First 10,000', size: 10000, rate: 30 },
  { label: 'Next 40,000', size: 40000, rate: 25 },
  { label: 'Next 50,000', size: 50000, rate: 22 },
  { label: 'Next 100,000', size: 100000, rate: 18 },
  { label: 'Next 100,000', size: 100000, rate: 15 },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);

function tieredCost(members) {
  let remaining = members;
  let total = 0;
  const rows = [];

  for (const band of tierBands) {
    const count = Math.max(0, Math.min(remaining, band.size));
    rows.push({ ...band, count, subtotal: count * band.rate });
    total += count * band.rate;
    remaining -= count;
  }

  return { total, rows };
}

function App() {
  const [active, setActive] = useState('opening');
  const [menuOpen, setMenuOpen] = useState(false);
  const [members, setMembers] = useState(70000);
  const [selectedOption, setSelectedOption] = useState(clientOptions[1]);
  const [pageIndex, setPageIndex] = useState(0);
  const tiered = useMemo(() => tieredCost(members), [members]);
  const selectedTotal = members * selectedOption.rate;

  const goTo = (id) => {
    setActive(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="app">
      <header className="topbar">
        <button className="brand" onClick={() => goTo('opening')} aria-label="Go to opening">
          <img src="/proposal/proposal-page-01.jpg" alt="" />
          <span>Wellx</span>
          <span className="muted">for AIMS Gulf</span>
        </button>
        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Proposal sections">
          {sections.map((section) => (
            <button
              key={section.id}
              className={active === section.id ? 'active' : ''}
              onClick={() => goTo(section.id)}
            >
              {section.label}
            </button>
          ))}
        </nav>
        <button className="iconButton" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <Section id="opening" eyebrow="Commercial proposal" title="A single gateway to health and wellness for modern organizations." onEnter={setActive}>
        <div className="heroGrid">
          <div className="heroCopy">
            <p>
              Wellx gives AIMS Gulf a differentiated benefits platform for Saudi employers: daily engagement for members,
              clear workforce insight for HR, and insurer-ready prevention data at renewal.
            </p>
            <div className="heroActions">
              <button onClick={() => goTo('commercial')} className="primaryCta">
                Explore value <ArrowRight size={18} />
              </button>
              <button onClick={() => goTo('appendix')} className="secondaryCta">
                View source deck
              </button>
            </div>
          </div>
          <div className="proposalFrame">
            <img src="/proposal/proposal-page-01.jpg" alt="Original proposal cover for AIMS Gulf Insurance Brokers" />
          </div>
        </div>
      </Section>

      <Section id="fit" eyebrow="Why this fits AIMS Gulf" title="AIMS Gulf already sells trust. Wellx adds the measurable daily experience." onEnter={setActive}>
        <div className="fitGrid">
          {[
            ['Transparency', 'Employee engagement, reward value, and workforce signals become visible instead of assumed.', ShieldCheck],
            ['Integrity', 'A prevention-first experience supports AIMS Gulf’s client-first promise beyond placement.', Check],
            ['Efficiency', 'One platform replaces fragmented wellness vendors, spreadsheets, reward handling, and manual reporting.', Rocket],
            ['Innovation', 'AI-powered health technology and broker infrastructure help AIMS Gulf stand out at renewal.', Sparkles],
          ].map(([title, body, Icon]) => (
            <article className="valueCard" key={title}>
              <Icon size={26} />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <div className="researchStrip">
          <strong>AIMS Gulf signal:</strong>
          <span>
            Saudi insurance brokerage since 2009, focused on tailored coverage, risk management, claims support,
            high client retention, and Vision 2030-aligned enterprise resilience.
          </span>
        </div>
      </Section>

      <Section id="context" eyebrow="The market shift" title="Workforce wellbeing has moved from annual activity to everyday infrastructure." onEnter={setActive}>
        <div className="split">
          <div>
            <h3>The old model fragments value.</h3>
            <ul className="plainList">
              <li>Mental wellbeing support</li>
              <li>Rewards programmes</li>
              <li>Engagement tools</li>
              <li>Reporting tools</li>
              <li>Wellness challenges</li>
            </ul>
          </div>
          <div className="impactPanel">
            <span>The result</span>
            <h3>Multiple vendors, low adoption, no single view, and limited renewal evidence.</h3>
            <p>HR spends time managing tools instead of helping people. Brokers lose the chance to tell a data-backed prevention story.</p>
          </div>
        </div>
      </Section>

      <Section id="platform" eyebrow="The Wellx approach" title="One platform. One experience. One outcome." onEnter={setActive}>
        <div className="platformShell">
          {[
            ['Member app', 'Daily habits, mood tracking, challenges, personal goals, and rewards.', Users],
            ['HR intelligence portal', 'Activation rates, engagement trends, fatigue signals, and board-ready reporting.', BarChart3],
            ['Benefits and rewards', 'Coins earned for healthy action, redeemable across 1,000+ brands.', Target],
            ['Wellbeing calendar', 'A 12-month programme with themes, expert sessions, and no extra vendor layer.', CalendarDays],
          ].map(([title, body, Icon]) => (
            <button className="platformNode" key={title}>
              <Icon size={24} />
              <span>{title}</span>
              <small>{body}</small>
            </button>
          ))}
        </div>
        <div className="statRow">
          <Metric label="Users" value="100,000+" />
          <Metric label="Employee satisfaction" value="8.3/10" />
          <Metric label="Retention rate" value="90%" />
          <Metric label="Employers and partners" value="400+" />
        </div>
      </Section>

      <Section id="hr" eyebrow="What HR gains" title="Insights over assumptions." onEnter={setActive}>
        <div className="insightGrid">
          <article>
            <LineChart size={26} />
            <h3>See participation clearly</h3>
            <p>Track real-time engagement without manual surveys.</p>
          </article>
          <article>
            <Layers3 size={26} />
            <h3>Spot fatigue earlier</h3>
            <p>Aggregate mood data reveals workforce health trends before they become retention issues.</p>
          </article>
          <article>
            <BarChart3 size={26} />
            <h3>Show value confidently</h3>
            <p>Give clients evidence of their wellbeing investment and stronger renewal conversations.</p>
          </article>
        </div>
        <div className="quoteBand">
          <p>For AIMS Gulf, the offer becomes more than coverage. It becomes a client retention engine that connects wellbeing, claims prevention, and visible employer value.</p>
        </div>
      </Section>

      <Section id="commercial" eyebrow="Commercial value" title="Choose the model that matches AIMS Gulf’s portfolio strategy." onEnter={setActive}>
        <div className="calculator">
          <div className="optionRail">
            {clientOptions.map((option) => (
              <button
                key={option.id}
                className={selectedOption.id === option.id ? 'optionButton selected' : 'optionButton'}
                onClick={() => setSelectedOption(option)}
              >
                <span>{option.name}</span>
                <strong>{option.title}</strong>
                <small>{option.detail}</small>
                <b>${option.rate} {option.suffix}</b>
              </button>
            ))}
          </div>
          <div className="calcPanel">
            <label htmlFor="memberRange">Pilot or portfolio lives</label>
            <input
              id="memberRange"
              type="range"
              min="1000"
              max="300000"
              step="1000"
              value={members}
              onChange={(event) => setMembers(Number(event.target.value))}
            />
            <input
              className="numberInput"
              type="number"
              min="1000"
              max="300000"
              value={members}
              onChange={(event) => setMembers(Math.max(0, Number(event.target.value)))}
            />
            <div className="totals">
              <Metric label={`${selectedOption.name} annual value`} value={formatCurrency(selectedTotal)} />
              <Metric label="Option 5 tiered value" value={formatCurrency(tiered.total)} />
            </div>
            <div className="tierTable" aria-label="Option 5 tiered pricing">
              {tiered.rows.map((row) => (
                <div key={row.label + row.rate}>
                  <span>{row.label}</span>
                  <span>{row.count.toLocaleString()} lives</span>
                  <strong>${row.rate}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="portfolioTable">
          {portfolioOptions.map(([name, detail, price]) => (
            <div key={name}>
              <strong>{name}</strong>
              <span>{detail}</span>
              <b>{price}</b>
            </div>
          ))}
        </div>
      </Section>

      <Section id="rollout" eyebrow="Next steps" title="Start with a flagship account, prove the data, then roll across the book." onEnter={setActive}>
        <div className="timeline">
          {[
            ['01', 'Align on the model', 'Confirm which option fits AIMS Gulf’s portfolio strategy.'],
            ['02', 'Pilot one client', 'Begin with the largest account, 70,000 lives, as a flagship case study.'],
            ['03', 'Roll across renewals', 'Use pilot data to activate the wider portfolio at renewal moments.'],
          ].map(([step, title, body]) => (
            <article key={step}>
              <span>{step}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <div className="contactPanel">
          <span>Proposal owner</span>
          <h3>Sophia Petkova-Dubbiosi</h3>
          <p>B2B Lead · sophia@wellxai.com · +971 55 115 9183 · wellx.global</p>
        </div>
      </Section>

      <Section id="appendix" eyebrow="Source deck" title="Every page from the attached proposal, available inside the experience." onEnter={setActive}>
        <div className="deckViewer">
          <button className="iconButton" onClick={() => setPageIndex((value) => Math.max(0, value - 1))} aria-label="Previous page">
            <ChevronLeft size={22} />
          </button>
          <figure>
            <img src={proposalPages[pageIndex]} alt={`Original proposal page ${pageIndex + 1}`} />
            <figcaption>Page {pageIndex + 1} of {proposalPages.length}</figcaption>
          </figure>
          <button className="iconButton" onClick={() => setPageIndex((value) => Math.min(proposalPages.length - 1, value + 1))} aria-label="Next page">
            <ChevronRight size={22} />
          </button>
        </div>
        <div className="thumbs">
          {proposalPages.map((page, index) => (
            <button key={page} className={pageIndex === index ? 'selected' : ''} onClick={() => setPageIndex(index)}>
              {index + 1}
            </button>
          ))}
        </div>
      </Section>
    </main>
  );
}

function Section({ id, eyebrow, title, children, onEnter }) {
  return (
    <section
      id={id}
      className="storySection"
      onMouseEnter={() => onEnter(id)}
      onFocus={() => onEnter(id)}
    >
      <div className="sectionHeader">
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Metric({ label, value }) {
  return (
    <div className="metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
