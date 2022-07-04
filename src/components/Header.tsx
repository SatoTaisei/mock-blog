import { VFC } from "react";

export const Header: VFC = () => {
  return (
    <header className="w-full h-16 bg-blue-500 flex items-center text-3xl pl-4">
      <h1 className="text-3xl font-bold text-white">mock blog</h1>
    </header>
  );
};
