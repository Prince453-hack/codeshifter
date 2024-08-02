"use client";

import React from "react";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  pageNumber: number;
  isNext: boolean | undefined;
}

const Pagination = ({ pageNumber, isNext }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl);
  };

  if (!isNext && pageNumber === 1) return null;
  return (
    <div className="flex w-full items-center justify-center gap-2 mt-10">
      <Button
        className="light-border-2 btn border flex min-h-[36px] items-center justify-center gap-2"
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("prev")}
      >
        <p className="body-medium text-dark200_light800">Prev</p>
      </Button>

      <div className="bg-primary-500 flex justify-center items-center rounded-md py-2 px-3.5">
        <p className="body-semibold text-light-900">{pageNumber}</p>
      </div>

      <Button
        className="light-border-2 btn border flex min-h-[36px] items-center justify-center gap-2"
        disabled={!isNext}
        onClick={() => handleNavigation("next")}
      >
        <p className="body-medium text-dark200_light800">Next</p>
      </Button>
    </div>
  );
};

export default Pagination;
