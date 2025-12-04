import QuizResultClient from "@/components/Quiz/QuizResultClient";

export const metadata = {
    title: "Quiz Results - Skill Conquest",
    description: "View your detailed math skill report and performance analysis.",
    robots: {
        index: false, // Results are private
        follow: false,
    },
};

export default function QuizResult() {
    return <QuizResultClient />;
}
