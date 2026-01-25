const { getStore } = require("@netlify/blobs");
const { requireAuth, requirePermission, logAdmin } = require("./_lib/auth");
const { getUsers } = require("./_lib/store");

exports.handler = async (event, context) => {
  const auth = await requireAuth(event, context);
  if (auth.statusCode) return auth;
  const permissionError = requirePermission(auth.permissions, "roles.delete");
  if (permissionError) return permissionError;
  const body = JSON.parse(event.body || "{}");
  const { id } = body;
  if (!id) return { statusCode: 400, body: JSON.stringify({ error: "id required" }) };
  if (id === "admin") {
    return { statusCode: 400, body: JSON.stringify({ error: "Cannot delete admin role" }) };
  }
  const users = await getUsers();
  if (users.some((u) => u.role === id)) {
    return { statusCode: 400, body: JSON.stringify({ error: "Role in use" }) };
  }
  const store = getStore("roles");
  const payload = (await store.get("roles", { type: "json" })) || { roles: [] };
  payload.roles = payload.roles.filter((r) => r.id !== id);
  await store.set("roles", payload);
  await logAdmin(auth.record.id, "roles.delete", id, {});
  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
