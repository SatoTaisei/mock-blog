import { useState } from "react";
import { client } from "@/libs/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LinkCard } from "@/components/LinkCard";

import type { NextPage, GetStaticProps } from "next";
import type { Article } from "@/types/article";

const Home: NextPage<{ articles: Article[] }> = ({ articles }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  // 記事タイトルのみを抽出
  const articlesTitleList: string[] = articles.map((article) => article.title);

  const newArticleList: Article[] = [];
  articlesTitleList.map((title, index) => {
    if (searchKeyword) {
      // 記事タイトルが検索に該当したら表示
      if (title.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1)
        newArticleList.push(articles[index]);
    }
  });

  return (
    <>
      <Header />
      <main className="w-full min-h-screen my-8 mx-auto">
        <input
          type="text"
          placeholder="タイトルから探す"
          className="block w-8/12 h-14 border-4 rounded-full border-blue-500 text-2xl mx-auto my-4 px-4"
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <ul className="flex flex-wrap justify-center">
          {/* 検索キーワード入力なし */}
          {!searchKeyword &&
            articles.map((article, index) => {
              return <LinkCard article={article} key={index} />;
            })}
          {/* 検索キーワード入力あり */}
          {searchKeyword &&
            (newArticleList.length ? (
              // 該当記事あり
              newArticleList.map((article, index) => {
                return <LinkCard article={article} key={index} />;
              })
            ) : (
              // 該当記事なし
              <p className="font-bold text-gray-700 my-8">
                該当する記事が見つかりませんでした。
              </p>
            ))}
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
