-- Migration 002: Add status column to enquiries table with default 'Pending'
ALTER TABLE enquiries
ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'Pending';
