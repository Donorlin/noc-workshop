import { Button, EmptyState, Page } from "@donorlin/noc-ui";
import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <Page title="Page not found">
      <EmptyState
        title="This page does not exist"
        description="Check the address or go back to the home page."
        action={
          <Button asChild variant="dark">
            <Link to="/">Go home</Link>
          </Button>
        }
      />
    </Page>
  );
}
