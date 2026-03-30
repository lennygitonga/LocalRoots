import { Link } from "react-router-dom";

function HomePage() {
    const stats = [
        { label: "Total Reports", value: "120" },
        { label: "People Helped", value: "340" },
        { label: "Active Requests", value: "45" },
        { label: "Community Members", value: "890" },
    ];

    const features = [
        {
            title: "Report Abuse",
            description:
                "Safely report cases of child abuse, domestic violence, or elderly mistreatment in your area.",
            to: "/report",
            buttonLabel: "Make a Report",
        },
        {
            title: "Request Help",
            description:
                "Post a need for food, clothing, or shelter and let your community show up for you.",
            to: "/help",
            buttonLabel: "Get Help",
        },
        {
            title: "Community Chat",
            description:
                "Talk openly with neighbours, share updates, and stay connected with your community.",
            to: "/chat",
            buttonLabel: "Join the Chat",
        },
    ];

    return (
        <div
            style={{
                backgroundImage: "url('/src/assets/hero.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}
            className="min-h-screen relative"
        >
            {/* Full page dark overlay */}
            <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
            />

            {/* All content sits above overlay */}
            <div className="relative z-10">

                {/* HERO SECTION */}
                <section className="text-center px-6 py-32">
                    <h1
                        style={{ color: "#FEFAE0" }}
                        className="text-5xl font-bold leading-tight"
                    >
                        Every Neighbour Matters
                    </h1>

                    <p
                        style={{ color: "#FEFAE0" }}
                        className="text-lg mt-4 max-w-xl mx-auto opacity-90"
                    >
                        Connecting neighbours to support and protect each other — report
                        abuse, request help, and stay rooted in your community.
                    </p>

                    <div className="flex justify-center gap-4 mt-8">
                        <Link
                            to="/report"
                            style={{ backgroundColor: "#606C38", color: "#FEFAE0" }}
                            className="px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-all"
                        >
                            Report Abuse
                        </Link>
                        <Link
                            to="/help"
                            style={{ backgroundColor: "#BC6C25", color: "#FEFAE0" }}
                            className="px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-all"
                        >
                            Request Help
                        </Link>
                    </div>
                </section>

                {/* STATS BAR */}
                <section className="px-6 py-10">
                    <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                style={{
                                    backgroundColor: "rgba(221,161,94,0.25)",
                                    border: "1px solid #DDA15E",
                                }}
                                className="rounded-2xl p-6 text-center"
                            >
                                <p
                                    style={{ color: "#DDA15E" }}
                                    className="text-3xl font-bold"
                                >
                                    {stat.value}
                                </p>
                                <p
                                    style={{ color: "#FEFAE0" }}
                                    className="text-sm mt-1"
                                >
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FEATURE CARDS */}
                <section className="px-6 py-10 pb-20 max-w-5xl mx-auto">
                    <h2
                        style={{ color: "#FEFAE0" }}
                        className="text-2xl font-bold text-center mb-8"
                    >
                        What You Can Do
                    </h2>
                    <div className="grid grid-cols-3 gap-6">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                style={{
                                    backgroundColor: "rgba(254,250,224,0.08)",
                                    border: "1px solid #DDA15E",
                                }}
                                className="rounded-2xl p-6 flex flex-col gap-4"
                            >
                                <h3
                                    style={{ color: "#DDA15E" }}
                                    className="text-xl font-bold"
                                >
                                    {feature.title}
                                </h3>
                                <p
                                    style={{ color: "#FEFAE0" }}
                                    className="text-sm flex-1 opacity-90"
                                >
                                    {feature.description}
                                </p>
                                <Link
                                    to={feature.to}
                                    style={{ backgroundColor: "#606C38", color: "#FEFAE0" }}
                                    className="text-center px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-all"
                                >
                                    {feature.buttonLabel}
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}

export default HomePage;