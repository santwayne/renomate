import { OrbitControls, useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

const XrCube = ({
    position,
    fileId,
    scale,
    format,
}: {
    position: [number, number, number];
    fileId: string;
    scale: number;
    format: string;
}) => {
    const cubeRef = useRef<THREE.Group>(null);

    const s3Url = `https://renomate-3d.s3.eu-north-1.amazonaws.com/3d/${fileId}.${
        format === 'png' ? format : 'glb'
    }`;

    // Function to load a 3D model
    const ModelFromS3 = ({ url }: { url: string }) => {
        const gltf = useGLTF(url); // Load the GLTF/GLB model
        return <primitive object={gltf.scene} scale={scale} />;
    };

    // Function to load a PNG image
    const ImageFromS3 = ({ url }: { url: string }) => {
        const texture = useLoader(THREE.TextureLoader, url); // Load PNG texture
        return (
            <mesh scale={[scale, scale, 1]}>
                <planeGeometry args={[5, 5]} />
                <meshBasicMaterial map={texture} transparent />
            </mesh>
        );
    };

    return (
        <group ref={cubeRef} position={position}>
            <OrbitControls enableZoom={true} zoomSpeed={2} minDistance={5} maxDistance={10} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            {format === 'png' ? <ImageFromS3 url={s3Url} /> : <ModelFromS3 url={s3Url} />}
        </group>
    );
};

export default XrCube;
