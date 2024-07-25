// // ReadingField.js
// import { findOneArticle } from "@/lib/features/article/articleSlice";
// import { useAppDispatch } from "@/lib/store";
// import { reading } from "@/utils/constant/reading";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";

// interface ReadingFieldProps {
//   page: number;
//   font: number;
//   dual: boolean;
//   content: string[];
// }

// const ReadingField: React.FC<ReadingFieldProps> = ({
//   page,
//   font,
//   dual,
//   content,
// }) => {
//   const [activePage, setActivePage] = useState({
//     left: page,
//     right: page + 1,
//   });
//   const [isDual, setIsDual] = useState(dual);
//   const [fontSize, setFontSize] = useState(font);

//   useEffect(() => {
//     setActivePage({
//       left: page,
//       right: page + 1,
//     });
//     setFontSize(font);
//     setIsDual(dual);
//   }, [page, font, dual]);

//   return (
//     <div className="flex flex-row justify-center gap-2">
//       <div
//         className={`w-full lg:w-1/2 min-h-screen rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  p-12 text-justify`}
//       >
//         <p style={{ fontSize: `${fontSize}px` }}>
//           {content[activePage.left - 1]}
//         </p>
//       </div>
//       {dual && (
//         <div
//           className={`w-1/2 min-h-screen rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-12  text-justify`}
//         >
//           <p style={{ fontSize: `${fontSize}px` }}>
//             {content[activePage.right - 1]}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReadingField;
