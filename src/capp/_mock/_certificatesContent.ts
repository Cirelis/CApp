// ----------------------------------------------------------------------

import { ICertificate } from "src/types/certificates";

export const _certificatesContent:ICertificate[] = [
  {
    id: 'Naturland',
    title: 'Naturland zertifiziert',
    coverUrl: '/assets/certificates/small/naturland.png',
    description: '',
    data: {
      institution: 'Naturland',
      website: 'www.naturland.de',
      contact: 'naturland@naturland.de',
    },
  },
  {
    id: 'EU-Bio',
    title: 'EU-Bio zertifiziert',
    coverUrl: '/assets/certificates/small/bmel.png',
    description: '',
    data: {
      institution: 'DE-ÖKO-037',
      website: 'www.bmel.de',
      contact: 'poststelle@bmel.bund.de',
    },
  },
  // Weitere Zertifikate hier hinzufügen
];
