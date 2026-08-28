import { Navbar } from "@/components/Navbar";
import { About } from "@/sections/About";
import { Achievements } from "@/sections/Achievements";
import { Contact } from "@/sections/Contact";
import { Experience } from "@/sections/Experience";
import { Hero } from "@/sections/Hero";
import { Projects } from "@/sections/Projects";
import { Skills } from "@/sections/Skills";
import { Footer } from "@/components/Footer";

export default function HomePage() {
    return (
        <main className="w-full min-w-0">
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Achievements />
            <Contact />
            <Footer />
        </main>
    );
}