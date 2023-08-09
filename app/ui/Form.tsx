import { FormEventHandler } from "react";

export default function Form({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}) {
  return <form onSubmit={onSubmit}>{children}</form>;
}
