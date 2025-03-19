import { configureStore } from "@reduxjs/toolkit";
import routeReducer from "./routeReducer.js";
import { authApi } from "@/features/api/authApi.js";
import { courseApi } from "@/features/api/courseApi.js";
import { purchaseApi } from "@/features/api/purchaseApi.js";
import { courseProgressApi } from "@/features/api/courseProgressApi.js";

const appStore = configureStore({
  reducer: routeReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      courseApi.middleware,
      purchaseApi.middleware,
      courseProgressApi.middleware
    ),
});

export default appStore;

const initializeApp = async () => {
  await appStore.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};
initializeApp();
