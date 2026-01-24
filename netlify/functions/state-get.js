const { getStore } = require("@netlify/blobs");
const { requireAuth, hasPermission } = require("./_lib/auth");

exports.handler = async (event, context) => {
  const auth = await requireAuth(event, context);
  if (auth.statusCode) return auth;
  const namespace = new URLSearchParams(event.queryStringParameters || event.queryString || "").get("namespace");
  if (!namespace) {
    return { statusCode: 400, body: JSON.stringify({ error: "namespace required" }) };
  }
  const { record, permissions } = auth;
  if (!hasPermission(permissions, "state.read.any") && !permissions.includes("state.read.own")) {
    return { statusCode: 403, body: JSON.stringify({ error: "Forbidden" }) };
  }
  const store = getStore(namespace);
  const data = await store.get(record.id, { type: "json" });
  return {
    statusCode: 200,
    body: JSON.stringify({ namespace, data })
  };
};
