#!/usr/bin/env node
'use strict';

const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

function parseArgs(argv) {
  const args = new Set();
  const opts = { dryRun: false };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--dry-run' || arg === '-n') {
      opts.dryRun = true;
    } else if (arg === '--help' || arg === '-h') {
      args.add('help');
    } else {
      // ignore unknown flags for simplicity
    }
  }
  return { args, opts };
}

function slugify(input) {
  if (typeof input !== 'string') return 'workflow';
  let s = input.trim().toLowerCase();
  // Replace whitespace with dashes
  s = s.replace(/\s+/g, '-');
  // Remove anything not alphanumeric, dash or underscore
  s = s.replace(/[^a-z0-9-_]/g, '');
  // Collapse multiple dashes
  s = s.replace(/-+/g, '-');
  // Trim dashes
  s = s.replace(/^-+/, '').replace(/-+$/, '');
  if (s.length === 0) s = 'workflow';
  // Limit length to avoid absurdly long filenames
  if (s.length > 100) s = s.slice(0, 100);
  return s;
}

async function fileExists(filePath) {
  try {
    await fsp.access(filePath, fs.constants.F_OK);
    return true;
  } catch (_) {
    return false;
  }
}

async function main() {
  const { args, opts } = parseArgs(process.argv);
  if (args.has('help')) {
    console.log('Rename workflow files that contain JSON based on their \'name\' field');
    console.log('');
    console.log('Usage: node rename_workflows_from_name.js [--dry-run]');
    console.log('  -n, --dry-run   Show planned renames without changing files');
    process.exit(0);
  }

  const repoRoot = __dirname;
  const workflowsDir = path.join(repoRoot, 'workflows');
  const exists = await fileExists(workflowsDir);
  if (!exists) {
    console.error(`Error: workflows directory not found at ${workflowsDir}`);
    process.exit(1);
  }

  const entries = await fsp.readdir(workflowsDir, { withFileTypes: true });
  const workflowFiles = entries
    .filter((e) => e.isFile())
    .map((e) => e.name);

  if (workflowFiles.length === 0) {
    console.log('No files found in workflows/. Nothing to do.');
    return;
  }

  const plannedTargetsLower = new Set();
  let changes = 0;

  for (const fileName of workflowFiles) {
    const fullPath = path.join(workflowsDir, fileName);
    let jsonText;
    try {
      jsonText = await fsp.readFile(fullPath, 'utf8');
    } catch (err) {
      console.warn(`Skip (read error): ${fileName} -> ${err.message}`);
      continue;
    }

    let data;
    try {
      data = JSON.parse(jsonText);
    } catch (err) {
      console.warn(`Skip (invalid JSON): ${fileName} -> ${err.message}`);
      continue;
    }

    const rawName = data && typeof data.name === 'string' ? data.name : null;
    if (!rawName) {
      console.warn(`Skip (missing name field): ${fileName}`);
      continue;
    }

    const slug = slugify(rawName);
    let targetBase = `${slug}.json`;

    // If same name (case-sensitive), skip
    if (targetBase === fileName) {
      console.log(`OK (already named): ${fileName}`);
      continue;
    }

    // Resolve collisions (existing files or duplicates within this run)
    const targetLower = targetBase.toLowerCase();
    let candidate = targetBase;
    let index = 1;
    // Avoid colliding with current file (case-insensitive)
    const currentLower = fileName.toLowerCase();
    while (
      (plannedTargetsLower.has(candidate.toLowerCase()) ||
        (await fileExists(path.join(workflowsDir, candidate)))) &&
      candidate.toLowerCase() !== currentLower
    ) {
      candidate = `${slug}-${index}.json`;
      index += 1;
    }
    targetBase = candidate;
    plannedTargetsLower.add(targetBase.toLowerCase());

    const targetPath = path.join(workflowsDir, targetBase);
    if (opts.dryRun) {
      console.log(`[dry-run] ${fileName} -> ${targetBase}`);
      changes += 1;
      continue;
    }

    try {
      // Handle possible case-only rename on case-insensitive FS by using a temp hop
      const caseOnly = fileName.toLowerCase() === targetBase.toLowerCase() && fileName !== targetBase;
      if (caseOnly) {
        const tempPath = path.join(workflowsDir, `${fileName}.tmp-rename`);
        await fsp.rename(fullPath, tempPath);
        await fsp.rename(tempPath, targetPath);
      } else {
        await fsp.rename(fullPath, targetPath);
      }
      console.log(`RENAMED: ${fileName} -> ${targetBase}`);
      changes += 1;
    } catch (err) {
      console.error(`Failed to rename ${fileName} -> ${targetBase}: ${err.message}`);
    }
  }

  const suffix = opts.dryRun ? 'planned' : 'performed';
  console.log(`\n${changes} rename(s) ${suffix}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


