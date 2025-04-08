import { Row } from "react-bootstrap";
import ProfileSearchBox from "../../bungie/ProfileSearchBox";
import { useEffect, useState } from "react";
import { UserInfoCard } from "bungie-api-ts/user";
import { DestinyComponentType, DestinyProfileResponse } from "bungie-api-ts/destiny2";
import { GetProfile } from "../../../requests/bungieRequests";

export default function Homepage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [userInfoCard, setUserInfoCard] = useState<UserInfoCard | undefined>(undefined);
  const [profile, setProfile] = useState<DestinyProfileResponse | undefined>(undefined);

  useEffect(() => {
    if (userInfoCard) {
      setLoading(true);
      (async () => {
        const profile = await GetProfile({
          destinyMembershipId: userInfoCard.membershipId,
          membershipType: userInfoCard.membershipType,
          components: [DestinyComponentType.Profiles],
        });

        setProfile(profile.Response);
        setLoading(false);
      })();
    }
    if (!userInfoCard) {
      setProfile(undefined);
    }
  }, [refresh, userInfoCard]);
  return (
    <main className="p-4">
      <Row className="justify-content-md-center">
        <ProfileSearchBox
          userInfoCard={userInfoCard}
          setUserInfoCard={setUserInfoCard}
          loading={loading}
          setLoading={setLoading}
          setRefresh={setRefresh}
        />
      </Row>
      {profile && <Row>{JSON.stringify(profile)}</Row>}
    </main>
  );
}
