import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { NewsArticle } from "@/models/NewsArticles";
import Head from "next/head";
import { FormEvent, use, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";

const SearchNewsPage = () => {
    const [ searchResults, setSearchResults ] = useState<NewsArticle[] | null>(null)
    const[ searchResultsLoading, setSearchResultsLoaidng] = useState(false)
    const[ searchReultsLoadingIsError, setSearchResultsLoaidngIsError] = useState(false)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const searchQuery = formData.get("searchQuery")?.toString().trim()

        if (searchQuery){
            try {
                setSearchResults(null)
                setSearchResultsLoaidngIsError(false)
                setSearchResultsLoaidng(true)
                const response = await fetch("/api/search-news?q=" + searchQuery)
                const articles: NewsArticle[] = await response.json()
                setSearchResults(articles)
            } catch (error) {
               console.error(error)
               setSearchResultsLoaidngIsError(true) 
            } finally {
                setSearchResultsLoaidng(false)
            }
        }
    }

    return ( 
        <>
        <Head>
            <title key = "title"> search news - Next js news app</title>
        </Head>
            <main>
                <h1>Search news</h1>
                <Alert>
                    this is a <strong>client side rendring</strong> so when refreshed its gone requests are handled through backend apis
                </Alert>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="search-input">
                        <Form.Label>Search Query</Form.Label>
                        <Form.Control 
                        name="searchQuery"
                        placeholder="E.g. polotics, sports, ......"
                        />
                    </Form.Group>
                    <Button type="submit" className="mb-3" disabled={searchResultsLoading}>
                        search
                    </Button>
                </Form>
                <div className="d-felx flex-column align-items-center">
                    {searchResultsLoading && <Spinner animation="border" />}
                    {searchReultsLoadingIsError && <p>something went wrong. please try again.</p>}
                    {searchResults?.length === 0 && <p>Nothing found Try agian</p>}
                    {searchResults && <NewsArticlesGrid articles={searchResults}/>}

                </div>
            </main>
        </>
     );
}
 
export default SearchNewsPage;