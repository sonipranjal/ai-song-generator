import crypto from "crypto";
import type { NextRequest } from "next/server";
import Replicate from "replicate";

import { db, eq, generatedSongs, voices } from "@ai-song-generator/db";

import { env } from "~/env";

function setCorsHeaders(res: Response) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Request-Method", "*");
  res.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.headers.set("Access-Control-Allow-Headers", "*");
}

export function OPTIONS() {
  const response = new Response(null, {
    status: 204,
  });
  setCorsHeaders(response);
  return response;
}

const replicate = new Replicate({
  auth: env.REPLICATE_API_TOKEN,
});

const songGenerationFinished = async (req: NextRequest) => {
  const rawBody = await req.text();

  // verify this request if this is coming from replicate, if it is not, send forbidden access code
  const webhook_id = req.headers.get("Webhook-Id");
  const webhook_timestamp = req.headers.get("Webhook-Timestamp");
  const webhook_signatures_from_replicate =
    req.headers.get("webhook-signature");

  const signedContent = `${webhook_id}.${webhook_timestamp}.${rawBody}`;

  const secretFromReplicate = await replicate.webhooks.default.secret.get();

  const secret = secretFromReplicate.key;

  if (!secret) {
    return Response.json(
      { message: "replicate server is not responding!" },
      {
        status: 400,
      },
    );
  }

  // Base64 decode the secret
  const secretBytes = Buffer.from(secret.split("_")[1]!, "base64");
  const signature = crypto
    .createHmac("sha256", secretBytes)
    .update(signedContent)
    .digest("base64");

  const expectedSignatures = webhook_signatures_from_replicate
    ?.split(" ")
    .map((sig) => sig.split(",")[1]);

  const isValid = expectedSignatures?.some(
    (expectedSignature) => expectedSignature === signature,
  );

  if (!isValid) {
    return Response.json(
      { message: "signatures don't match!" },
      {
        status: 403,
      },
    );
  }

  const { searchParams } = new URL(req.url);
  const songId = searchParams.get("songId");

  const parsedBody = JSON.parse(rawBody);

  if (!songId) {
    return Response.json(
      { message: "you must specify songId in webhook query param" },
      {
        status: 400,
      },
    );
  }

  console.log(parsedBody.output, songId);

  if (!parsedBody?.output) {
    return Response.json(
      { message: "output zip file not found!" },
      {
        status: 400,
      },
    );
  }

  await db
    .update(generatedSongs)
    .set({
      audioUrl: parsedBody?.output,
    })
    .where(eq(generatedSongs.id, songId));

  return Response.json({ message: "success" });
};

export { songGenerationFinished as POST };
