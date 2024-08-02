import { abbreviateNumber } from "@/lib/utils";
import { BadgeCounts } from "@/types";
import Image from "next/image";

interface CardProps {
  imageUrl: string;
  title: string;
  value: number;
}

const StatsCard = ({ imageUrl, title, value }: CardProps) => {
  return (
    <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
      <Image src={imageUrl} alt="badges" width={40} height={50} />
      <div className="">
        <p className="paragraph-semibold text-dark200_light900">{value}</p>
        <p className="body-medium text-dark400_light700 mt-1">{title}</p>
      </div>
    </div>
  );
};

interface Props {
  totalQuestions: number;
  totalAnswers: number;
  badges: BadgeCounts | any;
}

const Stats = ({ totalQuestions, totalAnswers, badges }: Props) => {
  return (
    <div className="mt-10">
      <h4 className="h3-semibold text-dark200_light900">Stats</h4>

      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div className="">
            <p className="paragraph-semibold text-dark200_light900">
              {abbreviateNumber(totalQuestions)}
            </p>
            <p className="body-medium text-dark400_light700">Questions</p>
          </div>
          <div className="">
            <p className="paragraph-semibold text-dark200_light900">
              {abbreviateNumber(totalAnswers)}
            </p>
            <p className="body-medium text-dark400_light700">Answers</p>
          </div>
        </div>
        <StatsCard
          imageUrl="/assets/icons/gold-medal.svg"
          value={badges.GOLD}
          title="Gold Badges"
        />
        <StatsCard
          imageUrl="/assets/icons/silver-medal.svg"
          value={badges.SILVER}
          title="Silver Badges"
        />
        <StatsCard
          imageUrl="/assets/icons/bronze-medal.svg"
          value={badges.BRONZE}
          title="Bronze Badges"
        />
      </div>
    </div>
  );
};

export default Stats;
