const { getStore } = require("@netlify/blobs");
const { requireAuth, requirePermission, logAdmin } = require("./_lib/auth");

exports.handler = async (event, context) => {
  const auth = await requireAuth(event, context);
  if (auth.statusCode) return auth;
  const permissionError = requirePermission(auth.permissions, "roles.create");
  if (permissionError) return permissionError;
  const body = JSON.parse(event.body || "{}");
  const { id, label, permissions = [], priority = 10 } = body;
  if (!id) return { statusCode: 400, body: JSON.stringify({ error: "id required" }) };
  const store = getStore("roles");
  const payload = (await store.get("roles", { type: "json" })) || { roles: [] };
  if (payload.roles.find((r) => r.id === id)) {
    return { statusCode: 400, body: JSON.stringify({ error: "Role exists" }) };
  }
  payload.roles.push({ id, label: label || id, permissions, priority });
  await store.set("roles", payload);
  await logAdmin(auth.record.id, "roles.create", id, { permissions });
  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
