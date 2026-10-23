import About from "./components/About";
import BudgetWidget from "./components/BudgetWidget";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <BudgetWidget />
      </main>
      <Footer />
    </>
  );
}
