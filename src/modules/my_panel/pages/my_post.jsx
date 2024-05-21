import React from "react";
import { useQuery } from "@tanstack/react-query";
import { UserPostsFn } from "../../user/query";
import MyPostMobile from "./mobile/my_post";
import MyPostDesktop from "./desktop/my_post";
import { FindMySpecailFn } from "../../special/query";

const Index = ({ isMobile }) => {
  const myPostQuery = useQuery({
    queryKey: ["my_post"],
    queryFn: UserPostsFn.bind(this),
  });
  const mySpecialPostQuery = useQuery({
    queryKey: ["my_special_post"],
    queryFn: FindMySpecailFn.bind(this),
  });
  const handleOnDelete = () => {
    myPostQuery?.refetch();
    mySpecialPostQuery?.refetch();
  };
  return isMobile ? (
    <MyPostMobile
      isPending={myPostQuery?.isPending}
      data={myPostQuery?.data}
      handleOnDelete={handleOnDelete}
      mySpecials={mySpecialPostQuery?.data}
    />
  ) : (
    <MyPostDesktop
      isPending={myPostQuery?.isPending}
      data={myPostQuery?.data}
      handleOnDelete={handleOnDelete}
      mySpecials={mySpecialPostQuery?.data}
    />
  );
};

export default Index;
