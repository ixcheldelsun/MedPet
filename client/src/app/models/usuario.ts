export interface Usuario {
    id_usuario?: number;
    nombre?: string;
    apellido?: string;
    correo?: string;
    contraseña?: string;
    reinicia_contraseña?: string;
    reinicia_contraseña_expira?: Date;
}

export interface UserDetails {
    id_usuario?: number;
    nombre?: string;
    apellido?: string;
    correo?: string;
    contraseña?: string;
    exp?: number;
    iat?: number;
}

export interface TokenResponse {
    token: string;
}


export interface TokenPayload {
    id_usuario?: number;
    nombre?: string;
    apellido?: string;
    correo?: string;
    contraseña?: string;
}