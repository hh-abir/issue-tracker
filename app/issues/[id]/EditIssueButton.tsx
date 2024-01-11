import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { RxPencil2 } from "react-icons/rx";

interface Props {
  issueId: number;
}
const EditIssueButton = ({ issueId }: Props) => {
  return (
    <Button>
      <RxPencil2 />
      <Link href={`/issues/edit/${issueId}`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
