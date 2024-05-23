import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {


  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  languageCode: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  gsm: string;

  @Prop()
  address: string;

  @Prop()
  picture: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  addeddate: string;

  @Prop({ required: true })
  password: string; // Add password field for authentication
}

export const UserSchema = SchemaFactory.createForClass(User);



const restaurants =[
 { "id": 1, 
"nom": "La tratorya",
 "localisation": "36 qu sidi ouassel, safi",
 "cuisine": "marocaine", 
"telephone": "0123456789" 
} ];

const logements =[
{ "id": 1, 
   "nom": "Panorama",
   "localisation": "36 Qu sidi bouzid, safi",
   "type": "marocaine", 
   "telephone": "06123456789" 
}
];




const utilisateurs = [ 
{ 
"id": "100000001",
 "prenom": "zakaria",
 "nom": "loulida",
 "code langue": "fr",
 "ville": "safi",
 "pays": "Maroc",
 "l’email": "gggg@ggg.com",
 "numéro": "0666666666", 
"adresse": "",
 "photo": "", 
"statut": "A",
 "date_ajout": "16-05-2024 23:30:00",

                             } 
                          ] 



















//Pour historique des réservations

 const réservations =[{	
      "utilisateur_id": "1",
      "item_id": "1",
      "date": "2024-05-16",
      "personnes": 2,
      
    },
    {
      "restaurant_id": "2",
      "date": "2024-05-14",
      "personnes": 4,
      "reservation_id": "987654321"
    }
];


