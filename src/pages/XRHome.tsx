import { Canvas } from '@react-three/fiber';
import { XR, createXRStore } from '@react-three/xr';
import XrCube from '../components/XRContainer';
import '../App.css';

const XrContainer = () => {
    const store = createXRStore();
    // const store = createXRStore({
    //     customSessionInit: { requiredFeatures: ['hit-test'] },
    // });
    return (
        <>
            <Canvas
                style={{ height: '70vh', width: '90vw' }}
                resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}
            >
                <XR store={store}>
                    <XrCube scale={1} position={[0, 0, -3]} fileId="stair" />
                </XR>
            </Canvas>
            <button className="_hit_btn" onClick={() => store.enterAR()}>
                Enter AR
            </button>
        </>
    );
};

export default XrContainer;
