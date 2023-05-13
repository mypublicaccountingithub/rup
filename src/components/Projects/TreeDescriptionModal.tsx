import { Modal } from "antd";
import React from "react";

//  types & interfaces
interface PhaseTreePropsType {
  setShowDescriptionModal: Function;
}

function TreeDescriptionModal(props: PhaseTreePropsType) {
  const { setShowDescriptionModal } = props;

  return (
    <Modal
      open
      footer={null}
      onCancel={() => setShowDescriptionModal(false)}
      // closable={false}
    >
      <pre>Lorem ipsum dolor sit amet consectetur adipisicing elit.</pre>
      <pre>Lorem ipsum dolor sit amet consectetur adipisicing elit.</pre>
      <pre>Lorem ipsum dolor sit amet consectetur adipisicing elit.</pre>
      <pre>Lorem ipsum dolor sit amet consectetur adipisicing elit.</pre>
      <pre>Lorem ipsum dolor sit amet consectetur adipisicing elit.</pre>
      <pre>Lorem ipsum dolor sit amet consectetur adipisicing elit.</pre>
      <pre>Lorem ipsum dolor sit amet consectetur adipisicing elit.</pre>
      <pre>Lorem ipsum dolor sit amet consectetur adipisicing elit.</pre>
      <pre>Lorem ipsum dolor sit amet consectetur adipisicing elit.</pre>
      <pre>Lorem ipsum dolor sit amet consectetur adipisicing elit.</pre>
    </Modal>
  );
}

export default TreeDescriptionModal;
