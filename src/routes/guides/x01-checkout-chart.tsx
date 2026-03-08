import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Printer } from "lucide-react";
import { FaLongArrowAltLeft } from "react-icons/fa";

export const Route = createFileRoute("/guides/x01-checkout-chart")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        name: "description",
        content:
          "Checkout chart for X01. Find the combos for checking out with double-out.",
      },
      {
        title: "X01 Checkout Chart",
      },
    ],
  }),
});
function SetupSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="flex items-center gap-3 text-2xl font-semibold mb-3">
        <Icon className="h-6 w-6 text-accent" />
        <span>{title}</span>
      </h2>
      <div className="space-y-4 text-gray-300 ml-9">{children}</div>
    </section>
  );
}

function printImage() {
  const src = (document.getElementById("chart") as HTMLImageElement).src;

  const printWindow = window.open("_", "_blank") as Window;
  printWindow.document.write(
    '<html><head moznomarginboxes mozdisallowselectionprint></head><body><img src="' +
      src +
      '" style="max-width: 100%; max-height: 100%;" /></body></html>',
  );
  printWindow.document.close();

  printWindow.onload = function () {
    printWindow.focus();
    printWindow.print();
  };
}

function RouteComponent() {
  return (
    <div className="min-h-screen bg-bg text-text p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <a href="/guides" aria-label="Back">
          <div className="p-2 border w-fit bg-white/10 rounded-md">
            <FaLongArrowAltLeft className="text-white" />
          </div>
        </a>
        <header className="text-center mt-4 mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold mb-2">
            X01 Checkout Chart
          </h1>
          <p className="text-gray-400">Learn the checkouts for X01.</p>
        </header>

        <main className="prose prose-invert prose-p:text-gray-300 prose-a:text-accent">
          <img
            src="/X01Checkouts.png"
            className="mb-8"
            id="chart"
            alt="Diagram showing the distances for setting up a dartboard."
          />
          <div className="flex flex-row gap-4 justify-center">
            <a href="/X01Checkouts.png">
              <Button variant={"link"} className="text-white border rounded">
                Open in new tab <ExternalLink />{" "}
              </Button>
            </a>
            <Button
              variant={"link"}
              onClick={printImage}
              className="text-white border rounded"
            >
              Print <Printer />{" "}
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
