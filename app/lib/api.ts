import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),
    tagTypes: ['Profile'],
    endpoints: (builder) => ({

        // Define your API endpoints here

        // Login mutation
        login: builder.mutation<{ message: string, token: string, success: boolean, error: string }, { email: string; password: string }>({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        // Signup mutation
        signup: builder.mutation<{ token: string }, { email: string; }>({
            query: (userData) => ({
                url: 'auth/signup',
                method: 'POST',
                body: userData,
            }),
        }),

        // Get All Courses query
        getCourses: builder.query<any[], void>({
            query: () => 'courses',
        }),

        // Get Course Details query
        getCourseDetails: builder.query<any, string>({
            query: (id) => `courses/${id}`,
        }),

        // Get My Courses query
        getMyCourses: builder.query<any[], void>({
            query: () => 'dashboard/my-courses',
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
        })
    }),
})

export const {
    useLoginMutation,
    useSignupMutation,
    useGetCoursesQuery,
    useGetCourseDetailsQuery,
    useGetMyCoursesQuery,
    useVerifyOtpMutation,
    useResendOtpMutation,
    useGetProfileQuery,
    useUpdateProfileMutation
} = api