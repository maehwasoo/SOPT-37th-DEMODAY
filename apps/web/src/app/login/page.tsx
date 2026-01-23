import LoginPageClient from './LoginPageClient';

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{
    next?: string;
  }>;
}) {
  const next = (await searchParams)?.next;

  return (
    <main className="bg-[var(--color-black)]">
      <LoginPageClient next={next} />
    </main>
  );
}
