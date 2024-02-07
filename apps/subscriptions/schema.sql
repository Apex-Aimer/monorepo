DROP TABLE IF EXISTS Subscriptions;
CREATE TABLE IF NOT EXISTS Subscriptions (
    id TEXT PRIMARY KEY,
    created_at TEXT,
    starts_at TEXT,
    ends_at TEXT,
    product TEXT
);
