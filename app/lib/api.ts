import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),
    tagTypes: ['Profile', 'Course', 'Stats', 'User'],
    endpoints: (builder) => ({

        // Define your API endpoints here

        // Login mutation
        login: builder.mutation<{ success: boolean; redirectUrl: string }, { email: string; password: string }>({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Profile']
        }),

        // Signup mutation
        signup: builder.mutation<{ token: string }, { email: string; }>({
            query: (userData) => ({
                url: 'auth/signup',
                method: 'POST',
                body: userData,
            }),
        }),

        // Logout
        logout: builder.mutation<void, void>({
            query: () => ({
                url: 'auth/logout',
                method: 'POST',
            }),
        }),

        // Verify OTP mutation
        verifyOtp: builder.mutation<{ token: string }, { email: string; password: string; fullName: string; otp: string }>({
            query: (verificationData) => ({
                url: 'auth/verify-otp',
                method: 'POST',
                body: verificationData,
            }),
        }),

        // Resend OTP mutation
        resendOtp: builder.mutation<{ message: string }, { email: string }>({
            query: (emailData) => ({
                url: 'auth/resend-otp',
                method: 'POST',
                body: emailData,
            }),
        }),

        // Get Profile query
        getProfile: builder.query<{
            fullName: string
            email: string
            thumbnail: string | ''
            mobileNumber: string | ''
            accountType: string
        }, void>({
            query: () => 'user/profile',
            providesTags: ['Profile']
        }),

        // Update Profile mutation
        updateProfile: builder.mutation<{ message: string }, FormData>({
            query: (profileData) => ({
                url: 'user/profile',
                method: 'PUT',
                body: profileData,
            }),
            invalidatesTags: ['Profile']
        }),

        // Get Admin Stats query
        getAdminStats: builder.query<AdminStats, void>({
            query: () => 'admin/stats',
            providesTags: ['Stats'],
        }),

        // Create Course mutation
        createCourse: builder.mutation<{ id: string }, FormData>({
            query: (courseData) => ({
                url: 'admin/courses',
                method: 'POST',
                body: courseData,
            }),
            invalidatesTags: ['Course', 'Stats'],
        }),

        // Get All Users query
        getUsers: builder.query<User[], void>({
            query: () => 'admin/users',
            providesTags: ['User'],
        }),

        // Get Course Stats query
        getCourseStats: builder.query<CourseStats, string>({
            query: (courseId) => `admin/courses/${courseId}/stats`,
            providesTags: ['Stats'],
        }),

        // Get All Courses query
        getAllCourses: builder.query<Course[], void>({
            query: () => 'course',
            providesTags: ['Course'],
        }),

        // Get Course Details query
        getCourseDetails: builder.query<CourseDetails, string>({
            query: (id) => `courses/${id}`,
            providesTags: ['Course'],
        }),

        // Get Course query
        getCourse: builder.query<Course[], void>({
            query: () => 'courses',
            providesTags: ['Course'],
        }),
        purchaseCourse: builder.mutation<void, string>({
            query: (id) => ({
                url: `courses/${id}/purchase`,
                method: 'POST',
            }),
            invalidatesTags: ['Course'],
        }),

        // Initiate Payment mutation
        initiatePayment: builder.mutation<{ orderId: string, amount: number }, { courseId: string }>({
            query: (data) => ({
                url: 'payments/initiate',
                method: 'POST',
                body: data,
            }),
        }),

        // Verify Payment mutation
        verifyPayment: builder.mutation<{ success: boolean }, VerifyPaymentData>({
            query: (data) => ({
                url: 'payments/verify',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User', 'Stats'],
        }),
    }),
})

export const {
    useLoginMutation,
    useSignupMutation,
    useLogoutMutation,
    useGetCourseDetailsQuery,
    useVerifyOtpMutation,
    useResendOtpMutation,
    useGetProfileQuery,
    useUpdateProfileMutation,
    useGetAdminStatsQuery,
    useCreateCourseMutation,
    useGetAllCoursesQuery,
    useGetUsersQuery,
    useGetCourseStatsQuery,
    useGetCourseQuery,
    useInitiatePaymentMutation,
    useVerifyPaymentMutation,
    usePurchaseCourseMutation,
} = api

export const resetApiState = api.util.resetApiState


// Add type definitions
interface AdminStats {
    totalUsers: number
    totalCourses: number
    totalEnrollments: number
    totalRevenue: number
}

interface User {
    id: string
    fullName: string
    email: string
    accountType: string
    enrolledCourses: number
}

interface CourseStats {
    totalEnrollments: number
    totalRevenue: number
    averageRating: number
}

interface Course {
    id: string
    title: string
    description: string
    price: number
}

interface VerifyPaymentData {
    razorpay_payment_id: string
    razorpay_order_id: string
    razorpay_signature: string
}

interface CourseDetails extends Course {
    isEnrolled: boolean
    sections: {
      id: string
      title: string
      subsections: {
        id: string
        title: string
      }[]
    }[]
  }