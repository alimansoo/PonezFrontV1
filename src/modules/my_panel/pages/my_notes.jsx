import { useQuery } from "@tanstack/react-query";
import React from "react";

import MyNotesDesktop from "./desktop/my_notes";
import { UserNoteFn } from "../../user/query";
import MyNotesMobile from "./mobile/my_notes";

const Index = ({isMobile}) => {
  const myNotesQuery = useQuery({
    queryKey: ["my_notes"],
    queryFn: UserNoteFn.bind(this),
  });

  const onDelete = () => {
    myNotesQuery.refetch();
  };
  return isMobile ? (
    <MyNotesMobile
      isPending={myNotesQuery?.isPending}
      data={myNotesQuery?.data}
      handleOnDelete={onDelete}
    />
  ) : (
    <MyNotesDesktop
      isPending={myNotesQuery?.isPending}
      data={myNotesQuery?.data}
      handleOnDelete={onDelete}
    />
  );
};

export default Index;
