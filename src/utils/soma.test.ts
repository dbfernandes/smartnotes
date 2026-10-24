import { expect, test } from "vitest"
import { soma } from "./soma.js"

test("soma números positivos", () => {
  expect(soma(2, 3)).toBe(5)
})

test("soma com um número negativo", () => {
  expect(soma(5, -2)).toBe(3)
})
