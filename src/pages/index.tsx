import type { NextPage, GetStaticProps } from "next";
import type { Article } from "@/types/article";
import { client } from "@/libs/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";

type Props = {
  articles: Article[];
};

const Home: NextPage<Props> = ({ articles }) => {
  const substring200TextArray: string[] = [];
  articles.map(
    (article, index) =>
      (substring200TextArray[index] = article.body.substring(0, 199))
  );

  return (
    <>
      <Header />
      <main className="w-10/12 min-h-full my-8 mx-auto">
        <ul className="flex flex-wrap justify-center">
          {articles.map((article, index) => {
            return (
              <li
                key={index}
                className="w-80 h-60 border-2 rounded-2xl pt-2 pb-4 mx-8 my-4 hover:border-blue-500 hover:border-4"
              >
                <Link href={`/articles/${article.id}`}>
                  <a>
                    <h2 className="leading-relaxed text-3xl font-bold px-4">
                      Title：{article.title}
                    </h2>
                    <p className="text-l text-gray-500 py-2 px-4">
                      {substring200TextArray[index]}
                    </p>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
      <Footer />
    </>
  );
};
export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const data = await client
    .get({
      endpoint: "articles",
    })
    .then((res) => res)
    .catch(() => null);

  return { props: { articles: data.contents } };
};
