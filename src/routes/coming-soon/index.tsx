import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/coming-soon/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/coming-soon" });
  return (
    <div className="bg-night-1 flex h-screen w-screen flex-col items-center justify-center gap-10">
      <h4 className="font-viga text-2xl text-white">Comming Soon!!</h4>
      <Button
        onClick={() => navigate({ to: "/" })}
        className="bg-night-1 hover:bg-night-3 border border-white text-white"
      >
        Back to Home
      </Button>
    </div>
  );
}
