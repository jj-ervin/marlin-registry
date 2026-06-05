---
title: "Walrus Memory: Portable, Encrypted, Cross-Provider Agent Memory"
publication: ""
url: ""
date: ""
topics: [agent-runtime, platform-architecture, identity-trust, llm-infra]
relevance: [eco, .eco, agent-dossier, agent-matrix, governance-commons, ons]
---

## Summary

Walrus Memory treats memory as a first-class portable substrate rather than a
bolt-on vector store. It integrates with Claude, ChatGPT, Gemini, and other
frameworks, providing encrypted storage, programmable access policies, and
zk-proof-based verifiable claims. Agents carry their memory across sessions,
devices, runtimes, and model providers without fragmentation or lock-in. Context
ranking and filtering deliver a reported 60% improvement in relevant retrieval.

## Key Points

- **Portable memory layers**: memory travels with the agent, not the model or provider;
  state is serializable, encrypted, and resumable across sessions, devices, and runtimes
- **Cross-provider continuity**: integrates with Claude, ChatGPT, Gemini; LLMs are
  interchangeable organs — memory + policy + workflow is the real agent; switching models
  never breaks continuity
- **Encrypted, policy-driven memory**: storage encrypted at rest and in motion; access
  controlled by policies not code paths; zk-proofs let agents prove knowledge without
  revealing underlying data
- **Verifiable context claims**: agents can collaborate without leaking private memory;
  enables multi-agent trust networks and federated workflows where data sovereignty matters
- **Portable identity**: identity = memory + capabilities + policies; agents dock into
  different runtimes while retaining identity; vendor-independent sovereign identity layer
- **Context ranking and filtering**: combining encrypted processing, ranking, and filtering
  yields 60% improvement in relevant context retrieval; memory compaction and task-specific
  memory slices as core primitives

## Relevance to Eco

- **eco runtime (.eco)**: portable, encrypted, policy-governed memory objects as a
  first-class primitive; memory must be serializable and resumable across runtimes —
  this is the missing formalization in eco's current architecture
- **agent-dossier**: identity = memory + capabilities + policies is a direct extension
  of the dossier contract; agents carrying portable identity into any runtime
- **agent-matrix**: cross-provider continuity enforces the principle that LLMs are
  swappable organs, not the brain — routing and capability mapping stay stable across
  model switches
- **governance-commons**: zk-verified claims as a trust primitive for multi-agent
  handoffs; agents prove knowledge without exposing data — major unlock for federated
  governance workflows
- **ons**: memory object types, verifiable claim schemas, and identity bundle structures
  should be registered namespace entries

**Big takeaway**: eco should adopt portable, encrypted, policy-governed memory objects;
cross-provider continuity as a default; zk-based verifiable claims; and identity as a
portable memory-policy bundle. Walrus validates eco's direction and surfaces several
missing primitives to formalize.

## Excerpts

> "Memory must travel with the agent, not live inside the model or provider."
> "Switching models should never break continuity or context."
> "Identity = memory + capabilities + policies."
> "Agents can prove knowledge without revealing the underlying data."
