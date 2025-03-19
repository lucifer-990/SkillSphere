import React, { useEffect } from "react";
import { Button } from "./ui/button";
import {
  useCreateCheckoutSessionMutation,
  useUpdateEverythingMutation,
} from "@/features/api/purchaseApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

const BuyCourseButton = () => {
  const { courseId } = useParams();
  const [
    createCheckoutSession,
    { data, isLoading, isSuccess, isError, error },
  ] = useCreateCheckoutSessionMutation();
  const [updateEverything, { data: updatedData, isLoading: updateLoading }] =
    useUpdateEverythingMutation();

  const purchaseCourseHandler = async () => {
    if (!courseId) {
      toast.error("Invalid course ID");
      return;
    }
    await createCheckoutSession({ courseId });
    await updateEverything({ courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Purchase successful");
    } else if (isError) {
      toast.error(error?.data?.message || "Failed to Purchase");
    }
  }, [data, isSuccess, isError, error]);

  return (
    <Button
      disabled={isLoading}
      onClick={purchaseCourseHandler}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default BuyCourseButton;
