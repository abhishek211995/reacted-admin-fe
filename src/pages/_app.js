import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { registerChartJs } from "../utils/register-chart-js";
import { theme } from "../theme";
import { AuthProvider, useAuth } from "../contexts/auth-context";

registerChartJs();

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Reacted Admin Panel</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            {getLayout(<Component {...pageProps} />)}
          </AuthProvider>
        </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
