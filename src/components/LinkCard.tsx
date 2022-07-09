import Link from "next/link";

import type { Article } from "@/types/article";
import { VFC } from "react";

type Props = {
  article: Article;
} & {
  substring200Text: string[number];
};

export const LinkCard: VFC<Props> = ({ article, substring200Text }) => {
  return (
    <li className="w-80 h-60 border-2 rounded-2xl pt-2 pb-4 mx-8 my-4 hover:border-blue-500 hover:border-4">
      <Link href={`/${article.id}`}>
        <a>
          <h2 className="leading-relaxed text-3xl font-bold px-4">
            {article.title}
          </h2>
          <p className="text-l text-gray-500 py-2 px-4">{substring200Text}</p>
        </a>
      </Link>
    </li>
  );
};
