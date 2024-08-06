import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

const DeleteButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      variant={"destructive"}
      className="absolute top-12 right-0 m-2"
    >
      Delete {pending && <Loader2 className="animate-spin ml-2" />}
    </Button>
  );
};

export default DeleteButton;
