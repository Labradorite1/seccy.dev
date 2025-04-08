import { Button, FloatingLabel, Form } from "react-bootstrap";
import LoadingIcon from "../../img/svgs/LoadingIcon";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getBungieNameFromInfoCard, getValidBungieNameFromString } from "../../utilities/bungieNameUtilities";
import { getPrimaryMembership, searchForProfileByBungieName } from "../../utilities/profileUtilities";
import { ExactSearchRequest, UserInfoCard } from "bungie-api-ts/user";
import RefreshIcon from "../../img/svgs/RefreshIcon";
import ErrorIcon from "../../img/svgs/ErrorIcon";
import ProfileIcon from "../../img/svgs/ProfileIcon";
import { useAppState } from "../../contexts/AppState";
import ToastInfo from "../../types/ToastInfo";

export default function ProfileSearchBox({
  userInfoCard,
  setUserInfoCard,
  setRefresh,
  loading,
  setLoading,
}: {
  userInfoCard: UserInfoCard | undefined;
  setUserInfoCard: Dispatch<SetStateAction<UserInfoCard | undefined>>;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const [inputString, setInputString] = useState<string>("");
  const [bungieName, setBungieName] = useState<ExactSearchRequest | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);

  const [appState, setAppState] = useAppState();

  useEffect(() => {
    const validBungieName = getValidBungieNameFromString(inputString);
    setBungieName(validBungieName);
    if (!validBungieName) {
      setUserInfoCard(undefined);
    }
  }, [inputString]);

  useEffect(() => {
    if (bungieName) {
      const bungieNameString = `${bungieName.displayName}#${bungieName.displayNameCode}`;
      if (!userInfoCard || bungieNameString != getBungieNameFromInfoCard(userInfoCard)) {
        (async () => {
          setError(false);
          setLoading(true);
          const foundProfile = await searchForProfileByBungieName(bungieName);
          setUserInfoCard(foundProfile);
          setError(!foundProfile);
          setLoading(false);
        })();
      }
    }
  }, [bungieName]);

  return (
    <div className="col col-md-4 col-lg-2 d-flex justify-content-between align-items-center">
      <FloatingLabel className="flex-fill" label="Bungie name">
        <Form.Control
          isValid={!!bungieName}
          type="text"
          placeholder="Bungie Name"
          onChange={(e) => setInputString(e.target.value)}
          value={inputString}
        />
      </FloatingLabel>
      <Button
        size="lg"
        className="m-2"
        variant={userInfoCard ? "outline-success" : "outline-secondary"}
        disabled={loading}
      >
        {loading && <LoadingIcon />}
        {!loading && !bungieName && !error && (
          <ProfileIcon
            onClickEvent={() => {
              const profile = getPrimaryMembership();
              if (!profile) {
                setAppState("toasts", [
                  ...appState.toasts,
                  { message: "Log in to autofill your profile!", toastVariant: "danger" } as ToastInfo,
                ]);
              }
              if (profile) {
                setUserInfoCard(profile);
                setInputString(getBungieNameFromInfoCard(profile));
              }
            }}
          />
        )}
        {!loading && bungieName && !error && <RefreshIcon setRefresh={setRefresh} />}
        {!loading && error && <ErrorIcon />}
      </Button>
    </div>
  );
}
