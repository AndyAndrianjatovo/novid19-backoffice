export interface Lieu {
  _id: String;
  nom_lieu: string;
  adresse_lieu: string;
  statut_lieu: number;
  coordonnees_lieu: string;
}
export interface LieuWithQrCode extends Lieu {
  qrCode: string;
}

export interface LieuWithToDisplay extends Lieu {
  nbPassages: number;
  nbPositive: number;
}

export interface LieuToInsert {
  nom_lieu: string;
  adresse_lieu: string;
  statut_lieu: number;
  coordonnees_lieu: string;
}
