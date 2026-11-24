CREATE TABLE teachers (
  id TEXT PRIMARY KEY NOT NULL,
  email TEXT NOT NULL COLLATE NOCASE UNIQUE,
  password_hash TEXT NOT NULL,
  created_at_ms INTEGER NOT NULL,
  updated_at_ms INTEGER NOT NULL,
  disabled_at_ms INTEGER,
  CHECK (length(id) BETWEEN 1 AND 128),
  CHECK (length(email) BETWEEN 3 AND 254)
) STRICT;

CREATE TABLE invitations (
  id TEXT PRIMARY KEY NOT NULL,
  code_hash TEXT NOT NULL UNIQUE,
  created_by_teacher_id TEXT REFERENCES teachers(id) ON DELETE SET NULL,
  created_at_ms INTEGER NOT NULL,
  expires_at_ms INTEGER NOT NULL,
  consumed_at_ms INTEGER,
  revoked_at_ms INTEGER,
  CHECK (length(code_hash) = 64 AND code_hash NOT GLOB '*[^0-9a-f]*'),
  CHECK (expires_at_ms > created_at_ms)
) STRICT;

CREATE INDEX invitations_available_idx
  ON invitations (expires_at_ms)
  WHERE consumed_at_ms IS NULL AND revoked_at_ms IS NULL;

CREATE TABLE sessions (
  id TEXT PRIMARY KEY NOT NULL,
  teacher_id TEXT NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  created_at_ms INTEGER NOT NULL,
  expires_at_ms INTEGER NOT NULL,
  revoked_at_ms INTEGER,
  CHECK (length(token_hash) = 64 AND token_hash NOT GLOB '*[^0-9a-f]*'),
  CHECK (expires_at_ms > created_at_ms)
) STRICT;

CREATE INDEX sessions_teacher_active_idx
  ON sessions (teacher_id, expires_at_ms)
  WHERE revoked_at_ms IS NULL;

CREATE TABLE login_rate_limits (
  subject_hash TEXT PRIMARY KEY NOT NULL,
  window_started_at_ms INTEGER NOT NULL,
  failed_attempts INTEGER NOT NULL DEFAULT 0 CHECK (failed_attempts >= 0),
  locked_until_ms INTEGER,
  updated_at_ms INTEGER NOT NULL,
  CHECK (length(subject_hash) = 64 AND subject_hash NOT GLOB '*[^0-9a-f]*')
) STRICT;
