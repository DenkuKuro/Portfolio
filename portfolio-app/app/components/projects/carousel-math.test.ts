// Run with: node --test app/components/projects/carousel-math.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { mod, slotFor, wrapOffset } from "./carousel-math.ts";

test("wrapOffset loops at both ends", () => {
  assert.equal(wrapOffset(5, 0, 6), -1);
  assert.equal(wrapOffset(0, 5, 6), 1);
  assert.equal(wrapOffset(3, 0, 6), 3);
  assert.equal(wrapOffset(2, 2, 6), 0);
});

test("offsets with 6 cards run from -2 to +3 around any active", () => {
  const offsets = Array.from({ length: 6 }, (_, i) => wrapOffset(i, 1, 6)).sort((a, b) => a - b);
  assert.deepEqual(offsets, [-2, -1, 0, 1, 2, 3]);
});

test("slotFor maps offsets to slots", () => {
  assert.deepEqual(slotFor(0), { x: 0, scale: 1, opacity: 1, z: 20, visible: true });
  assert.equal(slotFor(-1).x, -400);
  assert.equal(slotFor(2, 100).x, 162);
  assert.equal(slotFor(3).visible, false);
  assert.equal(slotFor(2, 300, 1).visible, false);
});

test("mod wraps negatives", () => {
  assert.equal(mod(-1, 6), 5);
  assert.equal(mod(6, 6), 0);
});
