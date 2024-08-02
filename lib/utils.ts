import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { BADGE_CRITERIA } from "@/contants";
import { BadgeCounts } from "@/types";
import { Metadata } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeStamp(createdAt: Date): string {
  const now = new Date();
  const diff = Math.abs(now.getTime() - createdAt.getTime());

  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;

  if (diff < minute) {
    const seconds = Math.floor(diff / 1000);
    return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (diff < month) {
    const days = Math.floor(diff / day);
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (diff < year) {
    const months = Math.floor(diff / month);
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else {
    const years = Math.floor(diff / year);
    return years === 1 ? "1 year ago" : `${years} years ago`;
  }
}

export function abbreviateNumber(number: number): string {
  if (Math.abs(number) >= 1e6) {
    return (number / 1e6).toFixed(1) + "M";
  } else if (Math.abs(number) >= 1e3) {
    return (number / 1e3).toFixed(1) + "K";
  } else {
    return number?.toString();
  }
}

export function getJoinedDate(dateObj: Date): string {
  if (!(dateObj instanceof Date)) {
    throw new TypeError("Input must be a JavaScript Date object.");
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = monthNames[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `${month} ${year}`;
}

interface URLQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export function formUrlQuery({ params, key, value }: URLQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

interface RemoveURLQueryParams {
  params: string;
  keystoRemove: string[];
}

export function removeKeysFromUrl({
  params,
  keystoRemove,
}: RemoveURLQueryParams) {
  const currentUrl = qs.parse(params);

  keystoRemove.forEach((key: any) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

interface BadgeParams {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}

export function assignBadges(params: BadgeParams) {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };

  const { criteria } = params;

  criteria.forEach((item) => {
    const { count, type } = item;
    const badgeLevels: any = BADGE_CRITERIA[type];

    Object.keys(badgeLevels).forEach((level: any) => {
      if (count >= badgeLevels[level]) {
        badgeCounts[level as keyof BadgeCounts] += 1;
      }
    });
  });

  return badgeCounts;
}

export function constructMetadata({
  title = "CodeShift | Debuggers",
  description = "CodeShift is your collaborative code enhancement platform. Submit your code for expert review and receive valuable feedback for improvement. Join a community dedicated to refining coding skills and producing top-notch solutions. Elevate your coding game with CodeShift today.",
  image = "/assets/thumbnail.png",
  icons = "/assets/images/site-logo.svg",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@vectorvista",
    },
    icons,
    metadataBase: new URL("https://codeshift-mu.vercel.app/"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
