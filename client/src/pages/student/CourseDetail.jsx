import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeInfo, Loader2, Lock, PlayCircle } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import BuyCourseButton from "@/components/BuyCourseButton";
import {
  useGetCourseDetailWithStatusQuery,
  useUpdateEverythingMutation,
} from "@/features/api/purchaseApi";
import { toast } from "sonner";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);
  const [
    updateEverything,
    {
      data: updatedData,
      isLoading: updateLoading,
      isSuccess,
      isError: updateError,
      error,
    },
  ] = useUpdateEverythingMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(updatedData.message || "updated successfully");
    } else if (updateError) {
      toast.error(error?.data?.message || "Failed to Purchase");
    }
  }, [isSuccess, updatedData, updateError, error]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center p-3">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        <p>Loading</p>
      </div>
    );
  if (isError) return <h>Failed to load course details</h>;

  const { course, purchased } = data;
  // console.log(purchased);

  const handleContinueCourse = async () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
    await updateEverything({ courseId });
  };
  return (
    <div className="space-y-5">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {course?.courseTitle}
          </h1>
          <p className="text-base md:text-lg">{course?.subTitle}</p>
          <p>
            Created By{""}
            <span className="text-[#C0C4FC] underline italic">
              {course?.creator.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {course?.createdAt.split("T")[0]}</p>
          </div>
          <p>Students enrolled: {course?.enrolledStudents.length}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p
            className="text-sm"
            style={{ whiteSpace: "pre-wrap" }}
            dangerouslySetInnerHTML={{ __html: course.description }}
          ></p>
          <Card>
            <CardHeader>
              <CardTitle className="font-bold text-xl">
                Course Content
              </CardTitle>
              <CardDescription>
                {course?.lectures.length} lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <span>
                    {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                <ReactPlayer
                  width="100%"
                  height={"100%"}
                  url={course.lectures[0].videoUrl}
                  // url="https://youtu.be/vdNrPdeEuYQ?si=2U7_4vChgTDxidha"
                  controls={true}
                />
              </div>
              <h1>{course?.lectures[0].lectureTitle}</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">
                ₹{course.coursePrice}
              </h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button onClick={handleContinueCourse} className="w-full">
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
