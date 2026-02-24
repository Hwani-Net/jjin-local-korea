import { notFound } from "next/navigation";
import { spots } from "@/lib/data";
import SpotDetailClient from "./SpotDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return spots.map((s) => ({ id: s.id }));
}

export default async function SpotDetailPage({ params }: Props) {
  const { id } = await params;
  const spot = spots.find((s) => s.id === id);
  if (!spot) notFound();
  return <SpotDetailClient spot={spot} />;
}
