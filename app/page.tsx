import { Solver } from "@/components/solver";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Solver />
      <div className="inline-block max-w-6xl text-center justify-center"></div>
    </section>
  );
}
