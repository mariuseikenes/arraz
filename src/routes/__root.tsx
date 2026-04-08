import { HeadContent, Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { Databuddy } from "@databuddy/sdk/react";

import Header from "../components/Header";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { QueryClient } from "@tanstack/react-query";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <TooltipProvider>
        <HeadContent />
        <Databuddy clientId="81e39087-196e-4f11-966b-f7f07b677129" />
        <Header />
        <Outlet />
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      </TooltipProvider>
    </>
  ),
});
