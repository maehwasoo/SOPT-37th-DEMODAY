import LoginPageClient from './LoginPageClient';

export default function LoginPage({
  searchParams,
}: {
  searchParams?: {
    next?: string;
  };
}) {
  const next = searchParams?.next;

  return (
    <main className="bg-[var(--color-black)]">
      <LoginPageClient next={next} />
    </main>
  );
}
