import Header from "./components/Header"
import Footer from "./components/Footer"
import Slider from "./components/Slider";

import Section_1 from "./views/Section_1";
import Section_2 from "./views/Section_2";
import Section_3 from "./views/Section_3";
import Section_4 from "./views/Section_4";
import Section_5 from "./views/Section_5";
import Section_6 from "./views/Section_6";
import Section_7 from "./views/Section_7";
import Section_8 from "./views/Section_8";

function App() {
  return (
    <>
    <Header/>
    <main className="pt-16 pb-12 min-h-screen">
        <Slider />

        <Section_1/>
        <Section_2/>
        <Section_3/>
        <Section_4/>
        <Section_5/>
        <Section_6/>
        <Section_7/>
        <Section_8/>

    </main>
    <Footer/>
    </>
  )
}

export default App
