import React from "react";
import MainContainer from "../../../../../shared/components/container";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../../../shared/components/input/textInput";
import { Button, CircularProgress, Snackbar } from "@mui/material";
import UploadImages from "../../../../image/components/upload_image";
import { uploadImageFn } from "../../../../image/mutation";
import OptionComponent from "../../../components/option";
import SingleLayoutMobile from "../../../../../layouts/mobile/single_layout";

const EditPostMobile = ({
  loading,
  onSubmit,
  images,
  setImages,
  register,
  errors,
  data,
  optionData,
  snackbarOpen,
}) => {
  const navigate = useNavigate();

  return (
    <form onSubmit={onSubmit}>
      {" "}
      <SingleLayoutMobile
        buttonNavigation={
          <>
            <Button
              className="!w-full"
              href={`/my-panel/my-post`}
              variant="outlined"
            >
              انصراف
            </Button>
            <Button className="!w-full" variant="contained" type="submit">
              ارسال اگهی
            </Button>
          </>
        }
        title="ویرایش آگهی"
      >
        <MainContainer
          className={`w-full flex justify-center gap-8 py-12 h-full px-8`}
        >
          <div className="flex flex-col w-[600px] gap-0">
            {loading ? (
              <div className="w-full h-full flex justify-center items-center">
                <CircularProgress />
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div className="text-xl text-gray-800">ثبت آگهی</div>
                <UploadImages
                  images={images}
                  setImages={setImages}
                  uploadImageFn={uploadImageFn}
                />
                <TextInput
                  label={"عنوان آگهی"}
                  placeholder="عنوان آگهی"
                  register={register("title")}
                  helperText={`در عنوان آگهی به موارد مهمی مانند نوع ملک، متراژ و محله اشاره کنید.`}
                  errorMessage={errors?.title?.message}
                  value={data?.data?.title}
                />
                <TextInput
                  label={"قیمت آگهی"}
                  placeholder="قیمت آگهی"
                  register={register("amount")}
                  errorMessage={errors?.amount?.message}
                  type="number"
                  value={data?.data?.amount}
                  prefix={"تومان"}
                />
                <TextInput
                  label={"توضیحات آگهی"}
                  placeholder="توضیحات آگهی"
                  register={register("content")}
                  errorMessage={errors?.content?.message}
                  helperText={`در توضیحات آگهی به مواردی مانند شرایط اجاره، جزئیات و ویژگی‌های قابل توجه، دسترسی‌های محلی و موقعیت قرارگیری ملک اشاره کنید.`}
                  multiline
                  value={data?.data?.content}
                />
                <div className="flex flex-col gap-2">
                  {optionData?.data?.length > 0 &&
                    optionData?.data?.map((value, index) => {
                      return (
                        <OptionComponent
                          register={register}
                          defaultValue={
                            data?.data?.options?.filter(
                              (item) => item._id === value._id
                            )[0]?.value || ""
                          }
                          {...value}
                          key={index}
                        />
                      );
                    })}
                </div>

                <Snackbar
                  open={snackbarOpen}
                  message="آگهی شما ثبت شد"
                  className="!justify-between"
                  action={
                    <Button
                      href="/my-panel/my-post"
                      variant="text"
                      size="small"
                      className="!text-primary-default"
                    >
                      تایید
                    </Button>
                  }
                />
              </div>
            )}
          </div>
        </MainContainer>
      </SingleLayoutMobile>
    </form>
  );
};

export default EditPostMobile;
