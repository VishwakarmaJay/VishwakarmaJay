import {
  CustomCursor,
  StatusBar,
  Hero,
  Ticker,
  About,
  HireMe,
  Experience,
  Projects,
  Contact,
  Footer,
  KonamiOverlay,
} from './components'

export default function App() {
  return (
    <>
      <div className="grid-bg" />
      <div className="glow-blob" />
      <div className="glow-blob-2" />
      <CustomCursor />
      <StatusBar />
      <Hero />
      <Ticker />
      <About />
      <HireMe />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
      <KonamiOverlay />
    </>
  )
}