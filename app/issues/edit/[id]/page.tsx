import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
import prisma from "@/prisma/client";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
  })
);
const EditIssuePage = async ({ params }: Props) => {
  const issue = await fetchIssue(parseInt(params.id));
  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));
  return {
    title: "Edit issue of " + issue?.id,
    description: "Edit page issue of " + issue?.id,
  };
}
export default EditIssuePage;
