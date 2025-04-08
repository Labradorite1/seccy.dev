import { Button, FloatingLabel, Form } from "react-bootstrap";
import LoadingIcon from "../../img/svgs/LoadingIcon";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getValidBungieNameFromString } from "../../utilities/bungieNameUtilities";
import { searchForProfileByBungieName } from "../../utilities/profileUtilities";
import { UserInfoCard } from "bungie-api-ts/user";
import RefreshIcon from "../../img/svgs/RefreshIcon";
import ErrorIcon from "../../img/svgs/ErrorIcon";

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
  const [bungieName, setBungieName] = useState<any | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const validBungieName = getValidBungieNameFromString(inputString);
    setBungieName(validBungieName);
    if (!validBungieName) {
      setUserInfoCard(undefined);
    }
  }, [inputString]);

  useEffect(() => {
    if (bungieName) {
      (async () => {
        setError(false);
        setLoading(true);
        const foundProfile = await searchForProfileByBungieName(bungieName);
        setUserInfoCard(foundProfile);
        setError(!foundProfile);
        setLoading(false);
      })();
    }
  }, [bungieName]);

  return (
    <div className="col col-md-4 col-lg-2 d-flex justify-content-between align-items-center">
      <FloatingLabel className="flex-fill" label="Bungie name">
        <Form.Control
          isValid={bungieName}
          type="text"
          placeholder="Bungie Name"
          onChange={(e) => setInputString(e.target.value)}
        />
      </FloatingLabel>
      <Button
        size="lg"
        className="m-2"
        variant={userInfoCard ? "outline-success" : "outline-secondary"}
        disabled={loading}
      >
        {loading && <LoadingIcon />}
        {!loading && !bungieName && !error && <div style={{ width: "24px", height: "36px" }}></div>}
        {!loading && bungieName && !error && <RefreshIcon setRefresh={setRefresh} />}
        {!loading && error && <ErrorIcon />}
      </Button>
    </div>
  );
}
