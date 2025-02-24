/*
  # Create players table and security policies

  1. New Tables
    - `players`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `phone` (text)
      - `email` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `players` table
    - Add policies for authenticated users to read their own profile
*/

CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id),
  UNIQUE(email)
);

ALTER TABLE players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON players
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON players
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);