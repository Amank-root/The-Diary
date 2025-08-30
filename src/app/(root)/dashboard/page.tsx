import UserProfile from "@/components/auth/UserProfile";

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