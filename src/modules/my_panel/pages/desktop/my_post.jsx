import { Button } from "@mui/material";
import React from "react";

import BasicLayoutDesktop from "../../../../layouts/desktop/basic_layout";
import MyPostCard from "../../../post/components/my_post_card";
import SidePanel from "../side_panel";

const MyPostDesktop = ({ isPending, data, handleOnDelete, mySpecials }) => {
  return (
    <BasicLayoutDesktop>
      <SidePanel />
      <div className="grid grid-cols-2 h-max w-4/5 gap-5">
        {!isPending ? (
          <>
            {data?.length > 0 ? (
              data?.map((value, index) => {
                const special = mySpecials?.filter(
                  (item) => value._id === item.post
                )?.length;
                return (
                  <MyPostCard
                    onDelete={handleOnDelete}
                    key={index}
                    {...value}
                    special={special}
                  />
                );
              })
            ) : (
              <div className="flex flex-col justify-center gap-4 items-center grid-cols-3 col-span-3 py-[30vh]">
                <span className="text-xs text-gray-400">
                  در حال حاضر آگهی ثبت‌ شده ندارید.
                </span>
                <Button href={`/new`} variant="contained">
                  ثبت اگهی
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="w-full flex justify-center items-center py-56 col-span-3">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        )}
      </div>
    </BasicLayoutDesktop>
  );
};

export default MyPostDesktop;
