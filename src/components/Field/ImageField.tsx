import React, { useEffect, useState } from "react";
import { MdOutlineAddPhotoAlternate, MdDelete } from "react-icons/md";

import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  addImage,
  updateImage,
  deleteImage,
} from "@/lib/features/report/reportSlice";

interface ImageFieldProps {
  label: string;
  img?: any[];
  id: string;
}

const ImageField: React.FC<ImageFieldProps> = ({ label, img, id }) => {
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<any>(img ? img : []);

  const handleInputImage = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    dispatch(addImage(formData));
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage([...image, reader.result]);
    };
  };

  const handleChangeImage = (e: any, index: number) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    dispatch(updateImage({ index, newValue: formData }));
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const newImage = [...image];
      newImage[index] = reader.result;
      setImage(newImage);
    };
  };

  const handleDeleteImage = (index: number) => {
    dispatch(deleteImage(index));
    const newImage = [...image];
    newImage.splice(index, 1);
    setImage(newImage);
  };

  const handleFileInputBlur = () => {
    if (!image) {
      setImage([]);
    }
  };

  return (
    <div className="w-full grow-0 lg:grow flex flex-col gap-1 mb-3 ">
      {image.length == 0 ? (
        <label
          className="flex justify-center flex-col items-center border-2 border-[#e2e2e2] w-1/2 lg:w-1/4 aspect-square rounded-xl cursor-pointer"
          htmlFor="fileInput"
        >
          <MdOutlineAddPhotoAlternate className="text-neutral-500 text-4xl" />
          <p className="text-neutral-500 text-[12px] my-1">Add cover</p>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
            onChange={handleInputImage}
            onBlur={handleFileInputBlur}
          />
        </label>
      ) : (
        <div className="flex justify-center flex-col">
          {image.map((img: any, index: number) => (
            <div
              key={index}
              className="group relative flex flex-col w-[500px] rounded-xl gap-2 mb-5"
            >
              <img src={img} alt="" className="rounded-xl w-[500px]" />
              <div className="w-[500px] h-full flex items-center justify-center absolute top-0 left-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-xl transition-opacity duration-300 "></div>
              <div className="absolute w-[500px] h-full flex items-center justify-center">
                <label
                  className="opacity-0 group-hover:opacity-100  text-black rounded-xl px-2 py-1 text-sm my-2 transition-opacity duration-300 cursor-pointer "
                  htmlFor={`fileInput${index}`}
                >
                  <p className="bg-[#D7713E] hover:bg-[#ac5a32] p-3 rounded-full text-white font-poppins">
                    Change photo
                  </p>
                  <input
                    type="file"
                    id={`fileInput${index}`}
                    accept="image/*"
                    className="hidden "
                    onChange={(e) => handleChangeImage(e, index)}
                    onBlur={handleFileInputBlur}
                  />
                </label>
                <div
                  className="flex items-center bg-[#D7713E] hover:bg-[#ac5a32] trasitio px-5 py-3 rounded-full opacity-0 group-hover:opacity-100 text-black text-sm my-2 transition-all duration-300 cursor-pointer"
                  onClick={() => handleDeleteImage(index)}
                >
                  <p className="text-white font-poppins">Delete</p>
                  <MdDelete className="text-white text-2xl" />
                </div>
              </div>
            </div>
          ))}
          <label
            className="mt-5 flex justify-center flex-col items-center border-2 border-[#e2e2e2] w-1/4 aspect-square rounded-xl cursor-pointer"
            htmlFor="fileInput"
          >
            <MdOutlineAddPhotoAlternate className="text-neutral-500 text-4xl" />
            <p className="text-neutral-500 text-[12px] my-1">Add other image</p>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={handleInputImage}
              onBlur={handleFileInputBlur}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageField;
