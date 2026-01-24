const { requireAuth, requirePermission } = require("./_lib/auth");
const { getRoles } = require("./_lib/store");

exports.handler = async (event, context) => {
  const auth = await requireAuth(event, context);
  if (auth.statusCode) return auth;
  const permissionError = requirePermission(auth.permissions, "roles.read");
  if (permissionError) return permissionError;
  const roles = await getRoles();
  return { statusCode: 200, body: JSON.stringify({ roles }) };
};
