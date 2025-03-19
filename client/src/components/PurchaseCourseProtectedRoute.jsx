import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";

const PurchaseCourseProtectedRoute = ({ children }) => {
  const { courseId } = useParams();
  const { data, isLoading } = useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <Loader2 className="mr-4 h-4 w-4 animate-spin" />;

  return data?.purchased ? (
    children
  ) : (
    <Navigate to={`/course-detail/${courseId}`} />
  );
};
export default PurchaseCourseProtectedRoute;
