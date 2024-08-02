import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  imageUrl: string;
  href?: string;
  title: string;
  span?: string;
}

const ProfileLink = ({ imageUrl, href, title, span }: Props) => {
  return (
    <div className="flex-center gap-1">
      <Image src={imageUrl} width={20} height={20} alt="calendar" />{" "}
      <span className="text-dark400_light700">{span}</span>
      {href ? (
        <Link
          target="_blank"
          href={href}
          className="text-blue-500 paragraph-medium"
        >
          {title}
        </Link>
      ) : (
        <p className="paragraph-medium text-dark400_light700">{title}</p>
      )}
    </div>
  );
};

export default ProfileLink;
