const { requireAuth } = require("./_lib/auth");

exports.handler = async (event, context) => {
  const auth = await requireAuth(event, context);
  if (auth.statusCode) return auth;
  const { user, record, permissions } = auth;
  return {
    statusCode: 200,
    body: JSON.stringify({
      user: {
        id: record.id,
        email: record.email,
        user_metadata: user.user_metadata || {},
        created_at: record.created_at,
        last_login: record.last_login
      },
      role: record.role,
      permissions
    })
  };
};
