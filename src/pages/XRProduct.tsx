import { useParams, useSearchParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { XR, createXRStore } from '@react-three/xr';
import XrCube from '../components/XRContainer';
const XrContainer = () => {
    const store = createXRStore();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const productName = searchParams.get('name');

    return (
        <>
            {/* <h1 className="text-center text-3xl font-bold my-6">Renomate AR</h1> */}
            {productName && (
                <h1 className="text-center text-xl font-bold my-6">Product Name: {productName}</h1>
            )}
            <div className="p-4 flex justify-center h-[70vh] w-screen">
                <Canvas resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}>
                    <XR store={store}>
                        <XrCube position={[0, 0, -2]} fileId={id ?? ''} />
                    </XR>
                </Canvas>
            </div>
            <div className="flex justify-center items-center mt-10">
                <button
                    className="lg:hidden w-fit h-fit px-4 py-2 rounded-md bg-amber-500 text-white font-medium hover:scale-105 hover:transform hover:transition-colors hover:bg-amber-400"
                    onClick={() => store.enterAR()}
                >
                    Enter AR
                </button>
            </div>
        </>
    );
};

export default XrContainer;
