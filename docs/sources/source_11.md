# Source 11
# === BEGIN SUMMARY BLOCK ===

## Links
- https://github.com/Green-Software-Foundation/software-carbon-intensity
- https://www.iso.org/standard/86225.html
- https://github.com/Green-Software-Foundation/sci
- https://github.com/hubblo-org/scaphandre
- https://github.com/sustainable-computing-io/kepler

## Article Details

### https://github.com/Green-Software-Foundation/software-carbon-intensity
- Source: Green Software Foundation (GitHub)
- Summary: Defines the Software Carbon Intensity (SCI) specification, a standardized method for calculating carbon emissions per unit of software work. Emphasizes rate‑based measurement, direct emissions reduction, and workload‑normalized metrics. Provides formulas, boundaries, and implementation guidance.
- Conceptual Signals for eco:
  - Rate‑based metrics
  - Carbon intensity as telemetry
  - Workload‑normalized measurement
  - Neutral, quantifiable signals
  - Vendor‑agnostic specification

### https://www.iso.org/standard/86225.html
- Source: ISO (International Organization for Standardization)
- Summary: ISO/IEC 21031:2024 formalizes software carbon intensity measurement as an international standard. Establishes definitions, boundaries, and compliance structures for carbon‑aware software evaluation.
- Conceptual Signals for eco:
  - Standardized measurement frameworks
  - Formal boundaries for telemetry
  - Neutral compliance surfaces
  - Internationalized metric definitions

### https://github.com/Green-Software-Foundation/sci
- Source: Green Software Foundation (GitHub)
- Summary: Repository containing SCI documentation, examples, tooling references, and implementation notes. Reinforces the SCI formula, boundaries, and measurement methodology.
- Conceptual Signals for eco:
  - Implementation‑agnostic measurement
  - Telemetry surfaces
  - Rate‑based environmental metrics

### https://github.com/hubblo-org/scaphandre
- Source: Hubblo‑org (GitHub)
- Summary: Energy monitoring tool for servers and cloud environments. Measures power consumption at process and system levels. Often used in sustainability research and carbon‑aware computing.
- Conceptual Signals for eco:
  - Energy telemetry
  - Process‑level measurement
  - Infrastructure‑level observability

### https://github.com/sustainable-computing-io/kepler
- Source: Sustainable Computing IO (GitHub)
- Summary: Kubernetes‑native energy and carbon telemetry tool. Collects node‑level and container‑level energy metrics. Integrates with cluster schedulers for carbon‑aware orchestration.
- Conceptual Signals for eco:
  - Cluster‑level telemetry
  - Scheduling‑aware metrics
  - Containerized workload measurement

## Overall Summary
The conversation centers on extracting primitives from a Discovery Card about Software Carbon Intensity (SCI), sustainability metrics, and carbon‑aware computing. The card emphasizes energy usage, carbon intensity, idle compute waste, and workflow‑level audits. Multiple GitHub repositories and ISO standards provide formal definitions, measurement frameworks, and tooling references. The discussion identifies which primitives align with eco’s neutral, governance‑first architecture and which do not. The user requested extraction, consolidation, and deterministic formatting of all relevant signals, links, and conceptual surfaces. The final result is a unified summary of all sources, their conceptual contributions, and the primitives eco should consider.

## Inclusion Primitives (Suggested)
- carbon.intensity.rate  
- energy.per.request  
- deployment.carbon.window  
- idle.compute.ratio  
- audit.idle  
- audit.provisioning  
- audit.redundancy  
- vendor‑neutral telemetry interfaces  
- optional sustainability‑aware constraints  
- measurable, rate‑based, policy‑neutral metrics  
- environment‑level signals (resource usage, energy draw, compute efficiency, scheduling windows, workload intensity)  
- workflow‑level optimization surfaces (redundant cycles, unnecessary compute, inefficient provisioning, idle drains)  
- constraint‑aware execution  
- telemetry → governance → cockpit pipeline  
- rate‑based sustainability metrics as first‑class telemetry  

## Exclusion Primitives (Suggested)
- role‑based sustainability mandates  
- corporate‑goal alignment  
- moral or cultural sustainability framing  
- vendor‑specific or tool‑specific primitives  
- sustainability‑as‑identity  
- organizational‑structure assumptions  
- behavior‑shaping or moral‑imperative patterns  

## Other Relevant Suggestions
- Maintain eco’s neutrality and governance‑first posture  
- Treat sustainability metrics as telemetry, not ideology  
- Expand eco’s telemetry surfaces without adopting vendor lock‑in  
- Preserve optionality for all constraints  
- Avoid embedding corporate, cultural, or organizational assumptions  
- Reinforce eco’s separation of layers (eOS, eco, elan, LASSO)  
- Support rate‑based, measurable, environment‑level signals  
- Integrate sustainability metrics into existing cockpit and diagnostics flows  
- Continue building abstract, vendor‑agnostic measurement interfaces  
- Recognize sustainability metrics as parallel to latency, throughput, and cost signals  

# === END SUMMARY BLOCK ===