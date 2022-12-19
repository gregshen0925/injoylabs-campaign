import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const campaignRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const campaigns = await ctx.prisma.campaign.findMany();
    return campaigns;
  }),
  getOne: publicProcedure
    .input(z.object({ title: z.string() }))
    .query(async ({ input, ctx }) => {
      const campaign = await ctx.prisma.campaign.findUnique({
        where: {
          title: input.title,
        },
      });
      return campaign;
    }),
  updateCampaign: publicProcedure
    .input(z.object({ id: z.string(), title: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id, title } = input;
      const campaign = await ctx.prisma.campaign.update({
        where: {
          id,
        },
        data: {
          title,
        },
      });
      return campaign;
    }),
  addCampaign: publicProcedure
    .input(
      z.object({
        title: z.string(),
        host: z.string(),
        description: z.string(),
        time: z.string(),
        place: z.string(),
        presenter: z.string(),
        presentTitle: z.string(),
        image: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const campaign = await ctx.prisma.campaign.create({
        data: {
          title: input.title,
          host: input.host,
          description: input.description,
          time: input.time,
          place: input.place,
          presenter: input.presenter,
          presentTitle: input.presentTitle,
          image: input.image,
        },
      });
      return campaign;
    }),
  getParticipants: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const { id } = input;
      const getParticipants = await ctx.prisma.campaign.findMany({
        select: {
          participants: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        where: {
          id,
        },
      });
      return getParticipants;
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      const deleteCampaign = await ctx.prisma.campaign.delete({
        where: {
          id,
        },
      });
      return deleteCampaign;
    }),
});
