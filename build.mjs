import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist/assets', { recursive: true });
await cp('public', 'dist', { recursive: true });
await cp('src/styles.css', 'dist/assets/app.css');

const html = await readFile('index.html', 'utf8');

const scenes = `
<main class="immersive">
  <aside class="storyNav" aria-label="Proposal journey">
    <a href="#opening">01 <span>Opening</span></a>
    <a href="#shift">02 <span>Broker shift</span></a>
    <a href="#fragmentation">03 <span>Fragmentation</span></a>
    <a href="#system">04 <span>Wellx layer</span></a>
    <a href="#proof">05 <span>Proof</span></a>
    <a href="#commercial">06 <span>Commercials</span></a>
    <a href="#path">07 <span>Path</span></a>
  </aside>

  <section class="scene opening" id="opening">
    <div class="sceneCopy">
      <p class="eyebrow">Wellx for AIMS Gulf Insurance Brokers</p>
      <h1>A single gateway to health, wellness and insurance value</h1>
      <div class="threeLines">
        <span>One platform for employee wellbeing</span>
        <span>One data layer for HR and insurers</span>
        <span>One commercial edge for brokers</span>
      </div>
      <div class="ctaRow">
        <a href="#shift">Enter proposal</a>
        <a href="#commercial">Commercial model</a>
      </div>
    </div>
    <figure class="productHero">
      <img src="/deck-assets/phone-stack.jpg" alt="Wellx app screenshots showing leaderboard, rewards, goals and relaxation content" />
    </figure>
  </section>

  <section class="scene boardroom" id="shift">
    <div class="sceneCopy narrow">
      <p class="eyebrow">The broker opportunity</p>
      <h2>Your clients are asking for more than insurance.</h2>
      <p>AIMS can move from placement partner to year-round value partner. Wellx gives each client a daily experience, and gives AIMS renewal evidence that price alone cannot create.</p>
    </div>
    <div class="shiftWall">
      <article><small>From</small><strong>Annual renewal conversations</strong><span>to year-round engagement</span></article>
      <article><small>From</small><strong>Price-led selling</strong><span>to value-led selling</span></article>
      <article><small>From</small><strong>Scattered vendors</strong><span>to one measurable platform</span></article>
    </div>
  </section>

  <section class="scene fragmentation" id="fragmentation">
    <div class="sceneCopy">
      <p class="eyebrow">The fragmented model</p>
      <h2>Clients are buying six tools when they need one operating layer.</h2>
    </div>
    <div class="fragmentGrid" aria-label="Fragmented tools">
      <span>Mental wellbeing</span>
      <span>Rewards programmes</span>
      <span>Engagement tools</span>
      <span>Reporting tools</span>
      <span>Wellness challenges</span>
      <span>HR spreadsheets</span>
    </div>
    <div class="wellxMerge">
      <strong>Fragmentation creates complexity.</strong>
      <span>Wellx creates one measurable experience.</span>
    </div>
  </section>

  <section class="scene system" id="system">
    <div class="sceneCopy narrow">
      <p class="eyebrow">The Wellx operating layer</p>
      <h2>One platform. One experience. One outcome.</h2>
      <p>Every screenshot here is taken from the proposal deck. The surrounding interface follows the same Wellx deck language, lavender canvas, gradient line, white rounded panels, blue accent bars, and magenta/blue signals.</p>
    </div>
    <div class="assetStack">
      <figure><img src="/deck-assets/platform-gamification.jpg" alt="Gamification and challenges screenshot from the Wellx proposal deck" /></figure>
      <figure><img src="/deck-assets/platform-rewards.jpg" alt="Benefits and rewards screenshot from the Wellx proposal deck" /></figure>
      <figure><img src="/deck-assets/platform-hr.jpg" alt="HR intelligence portal screenshot from the Wellx proposal deck" /></figure>
      <figure><img src="/deck-assets/platform-calendar.jpg" alt="Wellbeing content calendar screenshot from the Wellx proposal deck" /></figure>
    </div>
  </section>

  <section class="scene intelligence" id="intelligence">
    <div class="sceneCopy">
      <p class="eyebrow">What HR gains</p>
      <h2>Insights over assumptions.</h2>
      <div class="insightList">
        <article><span>01</span><strong>See workforce participation clearly.</strong><p>Track real-time engagement without manual surveys.</p></article>
        <article><span>02</span><strong>Spot team fatigue signals early.</strong><p>Aggregate mood data reveals team health trends.</p></article>
        <article><span>03</span><strong>Support retention with real data.</strong><p>Show the exact value of the wellbeing investment.</p></article>
      </div>
    </div>
    <figure class="laptopShot">
      <img src="/deck-assets/hr-dashboard-laptop.jpg" alt="Wellx HR dashboard laptop screenshot from the proposal deck" />
    </figure>
  </section>

  <section class="scene proof" id="proof">
    <div class="sceneCopy">
      <p class="eyebrow">Trust and momentum</p>
      <h2>Proof from leading employers across the Gulf and beyond.</h2>
      <div class="metrics">
        <b>100,000+<span>users</span></b>
        <b>8.3/10<span>satisfaction</span></b>
        <b>90%<span>retention</span></b>
        <b>400+<span>employers and partners</span></b>
      </div>
    </div>
    <figure class="logosShot">
      <img src="/deck-assets/trusted-logos.jpg" alt="Trusted employer and partner logos from the Wellx proposal deck" />
    </figure>
  </section>

  <section class="scene aims" id="aims">
    <div class="sceneCopy">
      <p class="eyebrow">Why this matters to AIMS</p>
      <h2>AIMS can turn wellbeing into a portfolio advantage.</h2>
    </div>
    <div class="aimsMatrix">
      <article><strong>Differentiate</strong><span>A solution corporate clients do not receive from a typical broker.</span></article>
      <article><strong>Defend renewals</strong><span>A stronger value story than price movement alone.</span></article>
      <article><strong>Stay close</strong><span>A daily platform that keeps AIMS present between renewals.</span></article>
      <article><strong>Scale</strong><span>A model that can roll across the portfolio after one flagship pilot.</span></article>
    </div>
  </section>

  <section class="scene commercial" id="commercial">
    <div class="sceneCopy">
      <p class="eyebrow">Commercial model</p>
      <h2>A CFO-readable decision room.</h2>
      <p>Start with the recommended 70,000-life flagship account, then use the pilot data to roll across the AIMS book.</p>
    </div>
    <div class="pricingRoom">
      <details open>
        <summary>Per-client SaaS</summary>
        <div class="pricingCards">
          <article><small>Option 1</small><strong>$15</strong><span>Standard SaaS, excluding cash rewards, per member per year</span></article>
          <article class="recommended"><small>Option 2</small><strong>$30</strong><span>Full Wellx experience, per member per year</span></article>
          <article><small>Option 3</small><strong>$50</strong><span>Reseller model, per member per year</span></article>
        </div>
      </details>
      <details>
        <summary>Portfolio model</summary>
        <div class="commercialList">
          <span>Option 4, Wellx Light, up to 1 million licenses, $100,000/year</span>
          <span>X Upgrade, $30/member/year</span>
          <span>Broker White-label App, $50,000 one-time</span>
          <span>Client Sub-Whitelabel, $3,000 one-time</span>
          <span>Ring-Fenced Cloud, $100,000/year</span>
        </div>
      </details>
      <details>
        <summary>Volume-based model</summary>
        <div class="tierRail">
          <span>First 10,000, $30</span>
          <span>Next 40,000, $25</span>
          <span>Next 50,000, $22</span>
          <span>Next 100,000, $18</span>
          <span>Next 100,000, $15</span>
        </div>
      </details>
    </div>
  </section>

  <section class="scene path" id="path">
    <div class="sceneCopy">
      <p class="eyebrow">Recommended path</p>
      <h2>Start with one flagship account. Build the renewal story. Scale the book.</h2>
    </div>
    <div class="timeline">
      <article><span>01</span><strong>Align on the model</strong><p>Confirm which option fits the AIMS portfolio strategy.</p></article>
      <article><span>02</span><strong>Pilot one client</strong><p>Start with the recommended 70,000-life flagship account.</p></article>
      <article><span>03</span><strong>Roll across the book</strong><p>Use pilot data to activate renewals with proof.</p></article>
    </div>
  </section>

  <section class="scene close">
    <div class="sceneCopy">
      <p class="eyebrow">Next conversation</p>
      <h2>Let’s turn AIMS’ portfolio into a living wellness ecosystem.</h2>
      <div class="contact">
        <strong>Sophia Petkova-Dubbiosi</strong>
        <span>B2B Lead</span>
        <a href="mailto:sophia@wellxai.com">sophia@wellxai.com</a>
        <a href="tel:+971551159183">+971 55 115 9183</a>
        <span>wellx.global</span>
      </div>
    </div>
  </section>
</main>`;

await writeFile(
  'dist/index.html',
  html
    .replace('</head>', '    <link rel="stylesheet" href="/assets/app.css" />\n  </head>')
    .replace('<body>', `<body>${scenes}`)
    .replace('    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>\n', ''),
);
