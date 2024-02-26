import { TRPCError } from "@trpc/server";
import Replicate from "replicate";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export const replicateRouter = createTRPCRouter({
  createCustomVoice: protectedProcedure
    .input(
      z.object({
        youtubeUrl: z.string().url(),
        voiceName: z.string().min(2),
      }),
    )
    .mutation(
      async ({ ctx: { db, user }, input: { voiceName, youtubeUrl } }) => {
        try {
          // dataset
          const output = await replicate.run(
            "zsxkib/create-rvc-dataset:c445e27ff34574e92781c15c67db41835cedcdc27a19f527a7dcf37bd0ffe1ff",
            {
              input: {
                audio_name: voiceName,
                youtube_url: youtubeUrl,
              },
              webhook:
                "https://f335-2401-4900-1c1a-18cf-6dee-30b7-db19-e4b8.ngrok-free.app/api/replicate/custom-voice-dataset-webhook",
              webhook_events_filter: ["completed"], // optional
            },
          );
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "something went wrong with replicate!",
          });
        }
      },
    ),
});
