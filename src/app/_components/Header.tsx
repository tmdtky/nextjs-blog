"use client";

import React from "react";
import Link from "next/link";

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white px-6 py-6 font-bold flex justify-between items-center">
      <Link href="/" className="text-white no-underline hover:text-gray-300">
        Blog
      </Link>
      <Link href="/contact" className="text-white no-underline hover:text-gray-300">
        お問い合わせ
      </Link>
    </header>
  );
};