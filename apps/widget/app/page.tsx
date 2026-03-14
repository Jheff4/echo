"use client"

import { WidgetView } from "@/modules/widget/ui/views/widget-view";
import { use } from "react";

interface Props {
  searchParams: Promise<{
    organizationId: string;
  }>;
}

export default function Page({ searchParams }: Props) {
  const { organizationId } = use(searchParams);

  return (
    <div className="flex items-center justify-center min-h-svh max-w-md mx-auto w-full">
      <WidgetView organizationId={organizationId} />
    </div>
  )
}
