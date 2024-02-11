
import React from "react";
import Todo from "@/components/Todo";

export default async function StandardPage({
  children,
}: {
  children: React.ReactNode,
}) {

  return (
    <div className="min-w-full">
      {children}
      <Todo />
    </div>
  );
}
