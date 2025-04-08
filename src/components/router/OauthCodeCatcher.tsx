import { PropsWithChildren, useEffect } from "react";
import useQueryStrings from "../../hooks/useQueryStrings";
import { useNavigate } from "react-router-dom";
import { GetOAuthAccessToken } from "../../requests/oauthRequests";
import { saveTokens } from "../../utilities/oauthUtilities";
import { saveProfileToLocalStorage } from "../../utilities/profileUtilities";
import { useAppState } from "../../contexts/AppState";

export default function OauthCodeCatcher({ children }: PropsWithChildren) {
  const queryStrings = useQueryStrings();

  const navigate = useNavigate();
  const [appState, setAppState] = useAppState();

  useEffect(() => {
    if (queryStrings.get("code")) {
      ProcessCode();
    }
  }, []);

  async function ProcessCode() {
    const tokens = await GetOAuthAccessToken(queryStrings.get("code")!, true);
    if (!tokens) return;

    saveTokens(tokens);

    await saveProfileToLocalStorage();

    navigate(`${import.meta.env.BASE_URL}`);
    setAppState("refreshHeader", !appState.refreshHeader);
  }

  return children;
}
