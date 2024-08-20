import React from 'react'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function Component() {
    return (
        <Card className="w-full max-w-3xl mx-auto p-6 sm:p-8 md:p-10">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">Profile</CardTitle>
                <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="John" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Doe" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="john@example.com" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" type="tel" placeholder="+1 (555) 555-5555" />
                        </div>
                    </div>
                    <div className="grid gap-4 items-center">
                        <div className="grid gap-2">
                            <Label htmlFor="profilePicture">Profile Picture</Label>
                            <Input id="profilePicture" type="file" />
                        </div>
                        <div className="flex items-center gap-4">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <div className="text-lg font-medium">John Doe</div>
                                <div className="text-sm text-muted-foreground">john@example.com</div>
                            </div>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <div className="flex justify-end">
                    <Button>Save Changes</Button>
                </div>
            </CardFooter>
        </Card>
    )
}