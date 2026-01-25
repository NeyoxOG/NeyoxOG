# Fia Hub OS

## Setup
- Static frontend in `index.html` and apps in separate HTML files (e.g. `luna.html`, `valentine.html`).
- Netlify Functions provide authenticated state + admin APIs under `/.netlify/functions/*`.

## Roles & Permissions
Roles are stored in `netlify/roles.json` and synced into Netlify Blob Storage on first request.

Default roles:
- `admin`: `*`
- `user`: `projects.manage`, `pets.manage`, `rewards.manage`, `state.read.own`, `state.write.own`
- `guest`: no permissions

### Permission list (examples)
- `users.read`, `users.update`, `users.disable`
- `roles.read`, `roles.create`, `roles.update`, `roles.delete`, `roles.assign`
- `state.read.any`, `state.write.any`, `state.reset.any`
- `rewards.manage`, `pets.manage`, `projects.manage`, `audit.read`, `*`

## Admin Console
Visible only to admins. Supports:
- User list, role changes, disable/enable
- Reset user state and rewards
- Role listing + creation
- Audit log

Security rules:
- `admin` role cannot be deleted.
- Last admin cannot be demoted or disabled.

## API Routes
### Auth
- `GET /.netlify/functions/me`

### State
- `GET /.netlify/functions/state-get?namespace=hub_profile`
- `POST /.netlify/functions/state-set` `{ namespace, data }`

### Admin
- `GET /.netlify/functions/admin-users`
- `POST /.netlify/functions/admin-users-set-role`
- `POST /.netlify/functions/admin-users-toggle-disable`
- `POST /.netlify/functions/admin-users-reset-state`
- `POST /.netlify/functions/admin-users-reset-rewards`
- `GET /.netlify/functions/admin-roles`
- `POST /.netlify/functions/admin-roles-create`
- `POST /.netlify/functions/admin-roles-update`
- `POST /.netlify/functions/admin-roles-delete`
- `GET /.netlify/functions/admin-audit-log`

## Notes
- Guest users see read-only previews and cannot persist data.
- Logged-in users persist data via server-side functions (Netlify Blob Storage).
- Roles can be edited in `netlify/roles.json` or via the Admin Console.

## Netlify Identity Setup
- Identity aktivieren und externe Provider konfigurieren.
- Google Provider aktivieren und die Site URL korrekt setzen.
- Optional: Email/Passwort Login im Netlify Dashboard deaktivieren oder im Widget ausblenden.
- Admin-Email in `index.html` ersetzen (`ADMIN_EMAIL = "DEINE_ADMIN_EMAIL"`).
