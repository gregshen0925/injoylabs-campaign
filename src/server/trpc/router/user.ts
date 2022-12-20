import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const userRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  changeName: publicProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id, name } = input;
      const newName = await ctx.prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
      return newName;
    }),
  getUserInfo: publicProcedure
    .input(z.object({ address: z.string() }))
    .query(async ({ input, ctx }) => {
      const userInfo = await ctx.prisma.user.findUnique({
        where: {
          address: input.address,
        },
      });
      return userInfo;
    }),
  addUser: publicProcedure
    .input(z.object({ id: z.string(), approved: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      const { id, approved } = input;
      const add = await ctx.prisma.user.update({
        where: {
          id,
        },
        data: {
          approved,
        },
      });
      return add;
    }),
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        address: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name, address, description } = input;
      const add = await ctx.prisma.user.create({
        data: {
          name,
          address,
          description,
        },
      });
      return add;
    }),
  participate: publicProcedure
    .input(z.object({ id: z.string(), campaignId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id, campaignId } = input;
      await ctx.prisma.user.update({
        where: {
          id,
        },
        select: {
          id: true,
          campaigns: true,
        },
        data: {
          campaigns: {
            connect: {
              id: campaignId,
            },
          },
        },
      });
      return true;
    }),
  unparticipate: publicProcedure
    .input(z.object({ id: z.string(), campaignId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id, campaignId } = input;
      await ctx.prisma.user.update({
        where: {
          id,
        },
        select: {
          id: true,
          campaigns: true,
        },
        data: {
          campaigns: {
            disconnect: {
              id: campaignId,
            },
          },
        },
      });
    }),
});
