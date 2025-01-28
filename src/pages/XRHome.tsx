import { useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { XR } from '@react-three/xr';
import XrCube from '../components/XRContainer';
import { useState } from 'react';
import { createXRStore } from '@react-three/xr';

const store = createXRStore();

const XrContainer = () => {
    const { id } = useParams();

    const [scale] = useState(7);

    return (
        <>
            <div className="p-4 flex justify-center h-[50vh] md:w-[40vw] border-2 w-screen">
                <Canvas resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}>
                    <XR store={store}>
                        <XrCube position={[0, -1, 0]} scale={scale} fileId={id ?? ''} />
                    </XR>
                </Canvas>
            </div>
        </>
    );
};

export default XrContainer;
