import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
import { Metadata } from "next";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});
const NewIssuePage = () => {
  return <IssueForm />;
};

export const metadata: Metadata = {
  title: "New Issue",
  description: "Create a new issue.",
};

export default NewIssuePage;
