import { Navbar } from "@/components/Shared/Navbar";
import { MisListasClient } from "./components/MisListasClient";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function MisListasPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/login");
  }

  const usersNetflix = await db.userNetflix.findMany({
    where: { userId: session.user.id },
  });

  const perfilId = cookies().get("perfilId")?.value;

  if (!perfilId) {
    return redirect("/profiles");
  }

  return (
    <>
      <Navbar users={usersNetflix} />
      <MisListasClient perfilId={perfilId} />
    </>
  );
}
