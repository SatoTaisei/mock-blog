import Link from "next/link";
import { VFC } from "react";

import type { Article } from "@/types/article";

type Props = {
  article: Article;
};

export const LinkCard: VFC<Props> = ({ article }) => {
  const extract200TextInBody = article.body.substring(0, 199);

  return (
    <li className="w-80 h-60 border-2 rounded-2xl pt-2 pb-4 mx-8 my-4 hover:border-blue-500 hover:border-4">
      <Link href={`/${article.id}`}>
        <a>
          <h2 className="leading-relaxed text-3xl font-bold px-4">
            {article.title}
          </h2>
          <p className="text-l text-gray-500 py-2 px-4">
            {extract200TextInBody}
          </p>
        </a>
      </Link>
    </li>
  );
};
