"use client";
import { ErrorOption, SubmitHandler, useForm } from "react-hook-form";
import Form from "../ui/Form";
import RichTextEditor from "../ui/RichTextEditor";

const TEXT_EDITOR_NAME = "richtext";
const TEXT_EDITOR_VALIDATION = { required: true, maxLength: 20, minLength: 5 };

type ValidationType = keyof typeof TEXT_EDITOR_VALIDATION;
type Validation = typeof TEXT_EDITOR_VALIDATION;

export const getTextEditorWithHtmlName = (name: string) => `${name}_html`;

const getFormErrorByType = (
  type: ErrorOption["type"],
  validation: Validation
) => {
  switch (type) {
    case "required": {
      return "필수 입력 필드입니다.";
    }
    case "maxLength": {
      return `필드의 최대 입력 길이는 ${validation.maxLength}입니다.`;
    }
    case "minLength": {
      return `필드의 최소 입력 길이는 ${validation.minLength}입니다.`;
    }
  }
};

export default function TestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const withoutHtmlRegister = register(
    TEXT_EDITOR_NAME,
    TEXT_EDITOR_VALIDATION
  );

  register(getTextEditorWithHtmlName(TEXT_EDITOR_NAME));

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
  };

  return (
    <div className="p-8 w-10/12">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <RichTextEditor
          onChange={withoutHtmlRegister.onChange}
          name={TEXT_EDITOR_NAME}
        />
        <p className="text-rose-500">
          {errors[TEXT_EDITOR_NAME]?.type
            ? getFormErrorByType(
                errors[TEXT_EDITOR_NAME].type as ValidationType,
                TEXT_EDITOR_VALIDATION
              )
            : ""}
        </p>
        <button className="bg-blue-500 text-white p-3 rounded-xl">검사!</button>
      </Form>
    </div>
  );
}
