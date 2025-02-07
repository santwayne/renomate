import { useParams, useSearchParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { XR } from '@react-three/xr';
import XrCube from '../components/XRContainer';
import { useEffect, useState, useRef } from 'react';
import { createXRStore } from '@react-three/xr';
import ImageXrCube from '../components/ImageXRContainer';

const store = createXRStore({
    hitTest: true,
    depthSensing: true,
});

const XrContainer = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [isXr, setIsXr] = useState(false);
    const [scale, setScale] = useState(3);
    const [isWebXRSupported, setIsWebXRSupported] = useState(false);
    const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
    const productName = searchParams.get('name');
    const status = searchParams.get('status');
    const format = searchParams.get('format');

    const arInitialized = useRef(false); // Ref to prevent redundant re-initializations

    // Check WebXR support
    useEffect(() => {
        const checkWebXRSupport = async () => {
            if (navigator.xr) {
                const supported = await navigator.xr.isSessionSupported('immersive-ar');
                setIsWebXRSupported(supported);
            } else {
                setIsWebXRSupported(false);
            }
        };

        checkWebXRSupport();
    }, []);

    // Start camera feed if WebXR is not supported
    useEffect(() => {
        if (!isWebXRSupported) {
            navigator.mediaDevices
                .getUserMedia({ video: { facingMode: 'environment' } })
                .then((stream) => {
                    setCameraStream(stream);
                })
                .catch((error) => {
                    console.error('Error accessing camera:', error);
                });
        }
    }, [isWebXRSupported]);

    // Clean up camera stream
    useEffect(() => {
        return () => {
            if (cameraStream) {
                cameraStream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [cameraStream]);

    // Handle window resize
    useEffect(() => {
        const updateScale = () => {
            if (window.innerWidth >= 1024) {
                setScale(4);
            } else {
                setScale(0.6);
            }
        };

        updateScale();
        window.addEventListener('resize', updateScale);

        return () => {
            window.removeEventListener('resize', updateScale);
        };
    }, []);

    const enterAR = async () => {
        if (!arInitialized.current) {
            store.enterAR();
            arInitialized.current = true;
        }
        setIsXr(true);
    };

    const exitAR = () => {
        setIsXr(false);
        arInitialized.current = false;
    };

    return (
        <>
            {productName && (
                <h1 className="text-center text-xl font-bold my-6">Product Name: {productName}</h1>
            )}
            <div className="p-4 flex justify-center h-[70vh] w-screen">
                {/* Render camera feed if WebXR is not supported */}
                {!isWebXRSupported && cameraStream && (
                    <video
                        autoPlay
                        playsInline
                        muted
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            zIndex: 0,
                        }}
                        ref={(video) => {
                            if (video) video.srcObject = cameraStream;
                        }}
                    />
                )}
                <Canvas resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}>
                    <XR store={store}>
                        {format === 'png' ? (
                            <ImageXrCube position={[0, 1, isXr ? -4 : 0]} fileId={id ?? ''} />
                        ) : (
                            <XrCube
                                position={[0, -0.35, isXr ? -1.75 : 0]}
                                scale={isXr ? scale : 2}
                                fileId={id ?? ''}
                            />
                        )}
                    </XR>
                </Canvas>
            </div>
            <div
                className={`flex justify-center items-center mt-10 ${
                    status === 'false' || status === null ? 'hidden' : ''
                }`}
            >
                {!isXr ? (
                    <button
                        className="lg:hidden w-fit h-fit px-4 py-2 rounded-md bg-amber-500 text-white font-medium hover:scale-105 hover:transform hover:transition-colors hover:bg-amber-400"
                        onClick={enterAR}
                        disabled={!isWebXRSupported} // Disable button if WebXR is not supported
                    >
                        {isWebXRSupported ? 'Enter AR' : 'AR Not Supported'}
                    </button>
                ) : (
                    <button
                        className="lg:hidden w-fit h-fit px-4 py-2 rounded-md bg-red-500 text-white font-medium hover:scale-105 hover:transform hover:transition-colors hover:bg-red-400"
                        onClick={exitAR}
                    >
                        Exit AR
                    </button>
                )}
            </div>
        </>
    );
};

export default XrContainer;
