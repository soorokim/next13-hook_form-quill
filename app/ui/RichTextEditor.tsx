import { ChangeHandler } from "react-hook-form";
import type ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getTextEditorWithHtmlName } from "../components/TextForm";
import dynamic from "next/dynamic";

// https://github.com/zenoamaro/react-quill/issues/897#issuecomment-1638185261
const QuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // eslint-disable-next-line react/display-name
    return ({ ...props }) => <RQ {...props} />;
  },
  {
    ssr: false,
  }
) as typeof ReactQuill;

export default function RichTextEditor({
  onChange,
  name,
}: {
  onChange: ChangeHandler;
  name: string;
}) {
  const handleOnChange = (
    value: string,
    d: any,
    s: any,
    editor: ReactQuill.UnprivilegedEditor
  ) => {
    const text = value; // html이 포함된 text
    const withHtmlText = editor.getText(); // html이 포함되지 않은 text
    onChange({ target: { name, value: withHtmlText } });
    onChange({
      target: { name: getTextEditorWithHtmlName(name), value: text },
    });
  };
  return <QuillWrapper onChange={handleOnChange} />;
}
