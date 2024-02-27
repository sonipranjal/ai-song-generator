import { TRPCError } from "@trpc/server";
import Replicate from "replicate";
import slugify from "slugify";
import ytdl from "ytdl-core";
import { z } from "zod";

import { voices } from "@ai-song-generator/db";

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
          const [newVoice] = await db
            .insert(voices)
            .values({
              userId: user.id,
              name: voiceName,
            })
            .returning({ voiceId: voices.id });

          await replicate.predictions.create({
            version:
              "c445e27ff34574e92781c15c67db41835cedcdc27a19f527a7dcf37bd0ffe1ff",
            input: {
              audio_name: slugify(voiceName),
              youtube_url: youtubeUrl,
            },
            webhook: `${process.env.REPLICATE_WEBHOOK_URL}/api/replicate/custom-voice-dataset-webhook?voiceId=${newVoice?.voiceId}`,
            webhook_events_filter: ["completed"],
          });
        } catch (error) {
          console.log(error);

          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "something went wrong with replicate!",
          });
        }
      },
    ),
});
