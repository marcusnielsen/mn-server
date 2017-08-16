import Config from "../../src/config";

test("config", () => {
  const config = Config({ processEnv: process.env });
  expect(config).toMatchSnapshot();
});
