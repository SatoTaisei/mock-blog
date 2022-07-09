import type { NextPage, GetStaticProps } from "next";
import type { Article } from "@/types/article";

import { client } from "@/libs/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LinkCard } from "@/components/LinkCard";

type Props = {
  articles: Article[];
};

const Home: NextPage<Props> = ({ articles }) => {
  const substring200TextArray: string[] = [];

  return (
    <>
      <Header />
      <main className="w-10/12 min-h-screen my-8 mx-auto">
        <ul className="flex flex-wrap justify-center">
          {articles.map((article, index) => {
            // 記事本文の先頭200文字を抽出
            substring200TextArray[index] = article.body.substring(0, 199);

            return (
              <LinkCard
                key={index}
                article={article}
                substring200Text={substring200TextArray[index]}
              />
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
