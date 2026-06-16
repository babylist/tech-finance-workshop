import { useState } from 'react';
import {
  ArrowRight, Check, X, RotateCcw, ShoppingBag, Link2, Heart, Megaphone,
  Clock, Lightbulb, Users, Target, Trophy,
  MessageCircle, Zap, ChevronLeft, ChevronRight
} from 'lucide-react';

// ============================================================
// BRAND
// ============================================================
const C = {
  eggplant: '#4A2143', eggLight: '#F7EDF5',
  orange: '#FF6D4E', orgLight: '#FFEEEB',
  yellow: '#FFD43A', ylwLight: '#FFFBEB',
  green: '#56BB6C', grnLight: '#EDF8EF',
  blue: '#A0DCFF', bluLight: '#E5F6FF',
  ink: '#1a0f17', cream: '#FAF6F0', paper: '#FFFFFF',
  muted: '#6B6669', rule: '#E8DFE3',
  commerce: '#4A2143',
  affiliate: '#0d6997',
  health: '#2d7a3f',
  sitemon: '#FF6D4E',
};

const STREAMS = [
  { key: 'commerce', name: 'Babylist Shop', short: 'Shop', Icon: ShoppingBag, color: C.commerce, bg: C.eggLight },
  { key: 'affiliate', name: 'Partner Commerce', short: 'Partner', Icon: Link2, color: C.affiliate, bg: C.bluLight },
  { key: 'health', name: 'Health', short: 'Health', Icon: Heart, color: C.health, bg: C.grnLight },
  { key: 'sitemon', name: 'Retail Media', short: 'Media', Icon: Megaphone, color: C.sitemon, bg: C.orgLight },
];

// ============================================================
// SCENARIOS
// ============================================================
const SCENARIOS = [
  // 1. REGISTRY
  {
    id: 'gg-wall',
    label: 'Registry',
    color: C.commerce,
    bg: C.eggLight,
    warmup: {
      q: 'Roughly what percent of registry revenue comes from gift givers?',
      options: ['40%', '60%', '82%', '95%'],
      correct: 2,
      why: '82% of registry revenue comes from gift givers — they\'re the dominant purchase channel by far. Separately, 66% of new registrants first heard about Babylist from friends and family (their future gift givers). Same population, double duty: revenue + acquisition.',
    },
    role: 'Registry team',
    title: 'The Gift Giver sign-in wall',
    setup: 'A designer pitches gating the Gift Giver registry view behind a sign-in to capture more emails. Marketing loves it — modeling shows email captures jump ~15%. But early testing shows Gift Giver-to-purchase conversion drops ~5%.',
    question: 'What does your group recommend?',
    options: [
      { id: 'a', text: 'Ship it. Email lists drive future revenue.', impact: { commerce: -2, affiliate: -1, health: -1, sitemon: 1 } },
      { id: 'b', text: 'Reject it. The friction will hurt purchases.', impact: { commerce: 0, affiliate: 0, health: 0, sitemon: 0 } },
      { id: 'c', text: 'Move the email ask to the post-purchase thank-you page.', impact: { commerce: 0, affiliate: 0, health: 0, sitemon: 1 } },
      { id: 'd', text: 'Soft-gate it — make the sign-in skippable.', impact: { commerce: -1, affiliate: -1, health: -1, sitemon: 1 } },
    ],
    recommended: 'c',
    superpower: {
      name: 'Multiple non-competing surfaces',
      how: 'We have many surfaces — thank-you pages, lifecycle emails, push, in-app modals. When a high-value surface is doing two jobs, move the second one. Don\'t tax the surface that\'s already winning.',
    },
    recommendedWhy: 'Gift givers drive today\'s revenue AND tomorrow\'s — 40% of activated registrants were prior GGs. Don\'t tax that surface. Move the ask to the thank-you page. User already bought. Same email lift, no conversion cost.',
    altIds: ['b'],
    altWhy: 'Rejecting is also defensible. If we can\'t cleanly relocate the ask, a 5% conversion hit isn\'t worth the email upside — not on the surface that drives most of the business.',
    lesson: 'Don\'t put friction on surfaces that already do two jobs. We have other places to ask.',
  },

  // 2. COMMERCE
  {
    id: 'cart-vs-recs',
    label: 'Shop',
    color: C.commerce,
    bg: C.eggLight,
    warmup: {
      q: 'A 0.34% cart error rate sounds tiny. On $516M of Shop GMV, what\'s that worth?',
      options: ['~$800K', '~$1.75M', '~$3.5M', '~$7M'],
      correct: 1,
      why: '~$1.75M (0.34% × $516M). Always do the bps × base math. Tiny percentages on big numbers are real money — and translating engineering work into dollars is how we defend reliability work.',
    },
    role: 'Engineering team',
    title: 'Cart fix vs. Recs lift',
    setup: 'You have one senior engineer for the quarter and two competing asks. Doing both in parallel risks burning them out and shipping neither well.',
    setupItems: [
      {
        project: 'Fix a known cart conversion error leaking Shop revenue every week (4 weeks of work)',
        impact: '0.34% cart error rate ≈ ~$1.75M in Shop GMV annually',
      },
      {
        project: 'Improve "Add Next" recommendations to lift items per registry by ~5% (8 weeks of work)',
        impact: '~5% items/registry lift ≈ modeled ~$10M in Shop GMV annually',
      },
    ],
    question: 'What does your group recommend?',
    options: [
      { id: 'a', text: 'Sequence: cart fix Q1, recs Q2.', impact: { commerce: 2, affiliate: 1, health: 0, sitemon: 0 } },
      { id: 'b', text: 'Recs only — bigger long-term lift.', impact: { commerce: 2, affiliate: 1, health: 0, sitemon: 0 } },
      { id: 'c', text: 'Cart fix only — it\'s a known leak.', impact: { commerce: 1, affiliate: 0, health: 0, sitemon: 0 } },
      { id: 'd', text: 'Push back — ask leadership for a second engineer.', impact: { commerce: 2, affiliate: 1, health: 0, sitemon: 0 } },
    ],
    recommended: 'a',
    superpower: {
      name: 'Sequencing & prioritization',
      how: 'When two valuable asks compete, we don\'t pick one and drop the other. Cart bug is end of funnel — bounded, immediate. Recs are top of funnel — slower, but compound across all four streams. Sequence them. Get both.',
    },
    recommendedWhy: 'Every week the cart leak is open is real money. Fix it first. Recs compound — slower to ship, but multiplies across all four streams. Sequence them: stop the bleeding, then build the multiplier.',
    altIds: ['d'],
    altWhy: 'Pushing back works too. A $1.75M leak plus multi-stream upside is a strong case for more headcount. Challenge the constraint, don\'t accept it.',
    lesson: 'End-of-funnel = quick bounded wins. Top-of-funnel = compounding lifts. Sequence them; don\'t abandon either.',
  },

  // 3. AFFILIATE
  {
    id: 'shop-vs-3p',
    label: 'Partner Commerce',
    color: C.affiliate,
    bg: C.bluLight,
    warmup: {
      q: 'Our top 23% of registries — "power registries" — make up what share of all purchases?',
      options: ['35%', '53%', '79%', '91%'],
      correct: 2,
      why: '79%. Power registries are massively over-indexed on purchase value — they\'re bigger, span more retailers, and almost always lead to a purchase (94%). They\'re also the users who most rely on the universal registry. Protect what makes them choose us.',
    },
    role: 'Partnerships + Babylist Shop',
    title: 'The exclusivity offer',
    setup: 'A major baby gear vendor approaches Partnerships with a deal: a deeper wholesale discount on their hero SKUs — Shop margin goes up significantly — in exchange for an exclusivity clause. Those SKUs would have to be removed from the universal registry. Gift givers could ONLY buy them from Babylist Shop. No "Or buy directly from" section for those products. Contract is two years. Modeling: ~$8M in additional Shop GMV at improved margin.',
    question: 'What does your group recommend?',
    options: [
      { id: 'a', text: 'Accept the deal. $8M and a margin upgrade is too big to pass up.', impact: { commerce: 2, affiliate: -1, health: 0, sitemon: 0 } },
      { id: 'b', text: 'Counter: take the margin upgrade, reject the exclusivity clause. Walk if they say no.', impact: { commerce: 1, affiliate: 0, health: 0, sitemon: 0 } },
      { id: 'c', text: 'Walk away. The universal registry isn\'t a thing we sell — it\'s our promise.', impact: { commerce: 0, affiliate: 0, health: 0, sitemon: 0 } },
      { id: 'd', text: 'Pilot the exclusivity on 1–2 SKUs before committing to the full contract.', impact: { commerce: 1, affiliate: -1, health: 0, sitemon: 0 } },
    ],
    recommended: 'c',
    superpower: {
      name: 'Some lines we don\'t cross',
      how: 'The universal registry — add any item, buy from any retailer — is why people pick Babylist and recommend us. Deals that ask us to give it up don\'t need an A/B test. The answer is no. Knowing what\'s non-negotiable is faster than running the numbers.',
    },
    recommendedWhy: 'The grid shows Option A winning on Shop. But the grid doesn\'t capture what we lose: the universal registry, eroded one SKU at a time. Slow, compounding, hard to recover. $8M doesn\'t replace what makes 66% of users hear about us from a friend. And the next vendor will come asking too. Walk away.',
    altIds: ['b'],
    altWhy: 'Countering is defensible — keep the margin upgrade, drop the exclusivity. If the vendor walks, we lose the deal but keep the moat. Most vendors will negotiate once they see we won\'t trade the universal registry.',
    lesson: 'Not every revenue opportunity is one to take. The universal registry is our moat — protect it.',
  },

  // 4. SITE MON
  {
    id: 'sponsored-slot',
    label: 'Retail Media',
    color: C.sitemon,
    bg: C.orgLight,
    warmup: {
      q: 'Retail Media has Babylist\'s highest contribution margin (~85%). Babylist Shop has ~19%. Which stream generates more in absolute contribution margin DOLLARS?',
      options: ['Retail Media', 'Shop', 'They\'re roughly equal', 'Depends on the year'],
      correct: 1,
      why: 'Shop. Even with a lower margin rate, Shop\'s revenue base is many times bigger — so its absolute CM dollars exceed Retail Media\'s. The lesson for product decisions: a small Shop drop isn\'t automatically offset by a Retail Media gain, even when the rates suggest it should be. Margin rate matters; absolute size matters too.',
    },
    role: 'Mobile engineering team',
    title: 'The sponsored slot in "Add Next"',
    setup: 'Retail Media wants to replace one slot in the "Add Next" recommendations row with a sponsored placement. The math, both annualized:',
    setupItems: [
      {
        project: 'Upside: new Retail Media revenue',
        impact: '~$2M annually at ~85% contribution margin',
      },
      {
        project: 'Downside: items added from Babylist surfaces drops ~1% (currently 36% of all items added)',
        impact: '~$2M in lost Shop GMV annually at ~19% margin',
      },
    ],
    question: 'What does your group recommend?',
    options: [
      { id: 'a', text: 'Ship it — $2M is real money at 85% margin.', impact: { commerce: -2, affiliate: 0, health: 0, sitemon: 2 } },
      { id: 'b', text: 'Place the sponsored content on a different surface entirely (email, post-add confirmation, paper goods) where it doesn\'t displace organic recs.', impact: { commerce: 0, affiliate: 0, health: 0, sitemon: 2 } },
      { id: 'c', text: 'Test on a small % of users with a hard guardrail on items per registry.', impact: { commerce: 0, affiliate: 0, health: 0, sitemon: 1 } },
      { id: 'd', text: 'Reject it — items per registry feeds our biggest revenue streams.', impact: { commerce: 0, affiliate: 0, health: 0, sitemon: 0 } },
    ],
    recommended: 'b',
    superpower: {
      name: 'Pick the surface, not just the slot',
      how: 'We don\'t have one ad surface — we have dozens. Emails, paper goods, post-add confirmation, in-feed, Add Next, and more. Each has different economics and different cost to other streams. The right move isn\'t always to add inventory to the busiest surface. Pick the one where the math works AND doesn\'t tax the funnel.',
    },
    recommendedWhy: 'Looks like a $2M-for-$2M wash. It isn\'t. Retail Media at 85% margin = ~$1.7M CM; Shop loss at 19% = ~$380K. Straight "ship" wins on near-term profit — but the Shop loss compounds (fewer power registrants, weaker word-of-mouth), none of which is modeled. Adding a slot inside Add Next doesn\'t help: impression pricing needs premium positions. Place the ad on a different surface. Same ~$1.7M CM, zero funnel tax.',
    altIds: ['c'],
    altWhy: 'Small-percentage testing also works — with a hard guardrail and a willingness to kill the test if items per registry drops.',
    lesson: 'When one stream wants to grow, find the surface where it doesn\'t tax the others.',
  },
  {
    id: 'par-validation',
    label: 'Bonus: pAR',
    color: C.eggplant,
    bg: C.eggLight,
    role: 'New User Experience Team',
    title: 'When pAR jumps too much',
    setup: 'Your team has been A/B testing a new signup flow that personalizes onboarding for first-time parents vs. experienced parents. The test arm looks great — pAR (Babylist\'s prediction of how likely a registry is to drive real purchases) is way up. The PM is ready to ship to 100%. Data science raises a flag: changes this big can fool the model. They want to confirm real purchases are actually following the prediction before we ship.',
    question: 'What does your group recommend?',
    options: [
      { id: 'a', text: 'Ship to 100% — a 200 bps pAR lift is huge, don\'t leave it on the table.', impact: { commerce: 1, affiliate: 0, health: 0, sitemon: 0 } },
      { id: 'b', text: 'Pause shipping. Work with data science to validate that pAR is tracking real activation before rolling out.', impact: { commerce: 2, affiliate: 1, health: 0, sitemon: 1 } },
      { id: 'c', text: 'Ship and monitor both pAR AND actual activation rates closely; pull back if they diverge.', impact: { commerce: 1, affiliate: 1, health: 0, sitemon: 1 } },
      { id: 'd', text: 'Reject the test — pAR shifts at this scale aren\'t worth the risk.', impact: { commerce: 0, affiliate: 0, health: 0, sitemon: 0 } },
    ],
    recommended: 'b',
    superpower: {
      name: 'Data science partnership',
      how: 'pAR is a model that forecasts revenue before purchases happen. For small shifts, it tracks reality. For big shifts that touch many model features, the prediction can drift from actual activation. The deck spells it out: if your experiment may impact pAR features, reach out to DS. They can validate or mitigate. Use the team.',
    },
    recommendedWhy: 'A 200 bps pAR lift would be huge — if it\'s real. But pAR predicts. It doesn\'t measure. Big shifts can drift from actual activation. Validating with DS costs a few days. Shipping a false positive costs months of bad dashboards and lost trust in the metric.',
    altIds: ['c'],
    altWhy: 'Ship-and-monitor works if you have rapid rollback and daily eyes on both metrics. The risk: divergence can take weeks to detect. By then the rollout is done and trust in the metric is gone. Only choose this if validation isn\'t possible.',
    lesson: 'pAR is a prediction, not a truth. For big shifts, validate with data science before celebrating.',
  },
];

// ============================================================
// IMPACT GRID
// ============================================================
const IMPACT_LABELS = {
  '-2': { sym: '↓↓', label: 'Big hit', color: '#c53030', bg: '#fed7d7' },
  '-1': { sym: '↓', label: 'Hurts', color: '#dd6b20', bg: '#feebc8' },
  '0': { sym: '—', label: 'Neutral', color: '#6B6669', bg: '#F0EDEE' },
  '1': { sym: '↑', label: 'Helps', color: '#2d7a3f', bg: '#DEF2E3' },
  '2': { sym: '↑↑', label: 'Big win', color: '#22543d', bg: '#C6F6D5' },
};
function impactCell(value) { return IMPACT_LABELS[String(value)] || IMPACT_LABELS['0']; }

// ============================================================
// MAIN
// ============================================================
export default function Workshop() {
  const screens: any[] = [{ type: 'intro' }];
  SCENARIOS.forEach((scenario, sIdx) => {
    if (scenario.warmup) screens.push({ type: 'warmup', sIdx });
    screens.push({ type: 'scenario', sIdx });
  });
  screens.push({ type: 'outro' });

  const [step, setStep] = useState(0);
  const [warmupAnswers, setWarmupAnswers] = useState({});
  const [scenarioAnswers, setScenarioAnswers] = useState({});
  const [revealed, setRevealed] = useState({});

  const current = screens[step];
  const progress = (step / (screens.length - 1)) * 100;
  const advance = () => setStep((s) => Math.min(s + 1, screens.length - 1));
  const reset = () => { setStep(0); setWarmupAnswers({}); setScenarioAnswers({}); setRevealed({}); };

  return (
    <div className="min-h-screen w-full" style={{
      background: `radial-gradient(at top left, ${C.eggLight} 0%, transparent 50%), radial-gradient(at bottom right, ${C.orgLight} 0%, transparent 60%), ${C.cream}`,
      fontFamily: '"Mulish", system-ui, -apple-system, sans-serif',
      color: C.ink,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700;1,800;1,900&display=swap');
        * { -webkit-font-smoothing: antialiased; }
        .font-display { font-weight: 900; letter-spacing: -0.025em; }
        .reveal-in { animation: revealIn 380ms cubic-bezier(0.2,0.8,0.2,1) both; }
        @keyframes revealIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .bar-fill { transition: width 600ms cubic-bezier(0.2,0.8,0.2,1); }
        .opt-btn { transition: all 180ms ease; }
        .opt-btn:hover:not(:disabled) { transform: translateX(2px); }
        @keyframes pulse-discuss {
          0%, 100% { box-shadow: 0 0 0 0 ${C.orange}30; }
          50% { box-shadow: 0 0 0 6px ${C.orange}00; }
        }
        .pulse-discuss { animation: pulse-discuss 2.4s ease-in-out infinite; }
      `}</style>

      <header className="sticky top-0 z-10 backdrop-blur-md" style={{ background: 'rgba(250,246,240,0.88)', borderBottom: `1px solid ${C.rule}` }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: C.eggplant }}>
              <span className="text-white text-sm font-black">B</span>
            </div>
            <div className="leading-tight">
              <div className="text-[10px] uppercase tracking-[0.18em] font-semibold" style={{ color: C.muted }}>Finance Workshop</div>
              <div className="text-sm font-bold" style={{ color: C.eggplant }}>Decisions Across the Lines of Business</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              aria-label="Previous"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ background: C.paper, border: `1px solid ${C.rule}`, color: C.eggplant }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-[10px] uppercase tracking-wider font-bold tabular-nums px-2 min-w-[44px] text-center" style={{ color: C.muted }}>
              {step + 1} / {screens.length}
            </div>
            <button
              onClick={() => setStep((s) => Math.min(screens.length - 1, s + 1))}
              disabled={step === screens.length - 1}
              aria-label="Next"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ background: C.paper, border: `1px solid ${C.rule}`, color: C.eggplant }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="h-1 w-full" style={{ background: C.rule }}>
          <div className="h-full bar-fill" style={{ width: `${progress}%`, background: C.eggplant }} />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-8 sm:py-12 pb-20">
        {current.type === 'intro' && <Intro onStart={advance} />}

        {current.type === 'warmup' && (
          <WarmupScreen
            key={`w-${current.sIdx}`}
            scenario={SCENARIOS[current.sIdx]}
            sIdx={current.sIdx}
            answer={warmupAnswers[current.sIdx]}
            onAnswer={(idx) => setWarmupAnswers((a) => ({ ...a, [current.sIdx]: idx }))}
            onNext={advance}
          />
        )}

        {current.type === 'scenario' && (
          <ScenarioScreen
            key={`s-${current.sIdx}`}
            scenario={SCENARIOS[current.sIdx]}
            sIdx={current.sIdx}
            answer={scenarioAnswers[current.sIdx]}
            revealed={!!revealed[current.sIdx]}
            onAnswer={(optId) => {
              setScenarioAnswers((a) => ({ ...a, [current.sIdx]: optId }));
              setRevealed((r) => ({ ...r, [current.sIdx]: true }));
            }}
            onNext={advance}
            isLast={current.sIdx === SCENARIOS.length - 1}
          />
        )}

        {current.type === 'outro' && <Outro scenarios={SCENARIOS} answers={scenarioAnswers} onReset={reset} />}
      </main>

      <footer className="max-w-4xl mx-auto px-5 sm:px-8 pb-10" />
    </div>
  );
}

// ============================================================
// INTRO
// ============================================================
function Intro({ onStart }) {
  return (
    <div className="reveal-in">
      <div className="text-[11px] uppercase tracking-[0.22em] font-bold mb-5" style={{ color: C.orange }}>
        ◆ A finance workshop
      </div>
      <h1 className="font-display text-5xl sm:text-7xl leading-[0.95] tracking-tight mb-6" style={{ color: C.eggplant }}>
        You're in the room
        <br />
        <em style={{ fontStyle: 'italic', color: C.orange }}>where it happens.</em>
      </h1>
      <p className="text-lg sm:text-xl leading-relaxed mb-6 max-w-2xl">
        Four real situations plus a bonus — the kind of calls that come up in brainstorms, in design review, in roadmap planning. Discuss each one as a group, propose a way forward, then see the gold-standard answer with reasoning and data to support it.
      </p>

      <div className="rounded-xl p-4 mb-8 flex items-start gap-3" style={{ background: C.ylwLight, border: `1.5px solid ${C.yellow}` }}>
        <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8a6d00' }} />
        <div className="text-sm leading-relaxed">
          <strong>A note before we start:</strong> Each scenario has multiple defensible options. The point isn't picking the "right" answer — it's pushing your group toward the <em>best</em> one and seeing how the call ripples across all four lines of business.
        </div>
      </div>

      <div className="rounded-2xl p-5 sm:p-6 mb-8" style={{ background: C.paper, border: `1px solid ${C.rule}` }}>
        <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: C.muted }}>How each round runs</div>
        <div className="space-y-3">
          {[
            { Icon: Lightbulb, t: 'Quick warmup', s: 'A single fact to prime the right number before you discuss.' },
            { Icon: MessageCircle, t: 'Group discussion', s: 'Read the scenario, debate the tradeoffs, land on a recommendation.' },
            { Icon: Trophy, t: 'Gold standard reveal', s: 'See the recommended call and the Babylist superpower that makes it possible — A/B testing, multiple surfaces, flagged rollouts, and more.' },
          ].map(({ Icon, t, s }, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: C.eggLight }}>
                <Icon className="w-4 h-4" style={{ color: C.eggplant }} />
              </div>
              <div>
                <div className="font-bold text-sm">{t}</div>
                <div className="text-sm" style={{ color: C.muted }}>{s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onStart}
        className="group inline-flex items-center gap-3 px-7 py-4 rounded-full font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.99]"
        style={{ background: C.eggplant, color: C.paper }}
      >
        Let's begin
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}

// ============================================================
// WARMUP
// ============================================================
function WarmupScreen({ scenario, sIdx, answer, onAnswer, onNext }) {
  const w = scenario.warmup;
  const answered = answer !== undefined;
  const isCorrect = answer === w.correct;

  return (
    <div className="reveal-in">
      <div className="flex items-center justify-between mb-5">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold px-2 py-1 rounded-md" style={{ background: scenario.bg, color: scenario.color }}>
          {scenario.label}
        </span>
        <div className="text-[10px] uppercase tracking-wider font-bold" style={{ color: C.muted }}>
          Scenario {sIdx + 1} of {SCENARIOS.length}
        </div>
      </div>

      <div className="text-xs uppercase tracking-wider font-semibold mb-3 flex items-center gap-2" style={{ color: C.muted }}>
        <Lightbulb className="w-3.5 h-3.5" style={{ color: '#c9a300' }} />
        Quick warmup
      </div>
      <h2 className="font-display text-2xl sm:text-3xl leading-[1.2] tracking-tight mb-6" style={{ color: C.eggplant }}>
        {w.q}
      </h2>

      <div className="space-y-2.5 mb-6">
        {w.options.map((opt, idx) => {
          const selected = answer === idx;
          const isCorr = answered && idx === w.correct;
          const isWrongChoice = answered && selected && !isCorrect;
          let border = C.rule, bg = C.paper;
          if (isCorr) { border = C.green; bg = C.grnLight; }
          else if (isWrongChoice) { border = '#c53030'; bg = '#fed7d7'; }
          else if (selected) { border = C.eggplant; bg = C.eggLight; }
          return (
            <button
              key={idx}
              onClick={() => !answered && onAnswer(idx)}
              disabled={answered}
              className="opt-btn w-full text-left p-3.5 rounded-xl flex items-center gap-3"
              style={{ background: bg, border: `1.5px solid ${border}`, cursor: answered ? 'default' : 'pointer' }}
            >
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black"
                style={{
                  background: isCorr ? C.green : isWrongChoice ? '#c53030' : 'transparent',
                  color: isCorr ? C.paper : isWrongChoice ? C.paper : C.muted,
                  border: !(isCorr || isWrongChoice) ? `1.5px solid ${selected ? C.eggplant : C.rule}` : 'none',
                }}>
                {isCorr ? <Check className="w-3.5 h-3.5" /> : isWrongChoice ? <X className="w-3.5 h-3.5" /> : String.fromCharCode(65 + idx)}
              </div>
              <div className="text-sm sm:text-base font-semibold" style={{ color: C.ink }}>{opt}</div>
            </button>
          );
        })}
      </div>

      {answered && (
        <div
          className="reveal-in rounded-xl p-4 mb-6 flex items-start gap-3"
          style={{ background: isCorrect ? C.grnLight : C.ylwLight, border: `1.5px solid ${isCorrect ? C.green : C.yellow}` }}
        >
          <div className="text-lg flex-shrink-0">{isCorrect ? '✓' : '💡'}</div>
          <div className="text-sm leading-relaxed" style={{ color: C.ink }}>
            {isCorrect && <strong>Right. </strong>}{w.why}
          </div>
        </div>
      )}

      {answered && (
        <button
          onClick={onNext}
          className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.99]"
          style={{ background: C.eggplant, color: C.paper }}
        >
          On to the scenario
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      )}
    </div>
  );
}

// ============================================================
// SCENARIO + REVEAL
// ============================================================
function ScenarioScreen({ scenario, sIdx, answer, revealed, onAnswer, onNext, isLast }) {
  return (
    <div className="reveal-in">
      <div className="flex items-center justify-between mb-5">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold px-2 py-1 rounded-md" style={{ background: scenario.bg, color: scenario.color }}>
          {scenario.label}
        </span>
        <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: C.muted }}>
          Scenario {sIdx + 1} of {SCENARIOS.length}
        </span>
      </div>

      {/* Role badge */}
      <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full" style={{ background: scenario.bg, border: `1px solid ${scenario.color}30` }}>
        <Users className="w-3.5 h-3.5" style={{ color: scenario.color }} />
        <span className="text-xs font-bold" style={{ color: scenario.color }}>Your group is the: {scenario.role}</span>
      </div>

      <h2 className="font-display text-3xl sm:text-4xl leading-[1.1] tracking-tight mb-4" style={{ color: C.eggplant }}>
        {scenario.title}
      </h2>

      <div className="rounded-xl p-4 sm:p-5 mb-6" style={{ background: C.paper, border: `1px solid ${C.rule}` }}>
        <p className="text-base leading-relaxed" style={{ color: C.ink }}>
          {scenario.setup}
        </p>
        {scenario.setupItems && (
          <ul className="mt-3.5 space-y-3" style={{ paddingLeft: 0, listStyle: 'none' }}>
            {scenario.setupItems.map((item, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="font-black flex-shrink-0" style={{ color: C.eggplant, lineHeight: '1.6' }}>•</span>
                <div className="flex-1">
                  <div className="text-base leading-relaxed font-medium" style={{ color: C.ink }}>{item.project}</div>
                  <ul className="mt-1" style={{ paddingLeft: 0, listStyle: 'none' }}>
                    <li className="flex gap-2 mt-1">
                      <span className="flex-shrink-0" style={{ color: C.muted, lineHeight: '1.6' }}>◦</span>
                      <span className="text-sm leading-relaxed" style={{ color: C.muted }}>{item.impact}</span>
                    </li>
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Discussion CTA */}
      {!revealed && (
        <div
          className="rounded-xl p-4 mb-5 flex items-start gap-3 pulse-discuss"
          style={{ background: C.orgLight, border: `1.5px solid ${C.orange}` }}
        >
          <MessageCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: C.orange }} />
          <div className="flex-1">
            <div className="text-[11px] uppercase tracking-wider font-bold mb-1" style={{ color: C.orange }}>
              Discuss with your group
            </div>
            <div className="text-sm leading-relaxed" style={{ color: C.ink }}>
              Talk through the tradeoffs. Multiple options can work — push toward the best one. When your group lands on an answer, click it below.
            </div>
          </div>
        </div>
      )}

      <p className="text-base font-bold mb-4" style={{ color: C.eggplant }}>
        {scenario.question}
      </p>

      <div className="space-y-2.5 mb-6">
        {scenario.options.map((opt) => {
          const selected = answer === opt.id;
          const isRecommended = revealed && opt.id === scenario.recommended;
          const isAlternative = revealed && scenario.altIds?.includes(opt.id);
          const isWrongPick = revealed && selected && !isRecommended && !isAlternative;

          let border = C.rule, bg = C.paper;
          if (isRecommended) { border = C.green; bg = C.grnLight; }
          else if (isAlternative) { border = C.yellow; bg = C.ylwLight; }
          else if (isWrongPick) { border = '#c53030'; bg = '#fed7d7'; }
          else if (selected && !revealed) { border = C.eggplant; bg = C.eggLight; }

          return (
            <button
              key={opt.id}
              onClick={() => !revealed && onAnswer(opt.id)}
              disabled={revealed}
              className="opt-btn w-full text-left p-3.5 rounded-xl flex items-start gap-3"
              style={{ background: bg, border: `1.5px solid ${border}`, cursor: revealed ? 'default' : 'pointer' }}
            >
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-black"
                style={{
                  background: isRecommended ? C.green : isAlternative ? C.yellow : isWrongPick ? '#c53030' : 'transparent',
                  color: isRecommended ? C.paper : isAlternative ? C.ink : isWrongPick ? C.paper : C.muted,
                  border: !(isRecommended || isAlternative || isWrongPick) ? `1.5px solid ${selected ? C.eggplant : C.rule}` : 'none',
                }}>
                {isRecommended ? <Check className="w-3.5 h-3.5" /> : isWrongPick ? <X className="w-3.5 h-3.5" /> : opt.id.toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="text-sm sm:text-base font-semibold" style={{ color: C.ink }}>{opt.text}</div>
                {revealed && isRecommended && (
                  <>
                    <div className="text-[10px] uppercase tracking-wider font-bold mt-1.5" style={{ color: '#22543d' }}>
                      Gold standard
                    </div>
                    <p className="text-sm leading-relaxed mt-2" style={{ color: C.ink }}>
                      {scenario.recommendedWhy}
                    </p>
                  </>
                )}
                {revealed && isAlternative && (
                  <>
                    <div className="text-[10px] uppercase tracking-wider font-bold mt-1.5" style={{ color: '#8a6d00' }}>
                      Defensible alternative
                    </div>
                    <p className="text-sm leading-relaxed mt-2" style={{ color: C.ink }}>
                      {scenario.altWhy}
                    </p>
                  </>
                )}
                {revealed && isWrongPick && (
                  <div className="text-[10px] uppercase tracking-wider font-bold mt-1" style={{ color: '#c53030' }}>
                    Your group's pick — not recommended
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {revealed && (
        <>
          {/* Babylist Superpower — front and center */}
          <div
            className="reveal-in rounded-2xl p-5 sm:p-6 mb-5"
            style={{ background: C.eggplant, color: C.paper }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4" style={{ color: C.yellow }} />
              <div className="text-[10px] uppercase tracking-wider font-bold" style={{ color: C.yellow }}>
                The Babylist superpower
              </div>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl leading-tight mb-3" style={{ color: C.paper }}>
              {scenario.superpower.name}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#F0DAE9' }}>
              {scenario.superpower.how}
            </p>
          </div>

          {/* Cross-stream impact grid */}
          <div className="reveal-in mb-5">
            <div className="text-xs uppercase tracking-wider font-bold mb-3 flex items-center gap-2" style={{ color: C.muted }}>
              <Target className="w-3.5 h-3.5" style={{ color: C.eggplant }} />
              Cross-stream impact
            </div>
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.rule}`, background: C.paper }}>
              {/* Header */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '56px repeat(4, minmax(0, 1fr))',
                  background: C.cream,
                  borderBottom: `1px solid ${C.rule}`,
                }}
              >
                <div className="px-3 py-3 text-[10px] uppercase tracking-wider font-bold" style={{ color: C.muted }}>
                  Option
                </div>
                {STREAMS.map((s) => (
                  <div
                    key={s.key}
                    className="px-1 sm:px-2 py-3 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-center"
                    style={{ color: s.color }}
                  >
                    {s.short}
                  </div>
                ))}
              </div>
              {/* Body rows */}
              {scenario.options.map((opt, idx) => {
                const isRec = opt.id === scenario.recommended;
                const isAlt = scenario.altIds?.includes(opt.id);
                const isWrongPickRow = answer === opt.id && !isRec && !isAlt;
                return (
                  <div
                    key={opt.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '56px repeat(4, minmax(0, 1fr))',
                      alignItems: 'center',
                      borderBottom: idx === scenario.options.length - 1 ? 'none' : `1px solid ${C.rule}`,
                      background: isRec ? C.grnLight : isAlt ? C.ylwLight : isWrongPickRow ? '#fed7d7' : C.paper,
                    }}
                  >
                    <div className="px-3 py-3.5 text-xl font-black" style={{ color: C.eggplant }}>
                      {opt.id.toUpperCase()}
                    </div>
                    {STREAMS.map((s) => {
                      const cell = impactCell(opt.impact[s.key]);
                      return (
                        <div key={s.key} className="px-1 sm:px-2 py-2.5 flex items-center justify-center">
                          <div
                            className="rounded-lg flex items-center justify-center font-black text-sm sm:text-base"
                            style={{ background: cell.bg, color: cell.color, width: 44, height: 44 }}
                            title={cell.label}
                          >
                            {cell.sym}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-3 mt-2.5 text-[10px]" style={{ color: C.muted }}>
              <span><strong style={{ color: '#22543d' }}>↑↑</strong> big win</span>
              <span><strong style={{ color: '#2d7a3f' }}>↑</strong> helps</span>
              <span><strong>—</strong> neutral</span>
              <span><strong style={{ color: '#dd6b20' }}>↓</strong> hurts</span>
              <span><strong style={{ color: '#c53030' }}>↓↓</strong> big hit</span>
            </div>
          </div>

          {/* Lesson */}
          <div className="reveal-in rounded-xl p-4 mb-6 flex items-start gap-3" style={{ background: C.cream, border: `1px solid ${C.rule}` }}>
            <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#c9a300' }} />
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold mb-1" style={{ color: C.muted }}>
                Carry this with you
              </div>
              <p className="text-sm sm:text-base leading-relaxed font-semibold" style={{ color: C.eggplant }}>
                {scenario.lesson}
              </p>
            </div>
          </div>

          <button
            onClick={onNext}
            className="group inline-flex items-center gap-3 px-7 py-4 rounded-full font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.99]"
            style={{ background: C.eggplant, color: C.paper }}
          >
            {isLast ? 'See the recap' : 'Next scenario'}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </>
      )}
    </div>
  );
}

// ============================================================
// OUTRO
// ============================================================
function Outro({ scenarios, answers, onReset }) {
  const recCount = scenarios.reduce((acc, s, i) => answers[i] === s.recommended ? acc + 1 : acc, 0);
  const altCount = scenarios.reduce((acc, s, i) => s.altIds?.includes(answers[i]) ? acc + 1 : acc, 0);

  return (
    <div className="reveal-in">
      <div className="text-[11px] uppercase tracking-[0.22em] font-bold mb-3" style={{ color: C.orange }}>
        ◆ Recap
      </div>
      <h2 className="font-display text-4xl sm:text-6xl leading-[1.0] tracking-tight mb-4" style={{ color: C.eggplant }}>
        Your group hit
        <br />
        the gold standard <em style={{ color: C.orange, fontStyle: 'italic' }}>{recCount}</em> of {scenarios.length} times.
      </h2>
      <p className="text-base sm:text-lg mb-8 max-w-2xl">
        {altCount > 0 && `(${altCount} more ${altCount === 1 ? 'was' : 'were'} a defensible alternative — those count too.) `}
        The patterns repeat across every scenario: protect the flywheel, don't pit streams against each other, expand the surface instead of stealing from it.
      </p>

      <div className="rounded-2xl p-5 sm:p-6 mb-8" style={{ background: C.paper, border: `1.5px solid ${C.eggplant}` }}>
        <div className="text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: C.muted }}>
          <Zap className="w-3.5 h-3.5" style={{ color: C.eggplant }} />
          The Babylist superpowers you used today
        </div>
        <div className="space-y-3">
          {scenarios.map((s, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="font-display text-lg font-bold flex-shrink-0 w-6 mt-0.5" style={{ color: C.orange }}>0{i + 1}</span>
              <div>
                <div className="font-bold text-sm leading-tight" style={{ color: C.eggplant }}>{s.superpower.name}</div>
                <div className="text-xs leading-relaxed mt-0.5" style={{ color: C.muted }}>From: {s.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-[1.02]"
        style={{ background: C.paper, color: C.eggplant, border: `1.5px solid ${C.eggplant}` }}
      >
        <RotateCcw className="w-4 h-4" />
        Run it again
      </button>
    </div>
  );
}
