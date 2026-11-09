import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const briefs = new URL("../briefs/", import.meta.url);
const files = fs.readdirSync(briefs).filter((name) => name.endsWith(".md")).sort();

test("one brief per course", () => {
  assert.equal(files.length, 15);
});

test("every brief says when the project is done", () => {
  for (const file of files) {
    const text = fs.readFileSync(new URL(file, briefs), "utf8");
    assert.match(text, /^# /);
    assert.match(text, /## Done when/);
    assert.ok(text.includes("- [ ] "), file);
  }
});

test("the security brief stays defensive", () => {
  const text = fs.readFileSync(new URL("secure-by-design.md", briefs), "utf8");
  assert.match(text, /no exploit steps/i);
});
