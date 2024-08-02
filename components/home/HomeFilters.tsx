"use client";

import { HomePageFilters } from "@/contants/filters";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [active, setActive] = useState("");

  function handleClick(item: string) {
    if (active === item) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLocaleLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  }

  return (
    <div className="mt-10 flex-wrap gap-3 md:flex hidden">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          onCanPlay={() => {}}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === item.value
              ? "bg-primary-100 text-primary-500"
              : "bg-light-800 text-light-500 dark:bg-dark-300 dark:text-light-500"
          }`}
          onClickCapture={() => handleClick(item.value)}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
