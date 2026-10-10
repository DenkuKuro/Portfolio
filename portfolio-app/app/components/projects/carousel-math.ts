export type Slot = { x: number; scale: number; opacity: number; z: number; visible: boolean };

/** Shortest signed distance from active to i, so the carousel loops. */
export function wrapOffset(i: number, active: number, n: number): number {
  let off = i - active;
  if (off > n / 2) off -= n;
  if (off < -n / 2) off += n;
  return off;
}

/** Position of a card `offset` steps from the active one. `reach` is how many neighbours stay visible per side. */
export function slotFor(offset: number, spread = 400, reach = 2): Slot {
  const d = Math.abs(offset);
  const dir = Math.sign(offset);
  if (d === 0) return { x: 0, scale: 1, opacity: 1, z: 20, visible: true };
  if (d === 1) return { x: dir * spread, scale: 0.8, opacity: 0.5, z: 19, visible: true };
  if (d === 2 && reach >= 2) return { x: dir * spread * 1.62, scale: 0.64, opacity: 0.18, z: 18, visible: true };
  return { x: dir * spread * 1.62, scale: 0.64, opacity: 0, z: 17, visible: false };
}

export const mod = (i: number, n: number) => ((i % n) + n) % n;
