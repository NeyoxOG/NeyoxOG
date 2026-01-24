const { getStore } = require("@netlify/blobs");
const { requireAuth, requirePermission, logAdmin } = require("./_lib/auth");

const namespaces = ["hub_profile", "hub_state", "hub_rewards", "pets", "projects"];

exports.handler = async (event, context) => {
  const auth = await requireAuth(event, context);
  if (auth.statusCode) return auth;
  const permissionError = requirePermission(auth.permissions, "state.reset.any");
  if (permissionError) return permissionError;
  const body = JSON.parse(event.body || "{}");
  const { userId } = body;
  if (!userId) return { statusCode: 400, body: JSON.stringify({ error: "userId required" }) };
  await Promise.all(namespaces.map((ns) => getStore(ns).delete(userId)));
  await logAdmin(auth.record.id, "users.reset-state", userId, { namespaces });
  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
