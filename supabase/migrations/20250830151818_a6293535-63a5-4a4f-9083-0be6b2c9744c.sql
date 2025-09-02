-- Add gallery_images column to treks table
ALTER TABLE treks ADD COLUMN gallery_images TEXT[] DEFAULT ARRAY[]::TEXT[];