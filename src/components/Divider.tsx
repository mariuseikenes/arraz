import { cn } from "@/lib/utils";

export function Divider({className}: {className?: string;}) {
    return <div className={cn(className, "h-0.5 w-full bg-linear-to-r from-transparent via-accent to-transparent")}></div>
}