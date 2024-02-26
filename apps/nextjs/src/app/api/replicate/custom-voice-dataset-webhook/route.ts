import type { NextRequest } from "next/server";
import Replicate from "replicate";

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

const customVoiceWebhookHandler = async (req: NextRequest) => {
  const json = await req.json();

  console.log(json);

  // we got the data
  if (!json?.output) {
    return Response.json({ message: "output zip file not found!" });
  }

  await replicate.run(
    "replicate/train-rvc-model:0397d5e28c9b54665e1e5d29d5cf4f722a7b89ec20e9dbf31487235305b1a101",
    {
      input: {
        epoch: 80,
        version: "v2",
        f0method: "rmvpe_gpu",
        batch_size: "7",
        dataset_zip: json.output,
        sample_rate: "48k",
      },
      webhook:
        "https://f335-2401-4900-1c1a-18cf-6dee-30b7-db19-e4b8.ngrok-free.app/api/replicate/model-training-finished",
      webhook_events_filter: ["completed"],
    },
  );

  return Response.json({ hello: "world" });
};

export { customVoiceWebhookHandler as POST };
