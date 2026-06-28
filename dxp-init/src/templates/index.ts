import Handlebars from 'handlebars';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = join(__dirname, '..', '..', 'templates');

const cache = new Map<string, HandlebarsTemplateDelegate>();

function load(name: string): HandlebarsTemplateDelegate {
  if (cache.has(name)) return cache.get(name)!;
  const src = readFileSync(join(TEMPLATES_DIR, name), 'utf8');
  const compiled = Handlebars.compile(src, { strict: true });
  cache.set(name, compiled);
  return compiled;
}

export function render(templateName: string, context: Record<string, unknown>): string {
  return load(templateName)(context);
}

// Register helpers
Handlebars.registerHelper('eq', (a: unknown, b: unknown) => a === b);
Handlebars.registerHelper('or', (a: unknown, b: unknown) => a || b);
Handlebars.registerHelper('isoDate', () => new Date().toISOString().split('T')[0]);
Handlebars.registerHelper('isoTimestamp', () => new Date().toISOString());
