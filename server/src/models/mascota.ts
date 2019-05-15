import {Sequelize} from "sequelize/types";

export interface MascotaAttributes {
    id_mascota?: Number; 
    edad: Number; 
    fecha_nacimiento: Date; 
    raza: String; 
    especie: String; 
    nombre: String; 
    apodo: String; 
    sexo: String; 
};

export interface MascotaInstance extends Sequelize.Instance<MascotaAttributes>, MascotaAttributes {

};

export const MascotaFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<MascotaInstance, MascotaAttributes> => {
    const attributes: SequelizeAttributes<MascotaAttributes> = {
        edad: {
            type: DataTypes.NUMBER
        }, 
        fecha_nacimiento: {
            type: DataTypes.DATE
        }, 
        raza: {
            type: DataTypes.STRING
        }, 
        especie: {
            type: DataTypes.STRING
        }, 
        nombre: {
            type: DataTypes.STRING
        }, 
        apodo: {
            type: DataTypes.STRING
        }, 
        sexo: {
            type: DataTypes.STRING
        }
    };

    const mascota = sequelize.define<MascotaInstance, MascotaAttributes>('mascota', attributes);

    return mascota; 
};

//! HAY QUE CORREGIR ESTO NO ESTA LISTO