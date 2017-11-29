import makeConfig from "./index";

test("config", () => {
  const config = makeConfig({ prefix: "TST_", envVars: { TST_A: "a_value" } });

  expect(config.TST_A).toEqual("a_value");
});
