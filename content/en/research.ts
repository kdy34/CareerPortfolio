export const research = {
  status: "Graduate research in progress",
  title: "Prompt injection in cloud-deployed LLM applications",
  question:
    "How vulnerable are cloud-deployed LLM applications to prompt injection, and which defense-in-depth strategies reduce attack success with minimal performance overhead?",
  intro:
    "I’m studying how layered safeguards can protect cloud-deployed LLM applications while keeping them responsive. The project asks how to measure defensive effectiveness and latency together, so a safeguard can be judged against the constraints of a real application.",
  motivation: [
    "LLM features are moving from demos into production services that read email, documents, and web pages. Any of that text can carry instructions the application never intended to follow.",
    "Most defenses are evaluated on whether they stop an attack. In a deployed service, a defense that adds noticeable latency or blocks legitimate requests also has a cost. I want both sides of that tradeoff on the same chart.",
  ],
  layers: [
    { name: "Input screening", detail: "Detect or neutralize suspicious instructions before they reach the model." },
    { name: "Prompt structure", detail: "Separate trusted instructions from untrusted content." },
    { name: "Output checks", detail: "Validate what the model returns before the application acts on it." },
    { name: "Least privilege", detail: "Limit which tools and data a model-driven step can reach." },
  ],
  evaluation: [
    { metric: "Defensive effectiveness", detail: "How often an injection attempt still succeeds with each layer, alone and combined." },
    { metric: "Latency overhead", detail: "Added response time per layer, measured under a cloud deployment." },
    { metric: "Effect on legitimate use", detail: "How often normal requests are blocked or degraded." },
  ],
  note: "Findings will appear here once they are reviewed. Until then, this page describes the question and the planned evaluation.",
};
