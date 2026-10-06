export type CertificateType = 'individual' | 'family';
export type Language = 'en' | 'ta';

export interface CertificateData {
  type: CertificateType;
  name: string;
  familyMembers: number;
  photoUrl: string | null;
  language: Language;
  format: 'normal' | 'story';
}
