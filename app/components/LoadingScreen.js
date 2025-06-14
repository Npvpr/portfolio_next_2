const LoadingScreen = ({ className = "" }) => {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
        </div>
    );
};

export default LoadingScreen;