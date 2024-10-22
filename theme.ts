import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      "html, body, #root": {
        height: "100%",
      },
      "#root": {
        width: "100%",
      },
    },
  },
});

export default theme;
