import { HomeView, homeMetadata } from "@/views/home";

export const metadata = homeMetadata("el");

export default function GreekHomePage() {
  return <HomeView locale="el" />;
}
