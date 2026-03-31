import { describe, it, expect } from "vitest"
import { parseDuration, formatDuration } from "@/lib/utils"

describe("parseDuration", () => {
  it("parses '5 days' correctly", () => {
    expect(parseDuration("5 days")).toEqual({ value: 5, unit: "days" })
  })

  it("parses '2 weeks' correctly", () => {
    expect(parseDuration("2 weeks")).toEqual({ value: 2, unit: "weeks" })
  })

  it("parses '4 days' correctly", () => {
    expect(parseDuration("4 days")).toEqual({ value: 4, unit: "days" })
  })

  it("parses singular '1 day' correctly", () => {
    expect(parseDuration("1 day")).toEqual({ value: 1, unit: "day" })
  })

  it("parses '3 weeks' correctly", () => {
    expect(parseDuration("3 weeks")).toEqual({ value: 3, unit: "weeks" })
  })

  it("defaults to 1 week for empty string", () => {
    expect(parseDuration("")).toEqual({ value: 1, unit: "weeks" })
  })

  it("defaults to 1 week for undefined-like input", () => {
    expect(parseDuration("invalid")).toEqual({ value: 1, unit: "weeks" })
  })
})

describe("formatDuration", () => {
  it("returns the original string for valid input", () => {
    expect(formatDuration("5 days")).toBe("5 days")
  })

  it("returns '1 week' for empty string", () => {
    expect(formatDuration("")).toBe("1 week")
  })

  it("preserves week format", () => {
    expect(formatDuration("2 weeks")).toBe("2 weeks")
  })
})
