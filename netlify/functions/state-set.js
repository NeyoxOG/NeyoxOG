const { getStore } = require("@netlify/blobs");
const { requireAuth, hasPermission } = require("./_lib/auth");

exports.handler = async (event, context) => {
  const auth = await requireAuth(event, context);
  if (auth.statusCode) return auth;
  const body = JSON.parse(event.body || "{}");
  const { namespace, data } = body;
  if (!namespace) {
    return { statusCode: 400, body: JSON.stringify({ error: "namespace required" }) };
  }
  const { record, permissions } = auth;
  if (!hasPermission(permissions, "state.write.any") && !permissions.includes("state.write.own")) {
    return { statusCode: 403, body: JSON.stringify({ error: "Forbidden" }) };
  }
  const store = getStore(namespace);
  await store.set(record.id, data || null);
  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
