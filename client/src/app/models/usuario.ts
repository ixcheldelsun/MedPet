export interface Usuario {
    id_usuario?: Number;
    nombre?: String;
    apellido?: String;
    correo?: String;
    contraseña?: String;
}

export interface UserDetails {
    id_usuario?: Number;
    nombre?: String;
    apellido?: String;
    correo?: String;
    contraseña?: String;
    exp?: number;
    iat?: number;
}

export interface TokenResponse {
    token: string;
}


export interface TokenPayload {
    id_usuario?: Number;
    nombre?: String;
    apellido?: String;
    correo?: String;
    contraseña?: String;
}