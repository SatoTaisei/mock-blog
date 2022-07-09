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
  const extract200TextInBody = (text: string) => {
    return text.substring(0, 199);
  };

  return (
    <>
      <Header />
      <main className="w-full min-h-screen my-8 mx-auto">
        <ul className="flex flex-wrap justify-center">
          {articles.map((article, index) => {
            return (
              <LinkCard
                key={index}
                article={article}
                substring200Text={extract200TextInBody(article.body)}
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
