import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas px-3 py-3 transition-colors duration-300 dark:bg-midnight sm:px-6 sm:py-6">
      <div className="mx-auto max-w-[1600px] rounded-[32px] bg-cream px-6 py-6 transition-colors duration-300 dark:bg-midnight-card sm:px-10 sm:py-8 lg:px-14">
        <Navbar />
        <Hero />
      </div>
    </main>
  );
}
