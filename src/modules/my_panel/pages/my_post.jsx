import React from "react";
import { useQuery } from "@tanstack/react-query";
import { UserPostsFn } from "../../user/query";
import { useResponsive } from "../../../context/ResponsiveContext";
import MyPostMobile from "./mobile/my_post";
import MyPostDesktop from "./desktop/my_post";

const Index = () => {
  const myPostQuery = useQuery({
    queryKey: ["my_post"],
    queryFn: UserPostsFn.bind(this),
  });

  const handleOnDelete = () => {
    myPostQuery?.refetch();
  };
  const { isTabletOrMobile } = useResponsive();
  return isTabletOrMobile ? (
    <MyPostMobile
      isPending={myPostQuery?.isPending}
      data={myPostQuery?.data}
      handleOnDelete={handleOnDelete}
    />
  ) : (
    <MyPostDesktop
      isPending={myPostQuery?.isPending}
      data={myPostQuery?.data}
      handleOnDelete={handleOnDelete}
    />
  );
};

export default Index;
