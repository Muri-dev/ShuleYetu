import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/authorization";
import { PortalShell } from "@/components/portal/portal-shell";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return <PortalShell user={user}>{children}</PortalShell>;
}
