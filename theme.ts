import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  ...defaultConfig,
  globalCss: {
    "html, body, #root": {
      height: "100%",
    },
    "#root": {
      width: "100%",
    },
  },
});

export const system = createSystem(config);
