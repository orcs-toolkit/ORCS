import React, { useState } from "react";
import { Button } from "react-bootstrap";

import BanListModal from "./BanListModal";

const BanlistButton = ({ edit = false, role = "", banList = [], onReload }) => {
  const [visible, setvisible] = useState(false);
  const toggle = () => {
    setvisible(!visible);
  };

  return (
    <>
      <Button
        className="bg-transparent text-primary py-2"
        onClick={() => toggle()}
      >
        {edit ? "Edit Policy" : "Add Policy"}
      </Button>
      <BanListModal
        onReload={onReload}
        visible={visible}
        toggle={toggle}
        edit={edit}
        propBanList={banList}
        propRole={role}
      />
    </>
  );
};

export default BanlistButton;
