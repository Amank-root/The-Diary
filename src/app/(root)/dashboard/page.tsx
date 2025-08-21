import UserProfile from "@/components/auth/UserProfile";
import Container  from "@/components/shared/container";

export default function DashboardPage() {
  return (
    // <Container>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <UserProfile />
      </div>
    // </Container>
  );
}