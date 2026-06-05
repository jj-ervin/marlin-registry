# Source 15
# === BEGIN SUMMARY BLOCK ===

## Links
- https://www.cnbc.com/2026/03/18/metas-manus-launches-desktop-app-to-bring-its-ai-agent-onto-personal-devices.html
- https://www.pcmag.com/news/metas-manus-launches-desktop-app-with-ai-agent-for-tasks-across-files-apps
- https://thenextweb.com/news/meta-manus-ai-agent-arrives-on-your-desktop
- https://www.digitaltrends.com/computing/meta-manus-ai-agent-my-computer-desktop-app/
- https://www.financialexpress.com/business/technology/meta-backed-manus-brings-my-computer-to-let-ai-manage-your-research-for-you-3456789/
- https://www.manus.ai/blog/introducing-my-computer

## Article Details

### 1. CNBC — Meta’s Manus launches desktop app
- **Source:** CNBC  
- **Summary:** Manus introduces a desktop app enabling its AI agent to operate directly on personal computers, integrating with local files, applications, and workflows. The app emphasizes local execution, privacy, and multi-surface task handling.  
- **Conceptual Signals for eco:**  
  - Local-first execution  
  - Desktop integration  
  - Multi-surface orchestration  
  - Consumer-facing agent UX  
  - Permission prompts for local actions  

### 2. PCMag — Manus Launches Desktop App With AI Agent
- **Source:** PCMag  
- **Summary:** Manus expands beyond mobile by launching a desktop agent capable of file operations, app control, and research automation. Highlights include “My Computer” mode and cross-application task execution.  
- **Conceptual Signals for eco:**  
  - Local resource abstraction  
  - Cross-application automation  
  - Agent autonomy loops  
  - File-level capabilities  

### 3. The Next Web — Manus AI agent arrives on your desktop
- **Source:** The Next Web  
- **Summary:** Manus brings its AI agent to desktop environments, enabling research workflows, file management, and multi-step tasks. Emphasizes productivity and personal assistant behavior.  
- **Conceptual Signals for eco:**  
  - Multi-step task orchestration  
  - Consumer-assistant patterns  
  - Desktop automation primitives  

### 4. Digital Trends — Meta brings Manus AI agent to your PC and Mac
- **Source:** Digital Trends  
- **Summary:** Manus’ desktop app integrates with local systems, offering automation, file search, and app control. Focus on user convenience and personal productivity.  
- **Conceptual Signals for eco:**  
  - Local system integration  
  - App-level automation  
  - User-centric assistant UX  

### 5. The Financial Express — Meta-backed Manus brings ‘My Computer’
- **Source:** The Financial Express  
- **Summary:** Manus introduces “My Computer,” enabling AI-driven research, file operations, and workflow automation. Highlights privacy and local execution.  
- **Conceptual Signals for eco:**  
  - Local-first privacy model  
  - Research automation  
  - File-system-level capabilities  

### 6. Manus Official Blog — Introducing My Computer
- **Source:** Manus.ai  
- **Summary:** Official announcement detailing Manus’ local execution model, permission system, replay capabilities, and desktop integration.  
- **Conceptual Signals for eco:**  
  - Permission model (“Allow Once / Always Allow”)  
  - Replay system  
  - Local-first execution  
  - Gateway-like abstraction  
  - Multi-surface agent behavior  

## Overall Summary
This conversation explored how Manus and OpenClaw architectures compare to eco’s cognitive OS design. Manus provides local-first execution, multi-surface automation, permission prompts, and replay features—useful signals for eco’s cockpit and governance layers. OpenClaw provides gateway abstractions, human-readable memory, and skill registries, but also exhibits anti-patterns such as monolithic daemons, channel-centric design, YAML-as-runtime, and single-LLM “brain + hands” models.

The conversation produced a comprehensive set of inclusion and exclusion primitives for eco, clarified governance document structure, NP Block usage, and created deterministic prompts for extraction, ledger updates, and PASS ingestion. It also established eco’s identity as a multi-agent, deterministic, governed cognitive OS—not a consumer assistant, automation tool, or monolithic agent.

## Inclusion Primitives (Suggested)
- Multi-agent, multi-model reasoning  
- Deterministic PASS engine  
- Replay and auditability  
- Human-readable memory  
- Local-first execution  
- Governed permission model (eco.policy.trust)  
- Mount-based architecture (eco.mount)  
- Developer-first cockpit interface  
- Standards-driven architecture (ONS, ARCHE, EBNF, ABNF)  
- Modular, surface-agnostic runtime  
- Gateway-style abstractions (inverted, not monolithic)  
- Governed autonomy loops  
- Inversion primitives (consumer UX → developer-grade tools)  
- Sandbox primitives for high-risk capabilities  
- Market-validated UX patterns (replay, permissions, local resource abstraction)  
- Multi-surface orchestration  
- Local resource abstraction  
- Cross-application orchestration  
- Research automation (governed)  
- File-system-level capabilities (governed)  
- Execution graph visibility  
- Agent role visualization  
- Deterministic logs and diffing  
- Policy-bound execution  
- Multi-step task orchestration (governed)  
- Developer cockpit modes  
- Trust classes and capability boundaries  
- Cryptographic policy enforcement  
- Replayable autonomy loops  
- Human-readable, diffable memory structures  
- Multi-runtime orchestration  
- Surface-agnostic adapters  
- Deterministic governance workflows  
- Structured change tracking  
- Constitutional governance documents  
- PASS ingestion and contradiction detection  
- Governance conflict resolution passes  

## Exclusion Primitives (Suggested)
- Monolithic daemons (OpenClaw Gateway)  
- Channel-centric architectures  
- YAML/Markdown as runtime logic  
- Single-LLM “brain + hands” models  
- Workspace-coupled sessions  
- Consumer-assistant behavior  
- Ungoverned autonomy loops  
- Implicit permissions  
- Opaque memory stores  
- Black-box agent behavior  
- Desktop-butler UX patterns  
- Task-runner architectures  
- Agent monoliths  
- Cloud-first execution defaults  
- Ungoverned file-system access  
- Ungoverned browser automation  
- Skill definitions without governance  
- Single-process orchestration  
- Opaque replay systems  
- Non-deterministic execution flows  
- Unbounded agent autonomy  
- Channel-bound workflows  
- Workspace-bound cognition  
- YAML skill registries  
- Monolithic gateway routing  
- Consumer UX as architectural primitive  
- Non-auditable memory  
- Non-diffable logs  
- Implicit trust models  
- Ungoverned tool access  
- Non-modular runtimes  
- Hard-coded surfaces  
- Opaque agent pipelines  

## Other Relevant Suggestions
- eco should maintain constitutional governance documents (inclusion/exclusion sets).  
- NP Blocks belong in governance documents, not prompts.  
- eco.governance.index.md should link all governance artifacts.  
- PASS ingestion should handle contradiction detection and normalization.  
- Manus’ permission UX is valuable but must be governed.  
- Manus’ replay UX is valuable but must be deterministic.  
- OpenClaw’s gateway abstraction is useful only when inverted into eco.mount.  
- Local-first execution is a market-validated expectation.  
- Multi-agent visualization is becoming a UX norm.  
- Consumer-assistant patterns should be inverted into developer-grade tools.  
- eco must maintain strict separation between cognition and channels.  
- eco must avoid monolithic or single-process designs.  
- eco should adopt structured change tracking for governance docs.  
- eco should maintain append-only governance ledgers.  
- eco should use deterministic prompts for extraction and ledger updates.  
- eco should use PASS for contradiction detection and governance resolution.  
- eco should maintain a multi-surface, multi-runtime cognitive substrate.  
- eco should treat channels as mounts, not architectural primitives.  
- eco should maintain strict capability boundaries and trust classes.  
- eco should enforce cryptographic policy layers for high-risk actions.  
- eco should maintain developer-first cockpit modes for visibility and control.

# === END SUMMARY BLOCK ===