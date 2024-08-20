import { NextResponse } from 'next/server'

// Function to handle POST request for logging out
export async function POST() {
    // Create a response with a success message
    const response = NextResponse.json({ success: true })

    // Set the 'token' cookie to an empty string, effectively logging out the user
    // The cookie is set to expire immediately, making it invalid
    response.cookies.set({
        name: 'token',
        value: '',
        httpOnly: true,
        expires: new Date(0),
    })

    // Return the response with the updated cookie
    return response
}