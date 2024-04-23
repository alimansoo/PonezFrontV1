import { ImageOffIcon, TrashIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { limitString } from "../../../shared/util/string";
import { API_UPLOADED_IMAGES_URL } from "../../../config";
import { dateFormate } from "../../../shared/util/dateFormat";

function MyNotePostCard({
  savedContent,
  title,
  images,
  district,
  slug,
  createdAt,
}) {
  return (
    <>
      <Link
        to={`/v/${slug}`}
        className="flex flex-row gap-4 p-3 border border-gray-200 rounded-md  cursor-pointer"
      >
        <div className="relative w-[80px] h-[80px] pb-2/3  rounded-md">
          {images[0] ? (
            <img
              className="absolute w-[80px] h-full inset-0 object-cover object-top rounded-md"
              src={`${API_UPLOADED_IMAGES_URL}${images[0]}`}
              alt={title}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 rounded-md flex justify-center items-center text-gray-400">
              <ImageOffIcon size={32} />
            </div>
          )}
        </div>
        <div className="flex flex-col justify-start h-full gap-1 w-[calc(100%-80px)]">
          <h1 className="text-gray-700 text-sm h-[30px] font-semibold w-full leading-7">
            {limitString(title, 30)}
          </h1>
          <span className="text-gray-400 text-xs Fanum">
            {dateFormate(createdAt)} در {district}
          </span>
          <span className="text-gray-500 text-xs pt-5">{limitString(savedContent, 20)}</span>
          <div className="w-full flex justify-end">
            <button className="btn btn-sm btn-circle bg-transparent border-none hover:bg-gray-100">
              <TrashIcon size={12} />
            </button>
          </div>
        </div>
      </Link>
    </>
  );
}
export default MyNotePostCard;