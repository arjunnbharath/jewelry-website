import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ slug: string }> };

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;

  const page = await prisma.page.findUnique({
    where: { slug, isPublished: true },
  });

  if (!page) notFound();

  return (
    <div className="py-10 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-5">
        <h1 className="font-serif text-2xl font-light sm:text-3xl lg:text-4xl">{page.title}</h1>
        <div className="mt-6 whitespace-pre-wrap break-words text-sm leading-relaxed text-[var(--color-muted)] sm:mt-8 sm:text-base">
          {page.content}
        </div>
      </div>
    </div>
  );
}
