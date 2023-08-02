const Loading = () => {
    return (
        <main className="fill d-flex flex-column flex-all-center">
            <div style={{ flex: "0 1 auto" }}>
                <div className="spinner-grow color-primary" style={{width: 100, height: 100}} role="status"></div>
            </div>
        </main>
    );
};

export default Loading;
