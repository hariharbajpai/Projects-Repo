/*
  # Create gallery photos table

  1. New Tables
    - `gallery_photos`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `created_at` (timestamptz)
      - `created_by` (uuid, references auth.users)

  2. Security
    - Enable RLS on `gallery_photos` table
    - Add policy for public to read photos
    - Add policy for admins to insert/delete photos
*/

CREATE TABLE IF NOT EXISTS gallery_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users NOT NULL
);

ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gallery photos"
  ON gallery_photos
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Only admins can insert photos"
  ON gallery_photos
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM admins 
    WHERE user_id = auth.uid()
  ));

CREATE POLICY "Only admins can delete photos"
  ON gallery_photos
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admins 
    WHERE user_id = auth.uid()
  ));