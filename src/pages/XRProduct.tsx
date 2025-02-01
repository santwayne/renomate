import { useParams, useSearchParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { XR } from '@react-three/xr';
import XrCube from '../components/XRContainer';
import { useEffect, useState, useRef } from 'react';
import { createXRStore } from '@react-three/xr';

const store = createXRStore(); // Ensure the store is created outside the component

const XrContainer = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [isXr, setIsXr] = useState(false);
    const [scale, setScale] = useState(3);
    const productName = searchParams.get('name');
    const status = searchParams.get('status');
    const format = searchParams.get('format');

    const arInitialized = useRef(false); // Ref to prevent redundant re-initializations

    useEffect(() => {
        const updateScale = () => {
            if (window.innerWidth >= 1024) {
                // Large screen
                setScale(4);
            } else {
                // Mobile screen
                setScale(0.5);
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
                <Canvas resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}>
                    <XR store={store}>
                        <XrCube
                            position={[0, -0.5, isXr ? -1.5 : 0]}
                            scale={isXr ? scale : 2}
                            fileId={id ?? ''}
                            format={format ?? 'glb'}
                        />
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
                    >
                        Enter AR
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
