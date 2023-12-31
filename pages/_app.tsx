import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import 'tailwindcss/tailwind.css';
import './style/header.css'
import './style/rangeSlider.css'
import './style/generate.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
