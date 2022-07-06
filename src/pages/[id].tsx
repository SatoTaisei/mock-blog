import type { NextPage } from "next";
import type { Article } from "@/types/article";
import { client } from "@/libs/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type Props = {
  article: Article;
};

const ArticleId: NextPage<Props> = ({ article }) => {
  return (
    <>
      <Header />
      <main className="w-9/12 min-h-screen my-8 mx-auto">
        <h2 className="leading-relaxed text-4xl font-bold px-4">
          {article.title}
        </h2>
        <p
          className="text-xl text-gray-500 leading-relaxed py-2 px-4"
          dangerouslySetInnerHTML={{
            __html: `${article.body}`,
          }}
        />
      </main>
      <Footer />
    </>
  );
};
export default ArticleId;

export const getStaticPaths = async () => {
  const data = await client
    .get({ endpoint: "articles" })
    .then((res) => res)
    .catch(() => null);

  const paths = data.contents.map(
    (content: { id: string }) => `/${content.id}`
  );
  return { paths, fallback: false };
};

export const getStaticProps = async (context: { params: { id: string } }) => {
  const id = context.params.id;
  const data = await client
    .get({ endpoint: "articles", contentId: id })
    .then((res) => res)
    .catch(() => null);

  return { props: { article: data } };
};
