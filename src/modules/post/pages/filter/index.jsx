import React, { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useCity } from "../../../../context/CityContext";
import { FindPostFn } from "../../mutation";
import { FindChildrenCategorybySlugFn } from "../../../category/query";
import FilterPostDesktop from "./desktop";
import FilterPostMobile from "./mobile";

function NewPost({ isMobile }) {
  const { city } = useCity();
  const { slug } = useParams();

  const categoryQuery = useMutation({
    mutationFn: FindChildrenCategorybySlugFn.bind(this),
  });

  useEffect(() => {
    try {
      categoryQuery.mutate(slug ?? "root");
    } catch (error) {
      console.error(error);
    }
  }, [slug]);

  const postsQuery = useQuery({
    queryKey: ["findallposts"],
    queryFn: FindPostFn.bind(this, slug, city),
  });

  useEffect(() => {
    try {
      postsQuery.refetch();
    } catch (error) {
      console.error(error);
    }
  }, [slug, city]);

  const props = {
    city: city,
    slug: slug,
    data: postsQuery?.data,
    isPending: postsQuery?.isPending,
    categoryData: categoryQuery?.data,
  };

  return isMobile ? (
    <FilterPostMobile {...props} />
  ) : (
    <FilterPostDesktop {...props} />
  );
}

export default NewPost;
