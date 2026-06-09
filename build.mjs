import { build } from 'esbuild';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { navItems, proposal } from './src/proposalData.js';

await rm('dist', { recursive: true, force: true });
await mkdir('dist/assets', { recursive: true });
await cp('public', 'dist', { recursive: true });

await build({
  entryPoints: ['src/main.jsx'],
  bundle: true,
  format: 'iife',
  globalName: 'WellxProposal',
  splitting: false,
  minify: true,
  sourcemap: false,
  outdir: 'dist/assets',
  entryNames: 'app',
  assetNames: '[name]',
  loader: {
    '.css': 'css',
    '.woff2': 'file',
    '.woff': 'file',
    '.ttf': 'file',
  },
  jsx: 'automatic',
});

const html = await readFile('index.html', 'utf8');
const list = (items, cls = '') => items.map((item) => `<div class="${cls}"><span class="inlineIcon">✓</span>${item}</div>`).join('');
const staticMarkup = `
<main>
  <div class="progress" style="transform:scaleX(1)"></div>
  <header class="navBar">
    <a class="wordmark" href="#top"><span class="wellxMark">w</span><span>Wellx</span><small>for AIMS Gulf</small></a>
    <nav class="navLinks open staticNav">${navItems.map(([id, label]) => `<a href="#${id}">${label}</a>`).join('')}</nav>
  </header>
  <section class="hero" id="top">
    <div class="heroGlow"></div>
    <div class="heroContent">
      <div class="proposalTag"><span>Commercial proposal</span><span>${proposal.client}</span></div>
      <h1>${proposal.title}</h1>
      <div class="heroPillars">
        <div><span class="inlineIcon">✓</span>One platform for employee wellbeing</div>
        <div><span class="inlineIcon">✓</span>One data layer for HR and insurers</div>
        <div><span class="inlineIcon">✓</span>One commercial edge for brokers</div>
      </div>
      <div class="heroActions"><a class="primary" href="#opportunity">Explore the proposal</a><a class="secondary" href="#commercial">View commercial options</a></div>
    </div>
    <div class="heroDevice">${phone()}${dashboardMini()}</div>
  </section>
  <section class="section" id="opportunity">
    ${header('The broker opportunity', 'Your clients are asking for more than insurance.')}
    <div class="boardroom">${proposal.brokerShift.map(([from, to]) => `<article><span>${from}</span><span class="inlineIcon">›</span><strong>${to}</strong></article>`).join('')}</div>
    <p class="lead">AIMS can move from placement partner to year-round value partner. Wellx gives each client a daily experience, and gives AIMS renewal evidence that price alone cannot create.</p>
  </section>
  <section class="section" id="model">
    ${header('The fragmented model', 'Scattered tools weaken the renewal story.')}
    <div class="collapseStage"><div class="scatter">${proposal.fragmentedTools.map((tool, index) => `<div class="vendor vendor${index + 1}">${tool}</div>`).join('')}</div><div class="wellxLayer"><span>Wellx layer</span><strong>One connected experience</strong><p>Engagement, rewards, health intelligence and insurance reporting in one measurable operating layer.</p></div></div>
    <h3 class="closingLine">Fragmentation creates complexity. Wellx creates one measurable experience.</h3>
  </section>
  <section class="section" id="os">
    ${header('The Wellx operating system', 'Three connected layers, built for daily action and renewal intelligence.')}
    <div class="osDiagram">${proposal.layers.map((layer, index) => `<article class="osLayer"><span class="layerIndex">0${index + 1}</span><h3>${layer.name}</h3><p>${layer.detail}</p><b>${layer.signal}</b></article>`).join('')}</div>
  </section>
  <section class="section" id="stakeholders">
    ${header('Four stakeholders, one experience', 'The same system creates value for every participant.')}
    <div class="stakeholderShell"><div class="stakeholderTabs">${proposal.stakeholders.map((item) => `<a class="${item.featured ? 'featured' : ''}" href="#stakeholders">${item.name}</a>`).join('')}</div><div class="stakeholderPanel"><span class="inlineIcon">✦</span><h3>Broker</h3><p>Differentiate, retain accounts, open new revenue streams.</p><strong>Highlighted for AIMS Gulf</strong></div></div>
  </section>
  <section class="trust" id="momentum">
    <div class="metricsStrip">${proposal.proof.map((item) => `<div><strong>${item.value}</strong><span>${item.label}</span></div>`).join('')}</div>
    <section class="section">${header('Trust and momentum', 'Proof from leading employers across the Gulf and beyond.')}<div class="logoWall">${proposal.logos.map((logo) => `<div>${logo}</div>`).join('')}</div></section>
  </section>
  <section class="section" id="experience">
    ${header('Product experience', 'The product becomes the daily reason clients feel Wellx.')}
    <div class="productShowcase">${phone()}<div class="momentGrid">${proposal.productMoments.map((moment) => `<div class="momentCard"><span class="inlineIcon">✦</span><span>${moment}</span></div>`).join('')}</div></div>
  </section>
  <section class="section" id="hr">
    ${header('What HR gains', 'Executive visibility without the manual drag.')}
    <div class="hrGrid"><div class="dashboardLarge"><div class="dashHeader"><span>HR Intelligence</span><b>Live portfolio view</b></div><div class="chartBars">${[72, 48, 84, 61, 92, 56, 78].map((h) => `<i style="height:${h}%"></i>`).join('')}</div><div class="signalRow"><span>Participation up 18%</span><span>Fatigue risk down 9%</span><span>Reward value visible</span></div></div><div class="hrGains">${proposal.hrGains.map(([title, detail]) => `<article><span class="inlineIcon">✓</span><div><strong>${title}</strong><p>${detail}</p></div></article>`).join('')}</div></div>
  </section>
  <section class="section" id="aims">
    ${header('Why this matters to AIMS', 'AIMS can turn wellbeing into a portfolio advantage.')}
    <div class="aimsPanel"><div><h3>From policy placement to living client value.</h3><p>The flagship 70,000-life account can become the case study. The outcome becomes a repeatable renewal story across the AIMS book.</p></div><div class="aimsList">${list(proposal.aimsValue)}</div></div>
  </section>
  <section class="section" id="commercial">
    ${header('Commercial model', 'Clear options for broker growth and CFO review.')}
    <div class="pricingGrid">${proposal.pricing.client.map((row) => pricing(row)).join('')}${proposal.pricing.portfolio.map((row) => pricing(row, true)).join('')}${proposal.pricing.tiers.map((row) => `<article class="pricingCard compact"><span>${row[0]}</span><strong>${row[1]}</strong><p>per member per year</p></article>`).join('')}</div>
  </section>
  <section class="section" id="path">
    ${header('Recommended path', 'Start narrow, prove value, then scale with confidence.')}
    <div class="stepLine">${proposal.nextSteps.map(([title, detail], index) => `<article><span>${index + 1}</span><h3>${title}</h3><p>${detail}</p></article>`).join('')}</div>
  </section>
  <section class="finalCta"><div><h2>Let’s turn AIMS’ portfolio into a living wellness ecosystem.</h2><div class="contactCard"><strong>${proposal.contact.name}</strong><span>${proposal.contact.role}</span><a href="mailto:${proposal.contact.email}">${proposal.contact.email}</a><a href="tel:${proposal.contact.phone.replaceAll(' ', '')}">${proposal.contact.phone}</a><span>${proposal.contact.url}</span></div></div></section>
  <a class="toTop" href="#top">↑</a>
</main>`;

await writeFile(
  'dist/index.html',
  html
    .replace('</head>', '    <link rel="stylesheet" href="/assets/app.css" />\n  </head>')
    .replace('    <script type="module" src="/src/main.jsx"></script>\n', '')
    .replace('<body>', `<body>${staticMarkup}`),
);

function header(eyebrow, title) {
  return `<div class="sectionHeader"><span>${eyebrow}</span><h2>${title}</h2></div>`;
}

function pricing(row, portfolio = false) {
  return `<article class="pricingCard"><span>${row[0]}</span><h3>${row[1]}</h3><p>${row[2]}</p><strong>${row[3]} <small>${portfolio ? '' : row[4]}</small></strong></article>`;
}

function phone() {
  return `<div class="phoneMock"><div class="phoneTop"></div><div class="appHero"><span>Today</span><strong>Move, breathe, earn</strong></div><div class="rings"><i></i><i></i><i></i></div><div class="phoneCards"><div><span class="inlineIcon">T</span><span>Team challenge</span><b>2nd place</b></div><div><span class="inlineIcon">$</span><span>xCoins</span><b>8,450</b></div><div><span class="inlineIcon">M</span><span>Mood</span><b>Calm</b></div></div></div>`;
}

function dashboardMini() {
  return `<div class="dashboardMini"><span>Renewal intelligence</span><strong>70,000 lives</strong><div><i style="width:82%"></i><i style="width:64%"></i><i style="width:91%"></i></div><p>Engagement, fatigue and reward signals ready for the client review.</p></div>`;
}
