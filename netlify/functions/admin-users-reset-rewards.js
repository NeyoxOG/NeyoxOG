const { getStore } = require("@netlify/blobs");
const { requireAuth, requirePermission, logAdmin } = require("./_lib/auth");

exports.handler = async (event, context) => {
  const auth = await requireAuth(event, context);
  if (auth.statusCode) return auth;
  const permissionError = requirePermission(auth.permissions, "rewards.manage");
  if (permissionError) return permissionError;
  const body = JSON.parse(event.body || "{}");
  const { userId } = body;
  if (!userId) return { statusCode: 400, body: JSON.stringify({ error: "userId required" }) };
  await getStore("hub_rewards").delete(userId);
  await logAdmin(auth.record.id, "users.reset-rewards", userId, {});
  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
