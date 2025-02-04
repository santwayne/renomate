import { OrbitControls, useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const XrCube = ({
    position,
    fileId,
    scale,
}: {
    position: [number, number, number];
    fileId: string;
    scale: number;
}) => {
    const cubeRef = useRef<THREE.Group>(null);

    const ModelFromS3 = ({ url }: { url: string }) => {
        const gltf = useGLTF(url);
        return <primitive object={gltf.scene} scale={scale} />;
    };

    const s3Url = `https://renomate-3d.s3.eu-north-1.amazonaws.com/3d/${fileId}.glb`;

    return (
        <group ref={cubeRef} position={position}>
            <OrbitControls enableZoom={true} zoomSpeed={2} minDistance={5} maxDistance={10} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <ModelFromS3 url={s3Url} />
        </group>
    );
};

export default XrCube;
