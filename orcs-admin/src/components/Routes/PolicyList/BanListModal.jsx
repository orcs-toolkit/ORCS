import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import AsyncSelect from "react-select/async";

const BanListModal = ({
  visible,
  toggle,
  edit,
  propRole,
  onReload,
  propBanList,
}) => {
  const [role, setRole] = useState(propRole);
  const [error, setError] = useState(false);
  const [banList, setBanList] = useState(
    propBanList.length === 0
      ? []
      : propBanList.map((p) => {
          return { label: p, value: p };
        })
  );

  const handleSubmit = () => {
    if (role !== "") {
      setError(false);
      axios
        .post(
          `http://localhost:4001/api/${edit ? "updatePolicy" : "setPolicy"}`,
          {
            role,
            banList: banList.map((b) => b.value),
          }
        )
        .then((res) => {
          onReload && onReload();
          console.log("Success", res);
          toggle();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError(true);
    }
  };

  return (
    <Modal className="fade" show={visible}>
      <Modal.Header>
        <Modal.Title>Set Ban-List</Modal.Title>
        <Button variant="" className="close" onClick={toggle}>
          <span>&times;</span>
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="my-2">
          <Form.Label>Role</Form.Label>
          <input
            type="text"
            className="w-100 p-2"
            defaultValue={role}
            onChange={(event) => setRole(event.target.value)}
            name="Role"
            disabled={edit}
            placeholder="Enter Role"
          />
          {error && (
            <Form.Label className="text-danger pt-3">
              Please Enter Valid Role
            </Form.Label>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Select Processes</Form.Label>
          <AsyncSelect
            styles={{
              menuPortal: (base) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
            isMulti={true}
            defaultOptions={[
              { value: "Chrome", label: "Chrome" },
              { value: "Firefox", label: "Firefox" },
              { value: "Utorrent", label: "Utorrent" },
              { value: "Word", label: "Word" },
            ]}
            value={banList}
            onChange={(newValue) => {
              setBanList(newValue);
              console.log(banList);
            }}
            placeholder={"Select Processes"}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={toggle} variant="danger rounded">
          Close
        </Button>
        <Button variant="primary  rounded" onClick={handleSubmit}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BanListModal;
