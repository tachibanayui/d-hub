const SpinnerPage = ({ children }: SpinnerPageProps) => {
    return (
        <div className="fill flex-center flex-column">
            <div
                className="spinner-grow"
                role="status"
                style={{ width: "10vh", height: "10vh" }}
            >
                <span className="visually-hidden">Loading...</span>
            </div>
            <h1 className="mt-2">Loading...</h1>
            <i>Look! someone is stealing your post!</i>
        </div>
    );
};

export default SpinnerPage;

export interface SpinnerPageProps {
    children?: React.ReactNode;
}