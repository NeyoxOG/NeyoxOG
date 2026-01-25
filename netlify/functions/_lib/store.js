const { getStore } = require("@netlify/blobs");
const fs = require("fs");
const path = require("path");

const readSeed = (file) => {
  try {
    const full = path.join(process.cwd(), "netlify", file);
    return JSON.parse(fs.readFileSync(full, "utf8"));
  } catch (err) {
    return null;
  }
};

const getRoles = async () => {
  const store = getStore("roles");
  let roles = await store.get("roles", { type: "json" });
  if (!roles) {
    roles = readSeed("roles.json") || { roles: [] };
    await store.set("roles", roles);
  }
  return roles.roles || [];
};

const getUsers = async () => {
  const store = getStore("users");
  let users = await store.get("users", { type: "json" });
  if (!users) {
    users = readSeed("users.json") || { users: [] };
    await store.set("users", users);
  }
  return users.users || [];
};

const saveUsers = async (list) => {
  const store = getStore("users");
  await store.set("users", { users: list });
};

const appendAudit = async (entry) => {
  const store = getStore("audit_logs");
  const existing = (await store.get("logs", { type: "json" })) || [];
  existing.push(entry);
  await store.set("logs", existing.slice(-500));
};

module.exports = {
  getStore,
  getRoles,
  getUsers,
  saveUsers,
  appendAudit
};
