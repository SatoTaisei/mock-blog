import type { NextPage, GetStaticProps } from "next";
import type { Article } from "@/types/article";
import { client } from "@/libs/client";
import { Header } from "@/components/Header";

type Props = {
  articles: Article;
};

const Home: NextPage<Props> = ({ articles }) => {
  return (
    <>
      <Header />
      <main className="flex flex-col justify-center w-10/12 my-8 mx-auto">
        <h1 className="text-3xl font-bold">Title：{articles.title}</h1>
        <p className="text-l text-gray-500">{articles.body}</p>
      </main>
    </>
  );
};
export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const data = await client
    .get({
      endpoint: "articles",
      contentId: "63ekd465z",
    })
    .then((res) => res)
    .catch(() => null);

  return { props: { articles: data } };
};
