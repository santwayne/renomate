import { useParams, useSearchParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { XR, createXRStore } from '@react-three/xr';
import XrCube from '../components/XRContainer';
import { useEffect, useState } from 'react';
const XrContainer = () => {
    const store = createXRStore({
        screenInput: true,
    });
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [isXr, setIsXr] = useState(false);
    const [scale, setScale] = useState(3);
    const productName = searchParams.get('name');

    useEffect(() => {
        const updateScale = () => {
            if (window.innerWidth >= 1024) {
                // Large screen
                setScale(8);
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
    return (
        <>
            {/* <h1 className="text-center text-3xl font-bold my-6">Renomate AR</h1> */}
            {productName && (
                <h1 className="text-center text-xl font-bold my-6">Product Name: {productName}</h1>
            )}
            <div className="p-4 flex justify-center h-[70vh] w-screen">
                <Canvas resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}>
                    <XR store={store}>
                        <XrCube
                            position={[0, -0.5, isXr ? scale : 0]}
                            scale={isXr ? 0.5 : 2}
                            fileId={id ?? ''}
                        />
                    </XR>
                </Canvas>
            </div>
            <div className="flex justify-center items-center mt-10">
                <button
                    className="lg:hidden w-fit h-fit px-4 py-2 rounded-md bg-amber-500 text-white font-medium hover:scale-105 hover:transform hover:transition-colors hover:bg-amber-400"
                    onClick={() => {
                        setIsXr(true);
                        store.enterAR();
                    }}
                >
                    Enter AR
                </button>
            </div>
        </>
    );
};

export default XrContainer;
