# Splash Bros Website — Setup Guide

## 1. GitHub Authentication

Install GitHub CLI and authenticate:
- Download from https://cli.github.com
- Run `gh auth login` in your terminal and follow the prompts
- Then push the code:
  ```
  cd C:\Users\bcnin\OneDrive\Documents\github\splashbros
  git push -u origin main
  ```

Or use a Personal Access Token:
- Go to https://github.com/settings/tokens → Generate new token (classic)
- Give it `repo` scope
- Run:
  ```
  git remote set-url origin https://YOUR_TOKEN@github.com/splashbrosnv/Website.git
  git push -u origin main
  ```

## 2. Add Your Logo

Save your Splash Bros logo as:
```
public/logo.png
```

## 3. Add Hero Video

Add your North Vancouver drone footage as:
```
public/hero-video.mp4
```

Optionally add a poster/fallback image as:
```
public/hero-poster.jpg
```

## 4. Supabase Setup

1. Go to https://supabase.com and create a new project
2. In the SQL Editor, run this to create the contact form table:

```sql
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT NOT NULL,
  address TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow inserts from the public (anon) key
CREATE POLICY "Allow public inserts" ON contact_submissions
  FOR INSERT WITH CHECK (true);
```

3. Go to Project Settings → API and copy:
   - Project URL
   - anon/public key

4. Update `.env.local` in the project root:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 5. Vercel Deployment

1. Go to https://vercel.com/signup and sign up with your GitHub account
2. Click "Import Project" and select the `splashbrosnv/Website` repo
3. Add the same environment variables from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click Deploy

## 6. Connect Your Domain

1. In Vercel → Project Settings → Domains
2. Add `splashbrothers.ca`
3. Vercel will give you DNS records to set at your domain registrar
4. Update your domain's DNS:
   - A record: `76.76.21.21`
   - Or CNAME: `cname.vercel-dns.com`
5. Wait for DNS propagation (can take up to 48 hours, usually minutes)

## Local Development

```
npm run dev
```

Then open http://localhost:3000
