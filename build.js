#!/usr/bin/env node
/**
 * Injects partials/header.html and partials/footer.html into HTML files.
 * Run: node build.js
 * Each HTML file must contain:
 *   <!-- start header --> ... existing header + drawer ... <!-- end header -->
 *   <!-- start footer --> ... existing footer ... <!-- end footer -->
 * Build replaces those blocks with partial content; {{base}} in partials
 * becomes "" or "../" per page. Sets class="active" on current nav link.
 */

const fs = require('fs');
const path = require('path');

const PARTIALS_DIR = path.join(__dirname, 'partials');
const HEADER_FILE = path.join(PARTIALS_DIR, 'header.html');
const FOOTER_FILE = path.join(PARTIALS_DIR, 'footer.html');

const PAGES = [
  { file: 'index.html', base: '', activeHref: 'index.html' },
  { file: 'about.html', base: '', activeHref: 'about.html' },
  { file: 'contact.html', base: '', activeHref: 'contact.html' },
  { file: 'resume.html', base: '', activeHref: 'resume.html' },
  { file: 'projects/project-1.html', base: '../', activeHref: '../index.html#projects' },
  { file: 'projects/project-2.html', base: '../', activeHref: '../index.html#projects' },
  { file: 'projects/project-3.html', base: '../', activeHref: '../index.html#projects' },
  { file: 'projects/project-4.html', base: '../', activeHref: '../index.html#projects' },
  { file: 'projects/template.html', base: '../', activeHref: '' },
];

const HEADER_MARKER = /<!-- start header -->[\s\S]*?<!-- end header -->/;
const FOOTER_MARKER = /<!-- start footer -->[\s\S]*?<!-- end footer -->/;

function inject(str, base, activeHref) {
  let out = str.replace(/\{\{base\}\}/g, base);
  if (activeHref) {
    const simple = activeHref.replace(/^\.\.\//, '');
    const needle = 'href="' + base + simple + '"';
    const withActive = 'href="' + base + simple + '" class="active"';
    out = out.replace(new RegExp(needle.replace(/[#.?]/g, function (c) { return c === '#' ? '#' : c === '?' ? '\\?' : '\\.'; }), 'g'), withActive);
  }
  return out;
}

function main() {
  const headerPartial = fs.readFileSync(HEADER_FILE, 'utf8');
  const footerPartial = fs.readFileSync(FOOTER_FILE, 'utf8');

  for (const page of PAGES) {
    const filePath = path.join(__dirname, page.file);
    if (!fs.existsSync(filePath)) {
      console.warn('Skip (missing): ' + page.file);
      continue;
    }
    let html = fs.readFileSync(filePath, 'utf8');

    if (!HEADER_MARKER.test(html)) {
      console.warn('Skip (no header markers): ' + page.file);
      continue;
    }

    const headerBlock = inject(headerPartial, page.base, page.activeHref);
    const footerBlock = footerPartial.replace(/\{\{base\}\}/g, page.base);

    html = html.replace(HEADER_MARKER, '<!-- start header -->\n' + headerBlock + '\n    <!-- end header -->');
    html = html.replace(FOOTER_MARKER, '<!-- start footer -->\n' + footerBlock + '\n    <!-- end footer -->');

    fs.writeFileSync(filePath, html, 'utf8');
    console.log('Built: ' + page.file);
  }
}

main();
