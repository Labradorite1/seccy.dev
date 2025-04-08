import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import {
  deleteProfileFromLocalStorage,
  getAllMemberships,
  getPrimaryMembership,
  setPrimaryMembership,
} from "../../../utilities/profileUtilities";
import { getBungieNameFromInfoCard } from "../../../utilities/bungieNameUtilities";
import { useState } from "react";
import { GroupUserInfoCard } from "bungie-api-ts/groupv2";
import getMembershipName from "../../../utilities/membershipTypeUtilities";
import { useAppState } from "../../../contexts/AppState";
import ToastInfo from "../../../types/ToastInfo";
import { deleteTokens } from "../../../utilities/oauthUtilities";

export default function Settings() {
  const memberships = getAllMemberships();
  const [appState, setAppState] = useAppState();

  const [primaryMembership, setPrimaryMembershipState] = useState<GroupUserInfoCard | undefined>(
    getPrimaryMembership()
  );

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const handleClose = () => setShowDeleteModal(false);
  const handleShow = () => setShowDeleteModal(true);

  return (
    <main className="p-4">
      <div className="container bg-secondary p-2 rounded">
        <h2>Account Settings</h2>
        <Row className="p-2">
          <Form.Group as={Col} md="4">
            <Form.Label>Primary membership</Form.Label>
            <Form.Select
              aria-label="Primary Profile Select"
              value={primaryMembership?.membershipId}
              onChange={(e) => {
                const newMembership = memberships?.find((x) => x.membershipId === e.target.value);
                setPrimaryMembershipState(newMembership);
                setAppState("toasts", [
                  ...appState.toasts,
                  {
                    message: "Successfully updated your main profile!",
                    toastVariant: "success",
                  } as ToastInfo,
                ]);
                setPrimaryMembership(newMembership!);
              }}
              disabled={memberships === undefined}
            >
              {memberships?.map((membership) => (
                <option value={membership.membershipId}>
                  {getMembershipName(membership.membershipType)} - {getBungieNameFromInfoCard(membership)}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="p-2">
          <Form.Group>
            <Button variant="danger" onClick={handleShow} disabled={memberships === undefined}>
              Forget me
            </Button>
            <Modal show={showDeleteModal} onHide={handleClose}>
              <Modal.Header>Delete Data</Modal.Header>
              <Modal.Body>Are you sure you would like to delete your data?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    handleClose();
                    deleteProfileFromLocalStorage();
                    deleteTokens();
                    setAppState("refreshHeader", !appState.refreshHeader);
                  }}
                >
                  Delete data
                </Button>
              </Modal.Footer>
            </Modal>
          </Form.Group>
        </Row>
      </div>
    </main>
  );
}
