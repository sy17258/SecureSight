-- SecureSight Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Create cameras table
CREATE TABLE IF NOT EXISTS cameras (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create incidents table
CREATE TABLE IF NOT EXISTS incidents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    camera_id UUID NOT NULL REFERENCES cameras(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL,
    ts_start TIMESTAMP WITH TIME ZONE NOT NULL,
    ts_end TIMESTAMP WITH TIME ZONE NOT NULL,
    thumbnail_url VARCHAR(500) NOT NULL,
    resolved BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create function to automatically update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_cameras_updated_at BEFORE UPDATE ON cameras
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_incidents_updated_at BEFORE UPDATE ON incidents
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_incidents_camera_id ON incidents(camera_id);
CREATE INDEX IF NOT EXISTS idx_incidents_resolved ON incidents(resolved);
CREATE INDEX IF NOT EXISTS idx_incidents_ts_start ON incidents(ts_start);
CREATE INDEX IF NOT EXISTS idx_incidents_type ON incidents(type);

-- Enable Row Level Security (RLS) - optional but recommended
ALTER TABLE cameras ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (you can restrict this later)
CREATE POLICY "Public access to cameras" ON cameras
    FOR ALL USING (true);

CREATE POLICY "Public access to incidents" ON incidents
    FOR ALL USING (true);
