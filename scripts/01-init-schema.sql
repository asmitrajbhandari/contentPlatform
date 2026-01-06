-- Create users table with additional agency info
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  agency_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  media_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create platform connections table (for tracking which platforms are enabled for distribution)
CREATE TABLE IF NOT EXISTS platform_connections (
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  platform_name TEXT NOT NULL, -- 'twitter', 'facebook', 'instagram', 'x'
  is_connected BOOLEAN DEFAULT FALSE,
  access_token TEXT,
  refresh_token TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, platform_name)
);

-- Create post distributions table (tracks where posts are published)
CREATE TABLE IF NOT EXISTS post_distributions (
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  platform_name TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  platform_post_id TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'published', 'failed'
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_distributions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Allow users to view their own data" ON users
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Allow users to update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Allow users to insert their own data" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for posts table
CREATE POLICY "Allow users to view their own posts" ON posts
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow users to create their own posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow users to update their own posts" ON posts
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow users to delete their own posts" ON posts
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for platform_connections table
CREATE POLICY "Allow users to view their own connections" ON platform_connections
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow users to manage their own connections" ON platform_connections
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow users to update their own connections" ON platform_connections
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow users to delete their own connections" ON platform_connections
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for post_distributions table
CREATE POLICY "Allow users to view distributions of their posts" ON post_distributions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM posts WHERE posts.id = post_distributions.post_id AND posts.user_id = auth.uid()
    )
  );
CREATE POLICY "Allow users to create distributions for their posts" ON post_distributions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM posts WHERE posts.id = post_id AND posts.user_id = auth.uid()
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_platform_connections_user_id ON platform_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_post_distributions_post_id ON post_distributions(post_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
