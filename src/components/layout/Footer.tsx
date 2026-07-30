export function Footer() {
  return (
    <footer className="border-t border-border/40 py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with Next.js & Tailwind CSS. Powered by AI.
        </p>
      </div>
    </footer>
  );
}
