import { describe, expect, it } from "vitest";
import { mondayOf } from "@/domain/dates/week";

describe("mondayOf", () => {
  it("returns the Monday for any day", () => {
    expect(mondayOf(new Date("2026-08-05T12:00:00Z")).toISOString().slice(0, 10)).toBe("2026-08-03");
  });
});
