import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { Databuddy } from '@databuddy/sdk/react';

import Header from "../components/Header";

export const Route = createRootRoute({
  component: () => (
    <>
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
    </>
  ),
});
