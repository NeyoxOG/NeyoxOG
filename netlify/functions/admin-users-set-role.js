const { requireAuth, requirePermission, logAdmin } = require("./_lib/auth");
const { getUsers, saveUsers } = require("./_lib/store");

exports.handler = async (event, context) => {
  const auth = await requireAuth(event, context);
  if (auth.statusCode) return auth;
  const permissionError = requirePermission(auth.permissions, "roles.assign");
  if (permissionError) return permissionError;
  const body = JSON.parse(event.body || "{}");
  const { userId, role } = body;
  if (!userId || !role) {
    return { statusCode: 400, body: JSON.stringify({ error: "userId and role required" }) };
  }
  const users = await getUsers();
  const target = users.find((u) => u.id === userId);
  if (!target) return { statusCode: 404, body: JSON.stringify({ error: "User not found" }) };
  const adminCount = users.filter((u) => u.role === "admin" && !u.disabled).length;
  if (target.role === "admin" && role !== "admin" && adminCount <= 1) {
    return { statusCode: 400, body: JSON.stringify({ error: "Cannot remove last admin" }) };
  }
  target.role = role;
  await saveUsers(users);
  await logAdmin(auth.record.id, "users.set-role", userId, { role });
  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
