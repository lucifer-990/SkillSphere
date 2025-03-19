import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const params = useParams();
  const courseId = params.courseId;
  const [lectureTitle, setLectureTitle] = useState("");
  const navigate = useNavigate();

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data?.message || "lecture created");
    }
    if (error) {
      toast.error(error?.data?.message || "an error occured");
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let's add lectures, add some basic details for your new lecture
        </h1>
        <p className="text-sm">
          Provide a brief overview of what students will learn in this lecture.
        </p>
        <p className="text-sm">
          Example: "In this lecture, you will learn the fundamentals of Python,
          including syntax, data types, and how to write your first program."
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your Title Name"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to course
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create lecture"
            )}
          </Button>
        </div>
        <div className="mt-10">
          {lectureLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : lectureError ? (
            <p>Failed to load lectures.</p>
          ) : lectureData.lectures.length === 0 ? (
            <p>No lectures availabe</p>
          ) : (
            lectureData.lectures.map((lecture, index) => (
              <Lecture
                key={lecture._id}
                lecture={lecture}
                courseId={courseId}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
