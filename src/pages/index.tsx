import type { NextPage, GetStaticProps } from "next";
import type { Article } from "../types/article";
import { client } from "../libs/client";

type Props = {
  articles: Article;
};

const Home: NextPage<Props> = ({ articles }) => {
  return (
    <>
      <h1 className="text-3xl font-bold">タイトル：{articles.title}</h1>
      <p className="text-l text-gray-500">{articles.body}</p>
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
