# Source 96
# === BEGIN SUMMARY BLOCK ===

## Links
- https://decrypt.co/resources/what-is-ai-prompt-injection-attack
- https://www.dataprovider.com/blog/tech/hidden-prompts-in-html/
- https://cybersecuritynews.com/gmail-phishing-with-prompt-injection/
- https://www.linkedin.com/pulse/gmail-phishing-attack-uses-ai-prompt-injection-evade-detection-2ujwc

## Article Details

### Prompt Injection as a Structural Vulnerability: Prompt Firewall, Confusable Deputy Defense, and eco's Ingestion Pipeline Architecture

**Sources:**
- Decrypt — *What Is an AI Prompt Injection Attack?*
- DataProvider — *Hidden Prompts in HTML: The Silent Threat*
- Cyber Security News — *Gmail Phishing with Prompt Injection*
- LinkedIn Pulse — *Gmail Phishing Attack Uses AI Prompt Injection to Evade Detection*

**Note:** Prompt injection and the confusable deputy threat model are also covered in
[source_51](source_51.md) (Prompt Injection and Confusable Deputy Threat Model). This entry
adds the Prompt Firewall architecture, hidden-instruction channel taxonomy, link provenance
requirements, dual-model validation, and multi-layer trust model not detailed in the earlier
entry.

**Summary:**
Prompt injection is now the #1 AI security risk. Hidden instructions are carried via HTML
comments, CSS zero-pixel text, metadata fields, image alt text, steganographic images, email
source code, and webpage structure — all invisible to humans but parsed as legitimate commands
by LLMs. The Gmail + Gemini attack demonstrates that even enterprise-grade AI summarization
can be weaponized by an email simply being read. UK NCSC frames LLMs as "inherently
confusable deputies" — they cannot reliably distinguish instructions from data. Core
architectural response for eco: treat all external content as hostile by default; never
allow raw external content to reach an instruction-following model without sanitization and
sandbox separation; use LLMs only as suggestion engines with deterministic systems enforcing
rules; require explicit human or policy-engine approval for any action derived from external
content.

**Attack vectors and hidden-instruction channels documented:**
- HTML comments — invisible to users, parsed by LLMs
- CSS zero-pixel or white-on-white text — visually invisible instructions
- Metadata fields — document and image metadata carrying instructions
- Image alt text — instruction embedding in accessibility attributes
- Steganographic images — data encoded in pixel values
- Email source code — instructions in email headers or invisible body sections
- Off-screen CSS — content rendered outside the viewport

**Key incidents referenced:**
- Gmail + Gemini attack — AI email summarization weaponized; phishing links disguised as legitimate Markdown output
- NCSC "confusable deputy" framing — LLMs cannot reliably separate instructions from data; deterministic enforcement required

**Conceptual Signals for eco:**

1. **All external content is hostile by default** — eco must never allow raw external content
   to reach an instruction-following model; data ingestion and instruction interpretation must
   be separated using strict boundaries; strip, sanitize, or sandbox all HTML, Markdown,
   metadata, and embedded text before any eco agent processes it; the trusted/untrusted domain
   boundary is the primary defense; eco's clear inclusion/exclusion primitives are the
   architectural mechanism for enforcing this boundary

2. **Prompt Firewall as a first-class eco layer** — a deterministic pre-processor that removes
   or neutralizes hidden instructions before content reaches any model; a policy engine that
   rejects or quarantines content containing suspicious patterns (zero-size fonts, white-on-white
   text, hidden tags, off-screen CSS, comment blocks); dual-model validation pass (one model
   summarizes content, another checks for anomalous instruction patterns); the Prompt Firewall
   is not a feature, it is a constitutional layer that every eco ingestion pipeline passes
   through; connects to eco's network-layer enforcement (source_74) as the content-layer analog

3. **Link provenance tagging as a required eco output primitive** — every link that any eco
   agent surfaces must carry provenance metadata: origin, trust level, extraction method; links
   extracted from external content are labeled unverified until provenance is established;
   eco provides mandatory hover-preview or verification before any link reaches a human; URL-
   rewriting protections applied to any AI-generated link; this prevents the Gmail-style attack
   where AI output containing a phishing link is trusted because it came from an AI

4. **Hidden-instruction channel taxonomy for eco's threat model** — eco's ingestion threat model
   must cover all eight documented channels: HTML comments, CSS zero-pixel text, metadata fields,
   image alt text, steganographic images, email source code, webpage structure, off-screen CSS;
   each channel requires a specific sanitization primitive; attackers will continue to discover
   new channels; eco's threat model is updated continuously via CVL (source_95) probing for
   novel injection vectors

5. **Multi-layer trust model separating intent channels from content channels** — user-intent
   channels (what the user explicitly asks for) are separate from content-context channels (what
   external content contains); content-derived instructions never enter the user-intent channel
   without explicit user confirmation; model-interpreted instructions are logged and audited for
   anomaly detection; this separation is the architectural expression of the confusable deputy
   defense — the LLM is never in a position where content it processes can directly issue
   instructions on its own authority

6. **LLMs as suggestion engines only, never direct executors** — the confusable deputy risk
   means LLMs cannot reliably distinguish instructions from data; eco must use LLMs only as
   suggestion engines; deterministic systems enforce rules; explicit human or policy-engine
   approval is required for any action affecting state, data, or external systems derived from
   external content; this principle applies regardless of how confident the LLM appears about
   the legitimacy of an instruction

7. **Safe-mode summarization as a user-protection primitive** — a "safe mode" summarization
   that strips all links and commands from external content before presenting it to users;
   visually differentiated trusted vs. untrusted outputs in eco's interface layer; AI-generated
   links labeled as unverified until provenance is confirmed; the clean interface cannot be
   weaponized because unverified content is visually distinguished from verified content

8. **Cross-domain threat taxonomy for unified detection** — prompt injection connects to
   broader scam patterns (USPS smishing, celebrity impersonation, email phishing); eco can
   build a unified threat taxonomy across email, SMS, web, and AI channels; eco's detectors
   trained on multi-vector scam patterns rather than AI-only injection patterns; behavioral
   heuristics from smishing mitigation (link-scrubbing, sender-verification) apply directly
   to eco's content ingestion layer

**eco architectural requirements from this source:**
- Prompt Firewall as a constitutional layer (deterministic pre-processor + policy engine + dual-model validation)
- Data ingestion / instruction interpretation boundary enforced at the runtime level
- Link provenance tagging on all agent-generated output containing links
- Hidden-instruction channel taxonomy as part of eco's formal threat model
- Multi-layer trust model separating user-intent from content-context channels
- LLMs as suggestion engines only; deterministic systems enforce execution
- Safe-mode summarization stripping all links and commands from untrusted content

**Relationship to prior sources:**
- Prompt injection and confusable deputy (source_51): this entry adds the Prompt Firewall
  architecture, link provenance, hidden-instruction channel taxonomy, and dual-model validation
- Governance as architecture (source_74): the Prompt Firewall is the content-ingestion
  instantiation of network-layer enforcement; defense in depth at the content boundary
- Sysdig autonomous AI attack chain (source_84): prompt injection via email summarization
  is the reconnaissance equivalent of the Sysdig exposed-notebook foothold; the Prompt
  Firewall blocks it the same way surface scanning blocks the exposed notebook
- Adversarial verification CVL (source_95): eco's CVL probes for novel injection vectors
  continuously; static injection detection is insufficient against adaptive attackers

# === END SUMMARY BLOCK ===
