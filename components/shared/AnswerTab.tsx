import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import AnswerCard from "../cards/AnswerCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | undefined | null;
}

const AnswerTab = async ({ userId, clerkId }: Props) => {
  const result = await getUserAnswers({ userId, page: 1 });

  return (
    <>
      {result?.answer.map((item) => (
        <AnswerCard
          key={item?._id}
          clerkId={clerkId}
          _id={item._id}
          question={item.question}
          author={item.author}
          upvotes={item.upvotes.length}
          createdAt={item.createdAt}
        />
      ))}
    </>
  );
};

export default AnswerTab;
