INSERT INTO settings (key, value) VALUES ('company_name', 'FOUND.') ON CONFLICT (key) DO NOTHING;
INSERT INTO settings (key, value) VALUES ('tagline', 'Get found. Get chosen.') ON CONFLICT (key) DO NOTHING;
