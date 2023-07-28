import { getSortedPostsData, client } from "./api/db-connection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export default async function Home() {

    const posts = await getSortedPostsData()

    return (
        <>
            <Header></Header>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
                    <div className="grid md:grid-cols-2 gap-8">
                        {posts.map((post) => {
                            return (
                                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12" key={post._id}>
                                    <a href={post.tag} className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 mb-2">
                                        <svg className="w-2.5 h-2.5 mr-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                            <path d="M17 11h-2.722L8 17.278a5.512 5.512 0 0 1-.9.722H17a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1ZM6 0H1a1 1 0 0 0-1 1v13.5a3.5 3.5 0 1 0 7 0V1a1 1 0 0 0-1-1ZM3.5 15.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM16.132 4.9 12.6 1.368a1 1 0 0 0-1.414 0L9 3.55v9.9l7.132-7.132a1 1 0 0 0 0-1.418Z" />
                                        </svg>
                                        {post.tag}
                                    </a>
                                    <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">{post.title}</h2>
                                    <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">{post.post.slice(0, 300)}</p>
                                    <a href={'blog/' + post._id} className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">Read more
                                        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
            {client.close()}
            <Footer></Footer>
        </>
    )
}