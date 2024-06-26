import { Button, InputAdornment, TextField } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CheckCircle, ChevronLeftIcon } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import TextInput from "../../../../shared/components/input/textInput";
import { FindOptionbyCategorySlugFn } from "../../../option/query";
import { CategoryIconsXs } from "../../../category/category_icons";
import UploadImages from "../../../image/components/upload_image";
import { uploadImageFn } from "../../../image/mutation";
import OptionComponent from "../../components/option";
import { CreatePostSchema } from "../../schema";
import { CreatePostFn } from "../../mutation";

const New = ({ name, id, slug, icon }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const optionQuery = useQuery({
    queryKey: ["category_options"],
    queryFn: FindOptionbyCategorySlugFn.bind(this, slug),
    enabled: false,
  });

  const UploadImageMutation = useMutation({
    mutationFn: CreatePostFn.bind(this),
  });

  useEffect(() => {
    if (slug) optionQuery.refetch();
  }, [slug]);

  const onSuccessMutation = (data) => {
    setOpen(true);
  };

  const onErorrMutation = (data) => {
    console.error(data);
  };

  const onSubmit = async (data) => {
    const postImages = await images
      .filter((value) => value.id !== "")
      .map((value) => value.id);

    const formData = {
      category: id,
      title: data?.title,
      content: data?.content,
      amount: data?.amount,
      images: postImages,
      province: "اصفهان",
      city: "اصفهان",
      district: "اصفهان",
      cordinate: [51.123654411, 35.123654411],
      options: {},
    };

    delete data?.title;
    delete data?.content;
    delete data?.amount;

    for (let key in data) {
      if (data[key] === "") {
        delete data[key];
      }
    }
    const options = [];
    for (let key in data) {
      const option = optionQuery?.data?.data?.filter(
        (value) => value._id === key
      )[0];
      options.push({
        _id: option._id,
        title: option.title,
        type: option.type,
        prefix: option.prefix,
        value: data[key],
      });
    }
    formData.options = options;
    try {
      UploadImageMutation.mutateAsync(formData, {
        onSuccess: onSuccessMutation,
        onError: onErorrMutation,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreatePostSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-10 mb-[55px]"
    >
      <div className="text-xl text-gray-800 hidden lg:block">ثبت آگهی</div>
      <TextField
        label={"دسته بندی"}
        focused
        value={name}
        className="!text-sm"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {CategoryIconsXs[icon]}
            </InputAdornment>
          ),
          endAdornment: (
            <Link
              to={"/new"}
              className="bg-primary-default text-white text-xs flex items-center w-max py-2 px-4 gap-2 pl-2 rounded-lg"
            >
              <span className="w-max">تغییر دسته</span>
              <ChevronLeftIcon size={16} />
            </Link>
          ),
        }}
      />
      <UploadImages
        images={images}
        setImages={setImages}
        uploadImageFn={uploadImageFn}
      />
      <TextInput
        label={"عنوان آگهی"}
        placeholder="عنوان آگهی"
        register={register("title")}
        errorMessage={errors?.title?.message}
      />
      <TextInput
        label={"قیمت آگهی"}
        placeholder="قیمت آگهی"
        register={register("amount")}
        errorMessage={errors?.amount?.message}
        type="number"
        prefix={"تومان"}
      />
      <TextInput
        label={"توضیحات آگهی"}
        placeholder="توضیحات آگهی"
        register={register("content")}
        errorMessage={errors?.content?.message}
        multiline
      />
      <div className="flex flex-col gap-8">
        {optionQuery?.data?.data?.length > 0 &&
          optionQuery?.data?.data?.map((value, index) => {
            return (
              <OptionComponent register={register} {...value} key={index} />
            );
          })}
      </div>
      <div className="flex flex-row gap-3 justify-end pt-4 fixed lg:static bottom-0 left-0 right-0 bg-white z-40 p-[12px] lg:p-0 border-t lg:border-t-0 border-gray-300">
        <Button fullWidth variant="contained" type="submit">
          ارسال اگهی
        </Button>
        <Button
          fullWidth
          size="small"
          variant="outlined"
          onClick={navigate.bind(this, "/")}
        >
          انصراف
        </Button>
      </div>
      {open && (
        <div className="fixed flex flex-col gap-4 bottom-4 left-4 right-4 z-50 border lg:max-w-[200px] border-green-400 bg-white p-4 rounded-lg">
          <div className="flex items-center gap-2 text-green-500">
            <CheckCircle size={16} />
            <span className="text-sm">آگهی شما با موفقیت ثبت شد.</span>
          </div>
          <Link
            to={"/"}
            className="bg-green-700 text-white px-4 py-2 w-max text-sm rounded-lg"
          >
            تایید
          </Link>
        </div>
      )}
    </form>
  );
};
export default New;
