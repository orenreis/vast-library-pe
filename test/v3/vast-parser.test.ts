import { assert } from "chai";
import parseVast from "../../src/vast-parser";
import { getFixtureContent } from "../helpers";

describe("vast parser VAST2", () => {
  it("should validate a VAST v3 minimal vast", () => {
    const vastRaw = getFixtureContent("v3", "minimal_vast");
    assert.isTrue(parseVast(vastRaw));
  });
  it("should invalidate a wrong VAST v3", () => {
    const vastRaw = getFixtureContent("v3", "vast_missing_values");
    assert.isFalse(parseVast(vastRaw));
  });
  it("should invalidate a wrong VAST v3", () => {
    const vastRaw = getFixtureContent("v3", "vast_missing_values");
    assert.throw(() => {
      parseVast(vastRaw, { throwOnError: true });
    });
  });
});
