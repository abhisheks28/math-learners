import HomeContent from "@/components/Home/HomeContent";

export const metadata = {
  title: "Skill Conquest - National Mathematics Day 2025",
  description: "Take the Math Skills Proficiency Test and discover your math mastery level. Personalized assessment for ages 6-16.",
  openGraph: {
    title: "Skill Conquest - National Mathematics Day 2025",
    description: "Take the Math Skills Proficiency Test and discover your math mastery level. Personalized assessment for ages 6-16.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return <HomeContent />;
}
