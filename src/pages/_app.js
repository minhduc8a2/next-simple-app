import MainLayout from "@/components/layout/main-layout"
import "@/styles/globals.scss"

export default function App({ Component, pageProps }) {
  return <MainLayout children={<Component {...pageProps} />} />
}
