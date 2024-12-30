const ErrorFallback = ({
    resetErrorBoundary,
}: {
    error: Error;
    resetErrorBoundary: () => void;
}) => (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
        <h1 className="text-red-500 text-2xl font-bold">Something went wrong.</h1>
        <p className="text-gray-700 text-center text-lg">Please try again.</p>
        <button
            onClick={resetErrorBoundary}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
            Try Again
        </button>
    </div>
);

export default ErrorFallback;
