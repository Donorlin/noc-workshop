import { Alert, Button, Page, getErrorMessage } from "@donorlin/noc-ui";
import { useRouteError } from "react-router";

export function ErrorPage() {
  const error = useRouteError();
  return (
    <Page title="Something went wrong">
      <Alert
        tone="error"
        title="The page crashed"
        action={
          <Button size="sm" onClick={() => location.reload()}>
            Reload
          </Button>
        }
      >
        {getErrorMessage(error)}
      </Alert>
    </Page>
  );
}
