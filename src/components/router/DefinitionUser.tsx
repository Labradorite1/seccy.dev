import { PropsWithChildren, Suspense } from "react";
import Loading from "../pages/loading/Loading";
import { ensureDefs } from "../../definitions/definitionLoader";

export default function DefinitionUser({ children }: PropsWithChildren) {
  return (
    <Suspense fallback={<Loading />}>
      <DefinitionUserWrapper>{children}</DefinitionUserWrapper>
    </Suspense>
  );
}

function DefinitionUserWrapper({ children }: PropsWithChildren) {
  ensureDefs();
  return children;
}
