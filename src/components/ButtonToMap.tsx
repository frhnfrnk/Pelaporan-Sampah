import Link from "next/link";
import React from "react";

const ButtonToMap = () => {
  return (
    <div>
      <Link href="/map">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          Lihat Peta
        </button>
      </Link>
      <Link href="/list">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Lihat Data
        </button>
      </Link>
    </div>
  );
};

export default ButtonToMap;
