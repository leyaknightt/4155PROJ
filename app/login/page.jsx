export default function Page() {
    return (
        <>
            <h1>Login</h1>
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="email">Email</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    className="fixed-width"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="password">Password</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="password"
                                    name="password"
                                    className="fixed-width"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="align-right">
                                <button>Submit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </>
    );
}