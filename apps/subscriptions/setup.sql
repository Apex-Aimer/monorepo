DROP TABLE IF EXISTS Subscriptions;
CREATE TABLE IF NOT EXISTS Subscriptions (
    id TEXT PRIMARY KEY,
    created_at INTEGER,
    starts_at INTEGER,
    ends_at INTEGER,
    product TEXT
);
