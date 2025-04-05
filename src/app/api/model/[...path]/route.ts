import { getCurrentUser, getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { enhance } from "@zenstackhq/runtime";
import { NextRequestHandler } from "@zenstackhq/server/next";

export async function getPrisma() {
  const user = await getCurrentUser()
  console.log('user', user);
  return enhance(db, { user: user ?? undefined }, { logPrismaQuery: true })
}

const handler = NextRequestHandler({ getPrisma, useAppDir: true });

export {
  handler as DELETE,
  handler as GET,
  handler as PATCH,
  handler as POST,
  handler as PUT,
};
