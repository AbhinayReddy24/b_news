import Image from 'next/image'
import { Inter, News_Cycle } from 'next/font/google'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { NewsArticle, NewsResponse } from '@/models/NewsArticles'
import NewsArticleEntry from '@/components/NewsArticleEntry'
import NewsArticlesGrid from '@/components/NewsArticlesGrid'
import { Alert } from 'react-bootstrap'

interface BreakingNewsPageProps {
  newsArticles : NewsArticle[],
}

export const getServerSideProps: GetServerSideProps<BreakingNewsPageProps> = async () => {
  const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=" + process.env.NEWS_API_KEY)
  const newsResponse : NewsResponse = await response.json()

  return {
    props: {newsArticles: newsResponse.articles}
  }
}

export default function BreakingNewsPage({newsArticles} : BreakingNewsPageProps) {
  return (
    <>
      <Head>
        <title key = "title"> Breaking news page</title>
      </Head>
      <main>
        <h1>Breaking News</h1>
        <Alert>
          this pages uses <strong>get serversideprops</strong> to fetch data serverside
        </Alert>
        <NewsArticlesGrid articles={newsArticles} />
      </main>
    </>
  )
}
