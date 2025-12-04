import TutorBookingsClient from "@/components/TutorBookings/TutorBookingsClient";

export const metadata = {
  title: "My Tutor Bookings - Skill Conquest",
  description: "Manage your tutor booking requests and view their status.",
  robots: {
    index: false, // Private user data
    follow: false,
  },
};

export default function TutorBookings() {
  return <TutorBookingsClient />;
}
