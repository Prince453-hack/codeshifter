import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import QuestionCard from "../cards/QuestionCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | undefined | null;
}

const QuestionTab = async ({ userId, clerkId }: Props) => {
  const result = await getUserQuestions({ userId, page: 1 });

  return (
    <>
      {result?.questions.map((question) => (
        <div className="gap-6" key={question._id}>
          <QuestionCard
            key={question._id}
            _id={question._id}
            clerkId={clerkId}
            title={question.title}
            tags={question.tags}
            author={question.author}
            upvotes={question.upvotes}
            views={question.views}
            answer={question.answer}
            createdAt={question.createdAt}
          />
        </div>
      ))}
    </>
  );
};

export default QuestionTab;
