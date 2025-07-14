import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity.client';
import { blogPostsQuery } from '@/lib/sanity.queries';
import { urlForImage } from '@/lib/sanity.image';
import { BlogPost } from '@/types/sanity';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sumanrajsharma.com';
const SITE_NAME = 'Suman Raj Sharma';
const SITE_DESCRIPTION = 'Software Developer, Tech Enthusiast, and Blogger';

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    return await client.fetch(blogPostsQuery);
  } catch (error) {
    console.error('Error fetching blog posts for RSS:', error);
    return [];
  }
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(date: string): string {
  return new Date(date).toUTCString();
}

export async function GET() {
  try {
    const posts = await getBlogPosts();
    
    const rssItems = posts
      .slice(0, 20) // Limit to 20 most recent posts
      .map((post) => {
        const postUrl = `${SITE_URL}/blog/${post.slug.current}`;
        const imageUrl = post.coverImage ? urlForImage(post.coverImage)?.url() : null;
        
        return `
      <item>
        <title><![CDATA[${escapeXml(post.title)}]]></title>
        <description><![CDATA[${escapeXml(post.metaDescription || '')}]]></description>
        <link>${postUrl}</link>
        <guid>${postUrl}</guid>
        <pubDate>${formatDate(post.publishedAt)}</pubDate>
        ${post.author ? `<author>noreply@${SITE_URL.replace('https://', '').replace('http://', '')} (${escapeXml(post.author.name)})</author>` : ''}
        ${imageUrl ? `<enclosure url="${imageUrl}" type="image/jpeg" />` : ''}
        ${post.tags ? post.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('') : ''}
      </item>`;
      })
      .join('');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} - Blog</title>
    <description>${SITE_DESCRIPTION}</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${formatDate(new Date().toISOString())}</lastBuildDate>
    <generator>Next.js</generator>
    <webMaster>noreply@${SITE_URL.replace('https://', '').replace('http://', '')} (${SITE_NAME})</webMaster>
    <managingEditor>noreply@${SITE_URL.replace('https://', '').replace('http://', '')} (${SITE_NAME})</managingEditor>
    <image>
      <url>${SITE_URL}/favicon.ico</url>
      <title>${SITE_NAME}</title>
      <link>${SITE_URL}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}