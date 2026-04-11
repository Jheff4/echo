import { ConvexError, v } from "convex/values";
import { internalMutation, internalQuery } from "../_generated/server";

async function updateConversationStatusByThreadId(ctx: any, threadId: string, status: string) {
  const conversation = await ctx.db
    .query("conversations")
    .withIndex("by_thread_id", (q: any) => q.eq("threadId", threadId))
    .unique();

  if (!conversation) {
    throw new ConvexError({
      code: "NOT_FOUND",
      message: "Conversation not found",
    });
  }

  await ctx.db.patch(conversation._id, { status });
}

export const escalate = internalMutation({
  args: {
    threadId: v.string(),
  },
  handler: async (ctx, args) => {
    await updateConversationStatusByThreadId(ctx, args.threadId, "escalated");
  },
});

export const resolve = internalMutation({
  args: {
    threadId: v.string(),
  },
  handler: async (ctx, args) => {
    await updateConversationStatusByThreadId(ctx, args.threadId, "resolved");
  },
});

export const getByThreadId = internalQuery({
  args: {
    threadId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("conversations")
      .withIndex("by_thread_id", (q: any) => q.eq("threadId", args.threadId))
      .unique();
  },
});