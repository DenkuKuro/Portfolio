import Link from "next/link";
import { sections } from "@/constants";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col h-screen justify-center">
        <div className="text-center h-60 text-9xl">
          <h1 className="">Javier Deng Xu</h1>
        </div>
        <nav className="flex flex-col items-center text-center">
          <ul>
            {sections.map((section) => (
              <li key={section.id} className="text-4xl">
                <Link href={`${section.id}`}>{section.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </div>
  );
}
