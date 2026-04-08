import { Divider } from "@/components/Divider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FaLongArrowAltLeft } from "react-icons/fa";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Your Profile | Arraz",
      },
    ],
  }),
});

function RouteComponent() {
  const { user, loading } = useAuth();
  const nav = useNavigate();

  if (!user && !loading) {
    return nav({
      to: "/login",
    });
  } else if (!user) {
    return "loading";
  }
  const joinDate = new Date(user.created_at);

  return (
    <div className="min-h-screen bg-bg text-text p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <a href="/" className="" aria-label="Back">
          <div className="p-2 border w-fit bg-white/10 rounded-md">
            <FaLongArrowAltLeft className="text-white" />
          </div>
        </a>
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Your Profile</h1>
          <p className="text-lg text-gray-300">Logged in as {user.name}</p>
          <p className="text-lg text-gray-300">
            Member since {joinDate.getDate()}/{joinDate.getMonth() + 1}/
            {joinDate.getFullYear()}
          </p>
        </header>
        <main className="flex flex-col gap-4">
          <section>
            
          </section>
          <Divider />
          <section className="w-full flex items-center justify-center">
            <Dialog>
              <DialogTrigger>
                <Button variant={"destructive"}>Delete Account</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                <DialogDescription>
                  This action is not reversible.
                </DialogDescription>
                <DialogFooter className="flex flex-row gap-2">
                  <Button variant={"ghost"} className="grow border border-accent">
                    Cancel
                  </Button>
                  <Button variant={"destructive"} className="grow" onClick={()=>{
                    api.deleteProfile()
                  }}>
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </section>
        </main>
      </div>
    </div>
  );
}
