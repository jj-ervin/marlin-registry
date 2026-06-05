# Source 51

# === BEGIN SUMMARY BLOCK ===

## Links
- https://owasp.org/www-project-top-10-for-large-language-model-applications/
- https://www.ncsc.gov.uk/collection/guidelines-for-secure-ai-system-development
- https://www.wired.com/story/google-gemini-gmail-prompt-injection/

## Article Details

### OWASP LLM Top 10 — Prompt Injection
- **Source:** owasp.org
- **Title:** OWASP Top 10 for LLM Applications — Prompt Injection (#1 Risk)
- **Summary:**
  Prompt injection is rated the #1 security risk for LLM-based systems. Attackers embed
  hidden instructions in HTML comments, CSS zero-pixel text, metadata fields, image alt
  text, steganographic images, and email source code. LLMs parse these as legitimate
  commands. Attack vectors include direct injection (user input) and indirect injection
  (content fetched from external sources). Fine-tuning does not reliably prevent injection.
  Defenses must be deterministic, not model-based.
- **Conceptual Signals for eco:**
  - Prompt firewall as a pre-NEHI deterministic sanitization layer
  - All external content ingested via MCP tool responses is an injection surface
  - Defenses must be deterministic (not model-based) — validates eco's enforcement model
  - Indirect injection via external tool responses is the most relevant vector for eco

### UK NCSC — Guidelines for Secure AI System Development
- **Source:** ncsc.gov.uk
- **Title:** Guidelines for Secure AI System Development
- **Summary:**
  NCSC characterizes LLMs as "inherently confusable deputies" — systems that cannot
  reliably distinguish between instructions and data. Recommends: use LLMs only as
  suggestion engines; deterministic systems enforce rules; separate user-intent channels
  from content-context channels; require explicit human approval before any action
  derived from external content.
- **Conceptual Signals for eco:**
  - Confusable deputy as the foundational threat model for eco's LLM integration
  - User-intent channel (HELM operator) must be strictly separated from content-context
    channel (external ingestion) — must never merge
  - Validates eco's existing model: LASSO reasons, NEHI decides, runtime enforces
  - Validates locked human_escalation=True and ACES #8 No Silent Autonomy

### Wired — Google Gemini / Gmail Prompt Injection Attack
- **Source:** wired.com
- **Title:** Google Gemini Manipulated via Gmail Prompt Injection
- **Summary:**
  Attacker embeds hidden instructions in an email body. Gemini, summarizing the email,
  executes the injected instructions — exfiltrating data and generating phishing links.
  Demonstrates that even enterprise-grade summarization pipelines are vulnerable to
  indirect injection. AI-generated links cannot be trusted without provenance verification.
- **Conceptual Signals for eco:**
  - MCP tool responses from external servers are the eco-equivalent of this attack vector
  - Any eco pipeline that summarizes or processes external content (email, web, documents)
    must route through a prompt firewall before reaching LASSO's reasoning gate
  - Link provenance (origin, trust_level, extraction_method) must be tracked — extends
    existing LASSO bridge provenance (_build_provenance already present in bridge.py)
  - eco.ai ingestion pipelines must never pass raw external content directly to NEHI

## Overall Summary
This source captures prompt injection security research (OWASP, NCSC, Wired/Gemini attack)
evaluated against eco's current architecture. The research identifies a structural
vulnerability in any LLM-based system that ingests external content: LLMs cannot
reliably distinguish instructions from data ("confusable deputy" per NCSC).

Three concrete implications for eco were identified. First, the MCP connection (most
immediately relevant): source_47.md established that LASSO will route external tool
calls through MCP in Phase 5/6. MCP tool responses from external servers are a prompt
injection surface equivalent to the Gmail/Gemini attack. A deterministic prompt firewall
must sit between external MCP responses and LASSO's reasoning gate. This is a SEC.00
architectural requirement. Second, user-intent vs. content-context channel separation:
the HELM operator command channel and any external content ingestion channel must never
merge. This is implied by eco's existing architecture but must be an explicit SEC.00
constitutional constraint. Third, link provenance: LASSO bridge already has
_build_provenance() tracking internal provenance. Extending this to include origin,
trust_level, and extraction_method on any content-bearing field is a natural extension
that feeds into the Stage 4.11 metadata work.

What eco already has: LLMs as suggestion engines with deterministic enforcement
(LASSO/NEHI/RunPolicy architecture), locked human_escalation=True, ACES #8 No Silent
Autonomy, LASSO bridge provenance tracking, and adversarial constitutional injection
stress tests. The confusable deputy threat model validates these existing choices.
Cross-domain scam intelligence, steganographic detection, and safe-mode UI features
are premature given eco's current deployment domain (agriculture, drones, ROVs).

## Inclusion Primitives (Suggested)
- confusable deputy as the foundational LLM threat model in SEC.00
- prompt firewall as a pre-LASSO deterministic sanitization layer for external content
- MCP tool responses treated as untrusted external content requiring sanitization
- user-intent channel (HELM) strictly separated from content-context channel (external ingestion)
- channel separation as an explicit SEC.00 constitutional constraint
- link provenance extension: origin, trust_level, extraction_method on content-bearing fields
- indirect injection via external tool responses as eco's primary injection threat vector
- deterministic defenses only (model-based injection detection is unreliable)
- SEC.00 must declare: no raw external content reaches LASSO reasoning gate unsanitized

## Exclusion Primitives (Suggested)
- model-based prompt injection detection (unreliable per OWASP; deterministic only)
- cross-domain scam intelligence (smishing, celebrity impersonation) — not eco's threat domain
- steganographic image detection — no image ingestion pipeline yet
- safe mode summarization as a current UI feature — surface work, not current priority
- link hover-preview as a current UI requirement — surface work, not current priority
- treating ACES #8 and human_escalation as sufficient prompt injection mitigations alone
  (they are necessary but not sufficient — a prompt firewall is also required)

## Other Relevant Suggestions
- Expand SEC.00 description in DEV-PATH to explicitly require: (1) prompt firewall as a
  pre-LASSO sanitization layer, (2) confusable deputy threat model as the foundational
  security framing, (3) user-intent vs. content-context channel separation as a
  constitutional constraint.
- Cross-reference source_47.md (MCP integration): when writing the LASSO.04+ external
  tool routing spec, require that all MCP tool responses pass through the SEC.00 prompt
  firewall before reaching LASSO's reasoning gate. This is the most concrete near-term
  injection surface in eco's planned architecture.
- Extend LASSO bridge provenance (_build_provenance in bridge.py) to include origin,
  trust_level, and extraction_method fields. This connects to Stage 4.11 metadata work
  and closes the link provenance gap with minimal implementation cost.
- When writing SEC.00, reference NCSC confusable deputy framing to explain why
  eco's architecture (LLMs as suggestion engines, NEHI enforces, LASSO routes) is
  the correct security posture — not a limitation but a deliberate safety property.
- ACES #8 (No Silent Autonomy) and locked human_escalation=True address the confusable
  deputy risk at the governance level. SEC.00 addresses it at the content ingestion level.
  Both layers are required.
- Adversarial constitutional injection is already tested in LASSO stress tests
  (src/eco/core/lasso/lasso/stress.py) — expand these tests to cover indirect injection
  via simulated external tool responses when MCP integration is implemented.
- Revisit this source when writing SEC.00 and LASSO.04+ (external tool routing spec).

# === END SUMMARY BLOCK ===
