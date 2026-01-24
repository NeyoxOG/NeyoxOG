const { getStore } = require("@netlify/blobs");
const { requireAuth, requirePermission } = require("./_lib/auth");

exports.handler = async (event, context) => {
  const auth = await requireAuth(event, context);
  if (auth.statusCode) return auth;
  const permissionError = requirePermission(auth.permissions, "audit.read");
  if (permissionError) return permissionError;
  const store = getStore("audit_logs");
  const logs = (await store.get("logs", { type: "json" })) || [];
  return { statusCode: 200, body: JSON.stringify({ logs }) };
};
