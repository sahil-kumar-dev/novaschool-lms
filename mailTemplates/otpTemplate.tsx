export default function otpTemplate(otp: string) {
    return (`
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                backgroundColor: "rgba(243, 244, 246, 0.4)",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "32rem",
                    padding: "1.5rem",
                    backgroundColor: "#fff",
                    borderRadius: "0.5rem",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                }}
            >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem",background:'#808080' }}>
                    <a href="https://imgbb.com/"><img src="https://i.ibb.co/cY8gCn4/footerlogo.png" alt="footerlogo" /></a>
                </div>
                <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Your One-Time Password</h2>
                    <p style={{ color: "#6b7280" }}>Please use the following one-time password to Sign In</p>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1.5rem",
                        padding: "2rem",
                        backgroundColor: "#f3f4f6",
                        borderRadius: "0.5rem",
                    }}
                >
                    <div style={{ padding: "1.5rem", backgroundColor: "#fff", borderRadius: "0.5rem" }}>
                        <h2 style={{ fontSize: "3rem", fontWeight: "bold", color: "#2563eb" }}>${otp}</h2>
                    </div>
                    <p style={{ color: "#6b7280" }}>
                        This one-time password will expire in 10 minutes. If you did not request this, please ignore this email.
                    </p>
                </div>
            </div>
        </div>`
    )
}