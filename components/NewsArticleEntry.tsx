import { NewsArticle } from "@/models/NewsArticles";
import Image from "next/image";
import { Card } from "react-bootstrap";
import palceHolderImage from "@/assets/images/fall guy.png"
import styles from "@/styles/NewsArticlesEntry.module.css"

interface NewsArticleEntryProps {
    article: NewsArticle,
}

const NewsArticleEntry = ({article : {title, description, url, urlToImage}}: NewsArticleEntryProps) => {
    
    const validImageUrl = (urlToImage?.startsWith("http://") || urlToImage?.startsWith("https://")) ? urlToImage : null
    
    return ( 
        <a href="url">
            <Card className="h-100">
                <Image src={validImageUrl || palceHolderImage}
                width={500}
                height={200}
                alt="news article image"
                className={`card-img-top ${styles.image}`}
                />

                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                </Card.Body>
            </Card>

        </a>
     );
}
 
export default NewsArticleEntry;