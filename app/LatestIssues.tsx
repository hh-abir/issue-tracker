import prisma from "@/prisma/client";
import {
  Avatar,
  Card,
  Flex,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";
import Link from "next/link";
const LatestIssues = async () => {
  const issues = await prisma?.issue.findMany({
    orderBy: {
      created_at: "desc",
    },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });
  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      <Table.Root>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>
                <Flex justify="between">
                  <Flex direction="column" align="start">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      src={issue.assignedToUser.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
