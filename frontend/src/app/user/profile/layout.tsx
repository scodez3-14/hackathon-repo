import StepTracker from "../components/stepTracker";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Step Tracker at Top */}
      <StepTracker />
      <main className="min-h-screen">{children}</main>
    </>
  );
}
