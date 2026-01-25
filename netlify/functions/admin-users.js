const { requireAuth, requirePermission } = require("./_lib/auth");
const { getUsers } = require("./_lib/store");

exports.handler = async (event, context) => {
  const auth = await requireAuth(event, context);
  if (auth.statusCode) return auth;
  const permissionError = requirePermission(auth.permissions, "users.read");
  if (permissionError) return permissionError;
  const users = await getUsers();
  return { statusCode: 200, body: JSON.stringify({ users }) };
};
