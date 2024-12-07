import { ThemeConfig } from "@chakra-ui/theme";
import { extendTheme } from "@chakra-ui/react/extend-theme";

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
