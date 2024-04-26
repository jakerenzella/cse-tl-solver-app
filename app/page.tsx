import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { Solver } from "@/components/solver";
import { CsvViewer } from "@/components/csv-viewer";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Solver />
      <div className="inline-block max-w-6xl text-center justify-center"></div>

      <div className="flex gap-3">
        <Link
          isExternal
          href={siteConfig.links.docs}
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
        >
          Allocate
        </Link>
      </div>
    </section>
  );
}
