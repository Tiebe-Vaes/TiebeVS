import { test } from "node:test"
import assert from "node:assert/strict"
import {
  box,
  gateReadout,
  isSettled,
  iso,
  lendReadout,
  pourReadout,
  prism,
  springStep,
  steerReadout,
} from "./geometry.ts"

const round2 = ([x, y]: [number, number]) => [Math.round(x * 100) / 100, Math.round(y * 100) / 100]

test("iso projects the origin to the viewBox anchor", () => {
  assert.deepEqual(iso(0, 0, 0), [200, 190])
})

test("iso moves +x down to the right and +z straight up", () => {
  assert.deepEqual(round2(iso(10, 0, 0)), [208.66, 195])
  assert.deepEqual(iso(0, 0, 10), [200, 180])
})

test("box returns three faces of four points each", () => {
  const faces = box(0, 0, 0, 10, 10, 10)
  for (const face of [faces.top, faces.left, faces.right]) {
    assert.equal(face.trim().split(/\s+/).length, 4)
  }
})

test("prism shows the top and only the sides that face the viewer", () => {
  const square = prism([[0, 0], [10, 0], [10, 10], [0, 10]], 0, 5)
  assert.equal(square.top.trim().split(/\s+/).length, 4)
  assert.equal(square.sides.length, 2)
  const diamond = prism([[0, -7], [7, 0], [0, 7], [-7, 0]], 0, 5)
  assert.equal(diamond.sides.length, 1)
})

test("springStep settles on the target within two seconds without big overshoot", () => {
  let value = 0
  let velocity = 0
  let steps = 0
  let peak = 0
  while (!isSettled(value, velocity, 1) && steps < 120) {
    ;[value, velocity] = springStep(value, velocity, 1, 1 / 60)
    peak = Math.max(peak, value)
    steps++
  }
  assert.ok(isSettled(value, velocity, 1), `not settled after ${steps} steps`)
  assert.ok(peak <= 1.05, `overshoot ${peak}`)
})

test("gateReadout", () => {
  assert.equal(gateReadout(0), "gate up")
  assert.equal(gateReadout(1), "gate down · 8 lanes")
  assert.equal(gateReadout(0.5), "gate 45°")
})

test("pourReadout", () => {
  assert.equal(pourReadout(0), "pour 0%")
  assert.equal(pourReadout(0.374), "pour 37%")
})

test("steerReadout", () => {
  assert.equal(steerReadout(0.5), "steer 0°")
  assert.equal(steerReadout(1), "steer +30°")
  assert.equal(steerReadout(0), "steer −30°")
})

test("lendReadout", () => {
  assert.equal(lendReadout(0.49), "at home")
  assert.equal(lendReadout(0.5), "lent out")
})
