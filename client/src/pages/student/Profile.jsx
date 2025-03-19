import { AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const { data, isLoading, isError, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isError: updateUserIsError,
      error: updateUserError,
      isSuccess: updateUserIsSuccess,
    },
  ] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (updateUserIsSuccess) {
      refetch();
      toast.success(updateUserData.message || "Profile updated");
    }
    if (updateUserIsError) {
      toast.error(updateUserError.message || "an error occured");
    }
  }, [updateUserError, updateUserData, updateUserIsSuccess, updateUserIsError]);

  if (isLoading) return <h1>Profile loading...</h1>;

  if (isError) return <h1>Failed to load profile</h1>;

  const user = data && data.user;
  return (
    <div className="my-24 mx-auto px-4 max-w-4xl">
      <h1 className="font-extrabold text-2xl text-center md:text-left">
        PROFILE
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-30 w-30 md:h-40 md:w-50 mb-10 rounded-full">
            <AvatarImage
              src={user?.photoUrl || "/image.png"}
              alt="@shadcn"
              className="rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2 mt-6">
            <h1 className="font-bold text-gray-900 dark:text-gray-100 ">
              Name:{" "}
              <span className="font-normal text-gray-700 dark:text-gray-300">
                {user.name}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-bold text-gray-900 dark:text-gray-100 ">
              Email:{" "}
              <span className="font-normal text-gray-700 dark:text-gray-300">
                {user.email}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-bold text-gray-900 dark:text-gray-100 ">
              Role:{" "}
              <span className="font-normal text-gray-700 dark:text-gray-300">
                {user.role.toUpperCase()}
              </span>
            </h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-2" size="sm">
                edit profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  make changes to your profile, clik save to save changes
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-col-4 items-center gap-4">
                  <Label>Name</Label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="name"
                    className="col-span-3 rounded-lg px-2"
                  />
                </div>
                <div className="grid grid-col-4 items-center gap-4">
                  <Label>Profile pic</Label>
                  <input
                    type="file"
                    onChange={onChangeHandler}
                    accept="image/*"
                    className="col-span-3 bg-gray-400 rounded-lg px-2"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={updateUserIsLoading}
                  onClick={updateUserHandler}
                >
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      wait
                    </>
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg">courses you are enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {user.enrolledCourses.length === 0 ? (
            <h1>You haven't enrolled yet</h1>
          ) : (
            user.enrolledCourses.map((course) => (
              <Course key={course._id} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
