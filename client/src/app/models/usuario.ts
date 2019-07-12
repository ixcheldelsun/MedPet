/**
 * Interfaz Usuario
 */
export interface Usuario {
/**
 * Se declaran las variables id_usuario de tipo number
 */ 
    id_usuario?: number;
/**
 * Se declaran las variables nombre de tipo string
 */
    nombre?: string;
/**
 * Se declaran las variables apellido de tipo string
 */
    apellido?: string;
/**
 * Se declaran las variables correo de tipo string
 */
    correo?: string;
/**
 * Se declaran las variables contraseña de tipo string
 */
    contraseña?: string;
/**
 * Se declaran las variables reinicia_contraseña de tipo string
 */
    reinicia_contraseña?: string;
/**
 * Se declaran las variables reinicia_contraseña_expira de tipo Date
 */
    reinicia_contraseña_expira?: Date;
}

/**
 * Interfaz Detalles de usuario
 */

export interface UserDetails {
/**
 * Se declaran las variables y se le asigna el tipo
 */
/**
 * Se declaran las variables id_usuario de tipo number
 */
    id_usuario?: number;
/**
 * Se declaran las variables nombre de tipo string
 */
    nombre?: string;
/**
 * Se declaran las variables apellido de tipo string
 */
    apellido?: string;
/**
 * Se declaran las variables correo de tipo string
 */
    correo?: string;
/**
 * Se declaran las variables contraseña de tipo string
 */
    contraseña?: string;
/**
 * Se declaran las variables exp de tipo number
 */
    exp?: number;
/**
 * Se declaran las variables iat de tipo number
 */
    iat?: number;
}

/**
 * Interfaz TokenResponse
 */
export interface TokenResponse {
/**
 * Se declaran las variables token de tipo string
 */
    token: string;
}

/**
 * Interfaz TokenPayload
 */
export interface TokenPayload {
/**
 * Se declaran las variables id_usuario de tipo number
 */
    id_usuario?: number;
/**
 * Se declaran las variables nombre de tipo string
 */
    nombre?: string;
/**
 * Se declaran las variables apellido de tipo string
 */
    apellido?: string;
/**
 * Se declaran las variables correo de tipo string
 */
    correo?: string;
/**
 * Se declaran las variables contraseña de tipo string
 */
    contraseña?: string;
}