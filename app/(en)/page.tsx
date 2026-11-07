import { HomeView, homeMetadata } from "@/views/home";

export const metadata = homeMetadata("en");

export default function HomePage() {
  return <HomeView locale="en" />;
}
