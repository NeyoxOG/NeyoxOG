const { requireAuth, requirePermission, logAdmin } = require("./_lib/auth");
const { getUsers, saveUsers } = require("./_lib/store");

exports.handler = async (event, context) => {
  const auth = await requireAuth(event, context);
  if (auth.statusCode) return auth;
  const permissionError = requirePermission(auth.permissions, "users.disable");
  if (permissionError) return permissionError;
  const body = JSON.parse(event.body || "{}");
  const { userId } = body;
  const users = await getUsers();
  const target = users.find((u) => u.id === userId);
  if (!target) return { statusCode: 404, body: JSON.stringify({ error: "User not found" }) };
  const adminCount = users.filter((u) => u.role === "admin" && !u.disabled).length;
  if (target.role === "admin" && !target.disabled && adminCount <= 1) {
    return { statusCode: 400, body: JSON.stringify({ error: "Cannot disable last admin" }) };
  }
  target.disabled = !target.disabled;
  await saveUsers(users);
  await logAdmin(auth.record.id, "users.toggle-disable", userId, { disabled: target.disabled });
  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
