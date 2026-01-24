const { getRoles, getUsers, saveUsers, appendAudit } = require("./store");

const getRolePermissions = (roles, roleId) => {
  const role = roles.find((r) => r.id === roleId);
  return role ? role.permissions : [];
};

const hasPermission = (permissions, permission) => {
  if (permissions.includes("*")) return true;
  return permissions.includes(permission);
};

const ensureUserRecord = async (user) => {
  const users = await getUsers();
  let record = users.find((u) => u.id === user.sub || u.email === user.email);
  if (!record) {
    const seed = users.find((u) => u.email === user.email);
    record = {
      id: user.sub,
      email: user.email,
      role: seed?.role || "user",
      disabled: seed?.disabled || false,
      created_at: user.created_at || new Date().toISOString(),
      last_login: new Date().toISOString()
    };
    users.push(record);
  } else {
    record.last_login = new Date().toISOString();
  }
  await saveUsers(users);
  return record;
};

const requireAuth = async (event, context) => {
  const user = context.clientContext && context.clientContext.user;
  if (!user) {
    return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized" }) };
  }
  const roles = await getRoles();
  const record = await ensureUserRecord(user);
  if (record.disabled) {
    return { statusCode: 403, body: JSON.stringify({ error: "Account disabled" }) };
  }
  const permissions = getRolePermissions(roles, record.role);
  return { user, record, permissions, roles };
};

const requirePermission = (permissions, permission) => {
  if (!hasPermission(permissions, permission)) {
    return { statusCode: 403, body: JSON.stringify({ error: "Forbidden" }) };
  }
  return null;
};

const logAdmin = async (adminUserId, action, target, payload) => {
  await appendAudit({
    ts: Date.now(),
    adminUserId,
    action,
    target,
    payload
  });
};

module.exports = {
  requireAuth,
  requirePermission,
  hasPermission,
  logAdmin
};
