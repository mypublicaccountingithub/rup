import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
import "react-quill/dist/quill.snow.css";
import { version } from "process";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "code"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "code",
];

type Props = {
  value: string | undefined;
  onChange: any;
  isLoading: boolean;
};

const TextEditor: React.FC<Props> = ({ value, onChange, isLoading }) => {
  return (
    <div>
      <QuillNoSSRWrapper
        value={value}
        modules={modules}
        formats={formats}
        onChange={onChange}
        readOnly={isLoading}
        style={{
          height: "200px",
          marginBottom: "5px",
          fontSize: "16px",
        }}
      />
    </div>
  );
};

export default TextEditor;
