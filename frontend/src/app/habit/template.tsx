"use client";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="relative flex h-full w-full">{children}</main>
    </>
  );
}
