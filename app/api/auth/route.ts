import { nylas, nylasConfig } from "@/app/lib/nylas";
import { redirect } from "next/navigation";

export async function GET() {
  const authUrl = nylas.auth.urlForOAuth2({
    clientId: nylasConfig.clientID,
    redirectUri: nylasConfig.redirectUri,
  });

  return redirect(authUrl);
}
