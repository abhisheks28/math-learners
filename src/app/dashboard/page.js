import DashboardClient from "@/components/Dashboard/DashboardClient";

export const metadata = {
    title: "Student Dashboard - Skill Conquest",
    description: "View your assessment history, track progress, and access personalized learning resources.",
    openGraph: {
        title: "Student Dashboard - Skill Conquest",
        description: "View your assessment history, track progress, and access personalized learning resources.",
        type: "website",
    },
    robots: {
        index: false, // Dashboard is private
        follow: false,
    },
};

export default function Dashboard() {
    return <DashboardClient />;
}
