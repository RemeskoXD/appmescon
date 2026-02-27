import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MESCON Digital',
    short_name: 'MESCON',
    description: 'Digitální transformace a vývoj softwaru na míru',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#020617',
    icons: [
      {
        src: 'https://web2.itnahodinu.cz/mescon/images/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
