import QuizClient from "@/components/Quiz/QuizClient";

export const metadata = {
    title: "Math Quiz - Skill Conquest",
    description: "Attempt the math quiz to assess your skills.",
    robots: {
        index: false, // Quiz page should not be indexed
        follow: false,
    },
};

export default function Quiz() {
    return <QuizClient />;
}