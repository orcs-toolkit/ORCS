import React, { useState } from "react";
import { Button } from "react-bootstrap";

import BanListModal from "./BanModal";

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
        {edit ? <i className={`bx bx-edit fs-20`}></i> : "Add Policy"}
      </Button>
      {visible && (
        <BanListModal
          onReload={onReload}
          visible={visible}
          toggle={toggle}
          edit={edit}
          propBanList={banList}
          propRole={role}
        />
      )}
    </>
  );
};

export default BanlistButton;
