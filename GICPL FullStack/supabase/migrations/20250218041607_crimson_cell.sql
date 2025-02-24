/*
  # Create live scores table

  1. New Tables
    - `live_scores`
      - `id` (uuid, primary key)
      - `score` (integer)
      - `wickets` (integer)
      - `overs` (integer)
      - `balls` (integer)
      - `batting_team` (text)
      - `bowling_team` (text)
      - `striker` (jsonb)
      - `non_striker` (jsonb)
      - `current_bowler` (jsonb)
      - `last_six_balls` (text[])
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `live_scores` table
    - Add policy for authenticated admins to update scores
    - Add policy for public to read scores
*/

CREATE TABLE IF NOT EXISTS live_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  score integer DEFAULT 0,
  wickets integer DEFAULT 0,
  overs integer DEFAULT 0,
  balls integer DEFAULT 0,
  batting_team text,
  bowling_team text,
  striker jsonb,
  non_striker jsonb,
  current_bowler jsonb,
  last_six_balls text[] DEFAULT ARRAY[]::text[],
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE live_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read live scores"
  ON live_scores
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Only admins can update live scores"
  ON live_scores
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admins 
    WHERE user_id = auth.uid()
  ));

CREATE POLICY "Only admins can insert live scores"
  ON live_scores
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM admins 
    WHERE user_id = auth.uid()
  ));