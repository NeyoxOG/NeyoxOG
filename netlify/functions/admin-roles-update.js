const { getStore } = require("@netlify/blobs");
const { requireAuth, requirePermission, logAdmin } = require("./_lib/auth");

exports.handler = async (event, context) => {
  const auth = await requireAuth(event, context);
  if (auth.statusCode) return auth;
  const permissionError = requirePermission(auth.permissions, "roles.update");
  if (permissionError) return permissionError;
  const body = JSON.parse(event.body || "{}");
  const { id, label, permissions, priority } = body;
  if (!id) return { statusCode: 400, body: JSON.stringify({ error: "id required" }) };
  const store = getStore("roles");
  const payload = (await store.get("roles", { type: "json" })) || { roles: [] };
  const role = payload.roles.find((r) => r.id === id);
  if (!role) return { statusCode: 404, body: JSON.stringify({ error: "Role not found" }) };
  role.label = label ?? role.label;
  role.permissions = permissions ?? role.permissions;
  role.priority = priority ?? role.priority;
  await store.set("roles", payload);
  await logAdmin(auth.record.id, "roles.update", id, { permissions: role.permissions });
  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
