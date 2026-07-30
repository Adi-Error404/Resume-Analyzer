import { DashboardView } from "@/components/dashboard/DashboardView";

export default function DashboardPage() {
  return (
    <div className="min-h-screen py-10 bg-muted/20">
      <div className="container px-4 md:px-6">
        <DashboardView />
      </div>
    </div>
  );
}
