import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

// data
import { getAllPagesWithSlug, getPage } from '../lib/api';

// styles
import styles from '../styles/Home.module.css';
import blogStyles from '../styles/Blog.module.css';

export default function Page({ pageData }) {

    const router = useRouter();

    if(!router.isFallback && !pageData?.slug) {
        return <p>hmmm...looks like an error</p>;
    }

    

    return(

        <div className={styles.container}>
            <Head>
                <title>{pageData.title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                {router.isFallback ? (
                    <h2>Loading...</h2>

                ) : (

                
                    <article className={blogStyles.article}>

                        <div>
                            <h1 className={styles.title}>{pageData.title}</h1>
                
                        </div>

                  

                    </article>



                )
                
                
                }


            </main>




        </div>
    )




}

export async function getStaticPaths() {
    const allPages = await getAllPagesWithSlug();

    return {
        paths: allPages.edges.map(({ node }) => `/${node.slug}`) || [],
        fallback: true

    };
}

export async function getStaticProps({ params }) {
    const data = await getPage(params.slug);

    return {
        props: {
            pageData: data.page
        }
    }


}
