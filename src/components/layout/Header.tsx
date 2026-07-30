import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BrainCircuit } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl tracking-tight hidden sm:inline-block">
            AI Resume Analyzer
          </span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/upload">
            <Button variant="default" className="shadow-lg shadow-primary/20">
              Analyze Resume
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
