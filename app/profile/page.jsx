export default function Profile() {
    return (
        <>
            <h1>Profile</h1>
            <main className="container mt-5">
                <div className="row">
                    {/* Profile Image */}
                    <img
                        src="images/alice.jpg"
                        alt="Profile Image"
                        className="rounded-circle img-fluid"
                        style={{ width: 150, height: 150 }}
                    />
                    {/* Profile Details */}
                    <div className="col-md-8">
                        <h1>Jane Doe</h1>
                        <p>
                            <strong>Bio:</strong> Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                            fugiat nulla pariatur.
                        </p>
                        <h2>Contact Information</h2>
                        <ul className="list-unstyled">
                            <li>
                                <strong>Email:</strong> jane.doe@example.com
                            </li>
                            <li>
                                <strong>Phone:</strong> +1 (704) 123-4567
                            </li>
                            <li>
                                <strong>Location:</strong> Charlotte, NC
                            </li>
                        </ul>
                    </div>
                </div>
                <h2>Education</h2>
                <ul className="educationEx">
                    <p>University of North Carolina at Charlotte</p>
                    <p>
                        <strong>Degree: </strong>Bachelor of Science
                    </p>
                    <p>
                        <strong>Major: </strong>Computer Science
                    </p>
                    <p>2021 - 2024</p>
                </ul>
                <h2>Certifications</h2>
                <ul className="certify">
                    <p>Google Cloud Professional Cloud Architect</p>
                    <p>AWS Certified Solutions Architect Associate</p>
                    <p>Certified Kubernetes Administrator</p>
                </ul>
                {/* Additional Details Section */}
                <section className="mt-5">
                    <h3>Skills &amp; Interests</h3>
                    <div className="row">
                        <div className="col-md-6">
                            <h4>Skills</h4>
                            <ul>
                                <li>JavaScript</li>
                                <li>React</li>
                                <li>HTML/CSS</li>
                                <li>Node.js</li>
                                <li>MongoDB</li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <h4>Interests</h4>
                            <ul>
                                <li>Coding</li>
                                <li>Reading</li>
                                <li>Traveling</li>
                                <li>Photography</li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section className="experience">
                    <h2>Experience</h2>
                    <p>
                        <strong>Job Title: </strong>Lorem
                    </p>
                    <p>
                        <strong>Company: </strong>Lorem ipsum{" "}
                    </p>
                    <p>
                        <strong>Date of Employment: </strong>October 2021 - Present
                    </p>
                </section>
            </main>
        </>
    );
}