import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { projects, getProjectById } from './src/data/projects.js';
import { siteConfig } from './src/data/siteConfig.js';

console.log('--- STARTING FORM / FIELD VERIFICATION TESTS ---');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Site Config Validation
assert(siteConfig.brand.title === 'PROTO', 'Brand title is PROTO');
assert(siteConfig.hero.headlinePart1 === 'I', 'Headline Part 1 matches spec');
assert(siteConfig.hero.headlinePart2 === 'PROTOTYPE', 'Headline Part 2 matches spec');
assert(siteConfig.hero.eyebrow === 'I create therefor I am', 'Hero eyebrow is I create therefor I am');
assert(siteConfig.contact.email === 'aaryangaikwad1057@gmail.com', 'Contact email matches spec');
assert(siteConfig.contact.githubUrl.includes('ProtoAaryanG1057'), 'Contact GitHub matches spec');

// 2. Project Data Validation
assert(projects.length >= 1, `Projects array has ${projects.length} active project(s)`);

for (const p of projects) {
  assert(p.id && p.title && p.category && p.summary, `Project ${p.id} has id, title, category, and summary`);
  assert(p.specs && p.specs.length > 0, `Project ${p.id} has specification matrix`);
  assert(p.sections && p.sections.overview && p.sections.problemStatement, `Project ${p.id} has comprehensive documentation sections`);
  assert(p.sections.objectives && p.sections.objectives.length > 0, `Project ${p.id} has objectives`);
  assert(p.sections.technologiesUsed && p.sections.technologiesUsed.length > 0, `Project ${p.id} has technologies list`);

  // Verify project image exists
  const cleanImgPath = p.primaryImage.replace(/^\.\//, '');
  const pubPath = path.resolve(process.cwd(), 'public', cleanImgPath);
  const distPath = path.resolve(process.cwd(), 'dist', cleanImgPath);
  
  assert(fs.existsSync(pubPath), `Project ${p.id} primary image exists in public: ${cleanImgPath}`);
  assert(fs.existsSync(distPath), `Project ${p.id} primary image exists in dist: ${cleanImgPath}`);
}

// 3. Flexwalk Fact Checking
const flexwalk = getProjectById('flexwalk');
assert(flexwalk !== null, 'Flexwalk project is present');
assert(flexwalk.timeline === 'JUN 26 – AUG 26', 'Flexwalk timeline matches JUN 26 – AUG 26');
assert(flexwalk.sections.technologiesUsed.includes('Onshape'), 'Flexwalk records Onshape as CAD environment');
assert(!flexwalk.sections.lessonsLearned, 'Lessons learned section is properly removed');
assert(flexwalk.videos && flexwalk.videos.length === 3, 'Flexwalk has 3 video demo records');
assert(flexwalk.specs.some(s => s.value.includes('1.30 kg')), 'Flexwalk accurately records 1.3kg mass from hardware');
assert(flexwalk.specs.some(s => s.value.includes('8 DoF')), 'Flexwalk accurately records 8 DoF');
assert(flexwalk.sections.testingAndOutcomes.includes('active area of research'), 'Flexwalk honestly scopes dynamic walking as active ongoing research');

// 4. Dist and Workflow Validation
assert(fs.existsSync(path.resolve(process.cwd(), 'dist/index.html')), 'dist/index.html exists');
assert(fs.existsSync(path.resolve(process.cwd(), 'dist/resume.pdf')), 'dist/resume.pdf exists');
assert(fs.existsSync(path.resolve(process.cwd(), '.github/workflows/deploy.yml')), 'GitHub Actions deploy.yml exists');

// 5. HTML Content Validation
const htmlContent = fs.readFileSync(path.resolve(process.cwd(), 'dist/index.html'), 'utf-8');
assert(htmlContent.includes('PROTO'), 'dist/index.html contains PROTO title');
assert(htmlContent.includes('IBM+Plex+Mono'), 'dist/index.html contains IBM Plex Mono font link');
assert(htmlContent.includes('Space+Grotesk'), 'dist/index.html contains Space Grotesk font link');
assert(htmlContent.includes('Frijole'), 'dist/index.html contains Frijole font link');
assert(htmlContent.includes('Kranky'), 'dist/index.html contains Kranky font link');
assert(htmlContent.includes('Mystery+Quest'), 'dist/index.html contains Mystery Quest font link');
assert(htmlContent.includes('Playpen+Sans'), 'dist/index.html contains Playpen Sans font link');
assert(htmlContent.includes('Comfortaa'), 'dist/index.html contains Comfortaa font link');
assert(htmlContent.includes('Syne'), 'dist/index.html contains Syne font link');
assert(htmlContent.includes('Michroma'), 'dist/index.html contains Michroma font link');
assert(htmlContent.includes('Instrument+Serif'), 'dist/index.html contains Instrument Serif font link');
assert(htmlContent.includes('Unbounded'), 'dist/index.html contains Unbounded font link');

console.log(`\nTEST SUMMARY: ${passed} Passed, ${failed} Failed.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL VERIFICATION CHECKS PASSED.');
}
