import AdminLoginClient from "@/components/AdminLogin/AdminLoginClient";

export const metadata = {
    title: "Admin Login - Skill Conquest",
    description: "Administrative access only.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdminLogin() {
    return <AdminLoginClient />;
}
