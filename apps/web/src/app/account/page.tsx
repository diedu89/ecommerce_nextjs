import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";
import { PreloadQuery } from "@/lib/client";
import { meQuery } from "@/lib/queries/meQuery";
import Account from "../../components/account/Account";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <PreloadQuery query={meQuery}>
      <Account />
    </PreloadQuery>
  );
}
