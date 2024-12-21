import { useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { XR, createXRStore } from '@react-three/xr';
import XrCube from '../components/XRContainer';
import '../App.css';

const XrContainer = () => {
    const store = createXRStore();
    const { id } = useParams();
    console.log('🚀 ~ XrContainer ~ id:', id);

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Product{id}</h1>
            <Canvas
                style={{ height: '70vh', width: '90vw' }}
                resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}
            >
                <XR store={store}>
                    <XrCube position={[0, 0, -2]} />
                </XR>
            </Canvas>
            <button className="_hit_btn" onClick={() => store.enterAR()}>
                Enter AR
            </button>
        </>
    );
};

export default XrContainer;
